import { HttpStatus } from '@nestjs/common';

export type NormalizedMicroserviceClientError = {
  statusCode: number;
  message: string;
};

function flattenMessage(msg: unknown): string {
  if (typeof msg === 'string') return msg;
  if (Array.isArray(msg)) {
    return msg.map((x) => String(x)).filter(Boolean).join(', ');
  }
  if (msg && typeof msg === 'object' && msg !== null && 'message' in msg) {
    return flattenMessage((msg as { message: unknown }).message);
  }
  return '';
}

/**
 * Normalizes errors from Nest TCP ClientProxy.send() / lastValueFrom so HTTP clients get
 * correct status codes and messages (Nest often puts HttpException payload in `message` as an object).
 */
export function normalizeMicroserviceClientError(
  err: unknown,
): NormalizedMicroserviceClientError {
  const e = err as Record<string, unknown> & { code?: string };

  if (
    e?.code === 'ECONNREFUSED' ||
    e?.code === 'ETIMEDOUT' ||
    e?.code === 'ENOTFOUND'
  ) {
    return {
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message:
        'A backend service is not reachable. Start atlas-autonomous and master-services (and check TCP ports in configuration).',
    };
  }

  const msgObj = e.message;
  if (msgObj && typeof msgObj === 'object' && msgObj !== null) {
    const m = msgObj as Record<string, unknown>;
    const sc = Number(m.statusCode ?? m.status ?? m.code);
    const text =
      flattenMessage(m.message) ||
      flattenMessage(m.error) ||
      'Request failed';
    if (Number.isFinite(sc) && sc >= 400 && sc < 600) {
      return { statusCode: sc, message: text || 'Request failed' };
    }
  }

  const errObj = e.error;
  if (errObj && typeof errObj === 'object' && errObj !== null) {
    const er = errObj as Record<string, unknown>;
    const sc = Number(er.statusCode ?? er.status ?? er.code);
    const text = flattenMessage(er.message) || flattenMessage(er.error);
    if (Number.isFinite(sc) && sc >= 400 && sc < 600) {
      return { statusCode: sc, message: text || 'Request failed' };
    }
  }

  const statusRaw =
    (typeof e.status === 'number' && e.status) ||
    (typeof e.statusCode === 'number' && e.statusCode);
  const scNum = Number(statusRaw);
  const message =
    flattenMessage(e.message) ||
    (typeof e.error === 'string' ? e.error : '') ||
    'Internal server error';

  if (Number.isFinite(scNum) && scNum >= 400 && scNum < 600) {
    return { statusCode: scNum, message: message || 'Request failed' };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: message || 'Internal server error',
  };
}
