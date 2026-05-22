export interface ResponseOptions<T> {
  data: T;
  message: string;
  statusCode: number;
  totalCount?: number;
  page?: number;
  limit?: number;
  customFormatter?: (data: T) => any;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface FormattedResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  pagination?: Pagination;
}

/**
 * Generic response formatter reusable across any service
 * @param options Response options including data, message, status code, optional pagination params, and custom formatter
 * @returns Formatted response with structure { success, statusCode, message, data, pagination }
 */
export function formatResponse<T>(
  options: ResponseOptions<T>,
): FormattedResponse {
  const {
    data,
    message,
    statusCode,
    totalCount,
    page = 1,
    limit = 10,
    customFormatter,
  } = options;

  // Apply custom formatter if provided, otherwise use raw data
  const formattedData = customFormatter ? customFormatter(data) : data;

  // Base response structure
  const response: FormattedResponse = {
    success: true,
    statusCode,
    message,
    data: formattedData,
  };

  // Add pagination if totalCount is provided
  if (totalCount !== undefined) {
    response.pagination = {
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    };
  }

  return response;
}
