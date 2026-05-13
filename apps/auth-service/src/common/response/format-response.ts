import { ResponseOptions } from './response.interface';

export function formatResponse<T>(
  options: ResponseOptions<T>,
) {
  return {
    statusCode: options.statusCode,
    message: options.message,
    data: options.data,
  };
}