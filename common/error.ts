export class ZoomError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly response: unknown
    ) {
        super(message);
        this.name = "ZoomError";
    }
}

  export class ZoomAuthenticationError extends ZoomError {
    constructor(message = "Authentication failed") {
        super(message, 401, { message });
        this.name = "ZoomAuthenticationError";
    }
}


export function createZoomError(status: number, response: any): ZoomError {
    switch (status) {
      case 401:
        return new ZoomAuthenticationError(response?.message);
      default:
        return new ZoomError(
          response?.message || "Zoom API error",
          status,
          response
        );
    }
  }