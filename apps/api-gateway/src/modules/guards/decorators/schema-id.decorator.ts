import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @SchemaId() — Parameter decorator for the API Gateway.
 *
 * Extracts the tenant schemaId from the incoming HTTP request in this order:
 *
 *   1. req.user?.payload?.schemaId   — decoded from JWT token (primary, once auth is fully wired)
 *   2. req.headers['x-schema-id']    — custom request header (fallback for dev / service-to-service)
 *
 * Usage in any gateway controller:
 *
 *   findAll(@SchemaId() schemaId: string) {
 *     return this.currencyService.findAll(schemaId);
 *   }
 *
 * No changes needed in future endpoints — just add @SchemaId() as a parameter.
 */
export const SchemaId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    // Primary: read from decoded JWT payload (set by JwtAuthGuard → request.user)
    const strFromToken: string = request.user?.payload?.schemaId ?? '';

    // Fallback: read from custom HTTP header (useful during development)
    const strFromHeader: string =
      (request.headers['x-schema-id'] as string) ?? '';

    return strFromToken || strFromHeader || '';
  },
);
