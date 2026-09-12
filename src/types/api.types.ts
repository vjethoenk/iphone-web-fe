export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface ApiError {
  code: number;
  message: string;
  result: null;
}

export class ApiException extends Error {
  public readonly code: number;
  public readonly rawError?: unknown;

  constructor(message: string, code: number = 500, rawError?: unknown) {
    super(message);
    this.name = "ApiException";
    this.code = code;
    this.rawError = rawError;
    Object.setPrototypeOf(this, ApiException.prototype);
  }
}
