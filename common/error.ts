export class ZoomError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: unknown,
  ) {
    super(message);
    this.name = "ZoomError";
  }
}

export class ZoomBadRequestError extends ZoomError {
  constructor(message = "Bad request") {
    super(message, 400, { message });
    this.name = "ZoomBadRequestError";
  }
}

export class ZoomAuthenticationError extends ZoomError {
  constructor(message = "Authentication failed") {
    super(message, 401, { message });
    this.name = "ZoomAuthenticationError";
  }
}

export class ZoomNotFoundError extends ZoomError {
  constructor(message = "Not Found") {
    super(message, 404, { message });
    this.name = "Not Found";
  }
}

export class ZoomTooManyRequests extends ZoomError {
  constructor(message = "Too Many Requests") {
    super(message, 429, { message });
    this.name = "Too Many Requests";
  }
}

export function createZoomError(status: number, response: any): ZoomError {
  switch (status) {
    case 400:
      return new ZoomBadRequestError(response?.message);
    case 401:
      return new ZoomAuthenticationError(response?.message);
    case 404:
      return new ZoomNotFoundError(response?.message);
    case 429:
      return new ZoomTooManyRequests(response?.message);
    default:
      return new ZoomError(
        response?.message || "Zoom API error",
        status,
        response,
      );
  }
}
