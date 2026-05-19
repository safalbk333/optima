import { HttpStatus } from '@nestjs/common';

export class ResponseHelper {
  static success(
    data: any = null,
    message = 'Success',
    statusCode = HttpStatus.OK,
  ) {
    return {
      success: true,
      statusCode,
      message,
      data,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    message = 'Something went wrong',
    errors: any = null,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    return {
      success: false,
      statusCode,
      message,
      data: null,
      errors,
      timestamp: new Date().toISOString(),
    };
  }
}