import { getUserAgent } from "universal-user-agent";
import { VERSION } from "./version.js";
import { createZoomError } from "./error.js";

type RequestOptions = {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
}

async function parseResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return response.json();
    }
    return response.text();
}

const USER_AGENT = `zoom-mcp-server/v${VERSION} ${getUserAgent()}`;

export async function zoomRequest(
    url: string,
    options: RequestOptions = {}
): Promise<unknown> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        ...options.headers,
    };

    const response = await fetch(url, {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
        throw createZoomError(response.status, responseBody);
    }

    return responseBody;
}