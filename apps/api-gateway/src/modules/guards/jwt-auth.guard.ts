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

/**
 * Extended JWT payload interface.
 *
 * Includes both standard JWT claims and Keycloak-specific claims.
 */
interface CustomJwtPayload extends jwt.JwtPayload {
  /**
   * Keycloak realm name.
   */
  realm?: string;

  /**
   * Authorized party.
   * Usually contains the client ID that requested the token.
   */
  azp?: string;

  /**
   * Alternative client identifier.
   */
  client_id?: string;

  /**
   * Subject of the token.
   *
   * For user tokens:
   *   sub = User ID
   *
   * For client credentials tokens:
   *   sub = Service account ID
   */
  sub?: string;

  /**
   * Expiration timestamp (Unix epoch seconds).
   */
  exp?: number;
}

/**
 * JWT Authentication Guard
 *
 * Responsibilities:
 * -----------------
 * 1. Extract Bearer token from Authorization header.
 * 2. Decode JWT header and payload.
 * 3. Retrieve signing keys (JWKS) from Keycloak.
 * 4. Find the correct public key using `kid`.
 * 5. Verify JWT signature.
 * 6. Validate token expiration.
 * 7. Attach decoded payload to request.
 *
 * Supports:
 * ----------
 * • Keycloak RS256 access tokens
 * • User access tokens
 * • Client credentials tokens
 * • Development mode bypass
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  /**
   * Cached JWKS response.
   *
   * Avoids calling Keycloak for every request.
   */
  private jwksCache: any[] = [];

  /**
   * Timestamp of the last JWKS fetch.
   */
  private lastFetch = 0;

  /**
   * JWKS cache validity period.
   *
   * 5 minutes.
   */
  private readonly CACHE_TIME = 5 * 60 * 1000;

  /**
   * Main guard execution method.
   *
   * Invoked automatically by NestJS before controller execution.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    /**
     * ======================================================
     * DEVELOPMENT MODE
     * ======================================================
     *
     * If DEV_MODE=true:
     * - Skip signature verification.
     * - Decode JWT only.
     * - Attach payload to request.
     *
     * Useful for local development.
     *
     * WARNING:
     * Never enable in production.
     */
    if (process.env.DEV_MODE === 'true') {
      const authHeader = request.headers['authorization'];

      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
          this.logger.log(
            `jwt-auth.guards-token separated: ${token}`,
          );

          const decoded = jwt.decode(token) as
            | CustomJwtPayload
            | null;

          if (decoded && typeof decoded === 'object') {
            request.user = {
              payload: decoded,
            };
          }
        } catch {
          this.logger.warn(
            'Failed to decode JWT in DEV_MODE. Proceeding without user context.',
          );
        }
      }

      return true;
    }

    /**
     * ======================================================
     * STEP 1: EXTRACT AUTHORIZATION HEADER
     * ======================================================
     */
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn(
        'Missing or invalid Authorization header',
      );

      throw new UnauthorizedException(
        'Missing Authorization Header',
      );
    }

    /**
     * Bearer <token>
     */
    const token = authHeader.split(' ')[1];

    /**
     * ======================================================
     * STEP 2: DECODE JWT
     * ======================================================
     *
     * Decode without verification to obtain:
     * - Header (kid)
     * - Payload (claims)
     */
    const decodedToken = jwt.decode(
      token,
      { complete: true },
    ) as {
      header: jwt.JwtHeader;
      payload: CustomJwtPayload;
    };

    /**
     * Ensure token contains required metadata.
     */
    if (!decodedToken?.header?.kid || !decodedToken.payload) {
      this.logger.error(
        'Invalid JWT format or missing kid',
      );

      throw new UnauthorizedException(
        'Invalid token format',
      );
    }

    /**
     * Make payload available downstream.
     *
     * Example:
     *
     * req.user.payload.sub
     * req.user.payload.azp
     */
    request.user = {
      payload: decodedToken.payload,
    };

    /**
     * ======================================================
     * STEP 3: BUILD JWKS URL
     * ======================================================
     */
    const realmName = process.env.REALMNAME;

    const jwksUri =
      `${process.env.KEYCLOAK_URL}` +
      `/realms/${realmName}` +
      `/protocol/openid-connect/certs`;

    this.logger.log(
      `Fetching JWKS from internal URL: ${jwksUri}`,
    );

    try {
      /**
       * ======================================================
       * STEP 4: FETCH JWKS
       * ======================================================
       */
      const jwks = await this.getJwks(jwksUri);

      /**
       * ======================================================
       * STEP 5: FIND MATCHING KEY
       * ======================================================
       *
       * Match token kid against Keycloak keys.
       */
      const key = jwks.keys.find(
        (k: any) => k.kid === decodedToken.header.kid,
      );

      if (!key) {
        this.logger.error(
          `No signing key found for kid: ${decodedToken.header.kid}`,
        );

        throw new UnauthorizedException(
          'Invalid token',
        );
      }

      /**
       * ======================================================
       * STEP 6: CONVERT JWK TO PEM
       * ======================================================
       *
       * jsonwebtoken requires PEM format.
       */
      const publicKey = createPublicKey({
        key: {
          kty: key.kty,
          n: key.n,
          e: key.e,
        },
        format: 'jwk',
      });

      const pem = publicKey.export({
        format: 'pem',
        type: 'spki',
      }) as string;

      /**
       * ======================================================
       * STEP 7: VERIFY SIGNATURE
       * ======================================================
       *
       * Ensures:
       * - Token is issued by Keycloak.
       * - Token has not been tampered with.
       */
      jwt.verify(token, pem, {
        algorithms: ['RS256'],
        issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.REALMNAME}`,

      });

      /**
       * ======================================================
       * STEP 8: VERIFY EXPIRATION
       * ======================================================
       */
      if (
        decodedToken.payload.exp &&
        decodedToken.payload.exp <
          Date.now() / 1000
      ) {
        this.logger.warn('Token is expired');

        throw new UnauthorizedException(
          'Token Expired',
        );
      }

      this.logger.log(
        'Token successfully verified using JWKS',
      );

      return true;
    } catch (error: any) {
      this.logger.error(
        'Token verification failed',
        error.message || error,
      );

      throw new UnauthorizedException(
        'Invalid token',
      );
    }
  }

  /**
   * Retrieve JWKS from Keycloak.
   *
   * Uses in-memory caching to reduce network calls.
   *
   * Cache Flow:
   * -------------
   * First request:
   *   → Fetch from Keycloak
   *
   * Next requests within 5 minutes:
   *   → Use cached keys
   *
   * After cache expiry:
   *   → Refresh keys from Keycloak
   *
   * @param jwksUri Keycloak JWKS endpoint
   * @returns JWKS response
   */
  async getJwks(jwksUri: string) {
    const now = Date.now();

 
     //Return cached keys if valid.
     
    if (
      this.jwksCache.length > 0 &&
      now - this.lastFetch < this.CACHE_TIME
    ) {
      return this.jwksCache;
    }

    /**
     * Fetch fresh keys from Keycloak.
     */
    const { data: jwks } = await axios.get(jwksUri, {
      httpsAgent: new HttpsAgent({
        rejectUnauthorized: false,
      }),
      timeout: 10000,
    });

    /**
     * Update cache.
     */
    this.jwksCache = jwks;
    this.lastFetch = now;

    return jwks;
  }
}

// Request
//    │
//    │ Authorization: Bearer JWT
//    ▼
// JwtAuthGuard
//    │
//    ├─ DEV_MODE?
//    │      │
//    │      ├─ Yes → Decode only → Allow
//    │      │
//    │      └─ No
//    │
//    ├─ Extract token
//    │
//    ├─ Decode JWT
//    │
//    ├─ Get kid
//    │
//    ├─ Fetch Keycloak JWKS
//    │
//    ├─ Find matching public key
//    │
//    ├─ Convert JWK → PEM
//    │
//    ├─ Verify RS256 signature
//    │
//    ├─ Check expiration
//    │
//    ├─ Attach request.user
//    │
//    └─ return true
//    ▼
// Protected Controller
// Custom JWT payload interface