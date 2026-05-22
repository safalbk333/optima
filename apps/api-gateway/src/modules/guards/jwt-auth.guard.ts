import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { Agent as HttpsAgent } from 'https';
import { createPublicKey } from 'crypto';

// Custom JWT payload interface
interface CustomJwtPayload extends jwt.JwtPayload {
  realm?: string;
  azp?: string; // Authorized party (client_id for client tokens)
  client_id?: string; // Alternative client_id field
  sub?: string; // Subject (user or client ID)
  exp?: number; // Expiration time
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (process.env.DEV_MODE === 'true') {
      // Still attach a decoded payload so controllers can read sub / claims (verification skipped).
      const authHeader = request.headers['authorization'];
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
              this.logger.log(`jwt-auth.guards-token seperated: ${token}`);

          const decoded = jwt.decode(token) as CustomJwtPayload | null;
          if (decoded && typeof decoded === 'object') {
            request.user = { payload: decoded };
          }
        } catch {
          this.logger.warn('Failed to decode JWT in DEV_MODE, proceeding without user context');
          /* ignore invalid token in dev */
        }
      }
      return true;
    }
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn('Missing or invalid Authorization header');
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.decode(token, { complete: true }) as {
      header: jwt.JwtHeader;
      payload: CustomJwtPayload;
    };

    if (!decodedToken?.header?.kid || !decodedToken.payload) {
      this.logger.error('Invalid JWT format or missing kid');
      throw new UnauthorizedException('Invalid token format');
    }

    // Attach payload for downstream guards
    request.user = { payload: decodedToken.payload };

    const realmName =  process.env.REALMNAME;
    const jwksUri = `${
      process.env.KEYCLOAK_URL
    }/realms/${realmName}/protocol/openid-connect/certs`;

    this.logger.log(`Fetching JWKS from internal URL: ${jwksUri}`);

    try {
      const { data: jwks } = await axios.get(jwksUri, {
        httpsAgent: new HttpsAgent({ rejectUnauthorized: false }),
        timeout: 10000,
      });

      const key = jwks.keys.find((k: any) => k.kid === decodedToken.header.kid);
      if (!key) {
        this.logger.error(
          `No signing key found for kid: ${decodedToken.header.kid}`,
        );
        throw new UnauthorizedException('Invalid token');
      }

      // Convert JWK (RSA) to PEM using Node.js built-in crypto
      const publicKey = createPublicKey({
        key: {
          kty: key.kty,
          n: key.n,
          e: key.e,
        },
        format: 'jwk',
      });

      const pem = publicKey.export({ format: 'pem', type: 'spki' }) as string;

      // Verify token
      jwt.verify(token, pem, { algorithms: ['RS256'] });

      // Check expiration
      if (
        decodedToken.payload.exp &&
        decodedToken.payload.exp < Date.now() / 1000
      ) {
        this.logger.warn('Token is expired');
        throw new UnauthorizedException('Token Expired');
      }

      this.logger.log('Token successfully verified using internal HTTP JWKS');
      return true;
    } catch (error: any) {
      this.logger.error('Token verification failed', error.message || error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
