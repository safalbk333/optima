export interface ResponseOptions<T> {
  statusCode: number;
  message: string;
  data: T;
}