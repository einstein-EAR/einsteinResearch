export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export type ApiRequestOptions = Omit<RequestInit, "method" | "body"> & {
  params?: RequestParams;
  body?: unknown;
};

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
