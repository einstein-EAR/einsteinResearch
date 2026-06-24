import { ApiError, type ApiRequestOptions, type HttpMethod } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function buildUrl(endpoint: string, params?: ApiRequestOptions["params"]) {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL.replace(/\/$/, "")}${path}`;

  if (!params) return url;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `${url}?${query}` : url;
}

function isJsonBody(body: unknown): body is Record<string, unknown> | unknown[] {
  return (
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer)
  );
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (response.status === 204) return null;

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { params, body, headers, ...rest } = options;

  const requestHeaders = new Headers(headers);

  let requestBody: BodyInit | undefined;

  if (body instanceof FormData || body instanceof Blob || typeof body === "string") {
    requestBody = body as BodyInit;
  } else if (body !== undefined && body !== null) {
    if (!requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(endpoint, params), {
    ...rest,
    method,
    headers: requestHeaders,
    body: requestBody,
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      isJsonBody(data) && "message" in data && typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const api = {
  get<T>(endpoint: string, options?: Omit<ApiRequestOptions, "body">) {
    return request<T>("GET", endpoint, options);
  },

  post<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>("POST", endpoint, { ...options, body });
  },

  put<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>("PUT", endpoint, { ...options, body });
  },

  patch<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>("PATCH", endpoint, { ...options, body });
  },

  delete<T>(endpoint: string, options?: ApiRequestOptions) {
    return request<T>("DELETE", endpoint, options);
  },
};
