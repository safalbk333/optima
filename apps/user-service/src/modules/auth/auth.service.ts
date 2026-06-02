import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateToken(token: string) {
    // Placeholder for Keycloak/JWT validation.
    // Implement token introspection or JWT verification in the next phase.
    return { valid: true, token };
  }
}
