import { createZoomError } from "./error.js";
import { TokenSchema } from "./types.js";
import { parseResponseBody, zoomRequest } from "./util.js";

export async function getAccessToken() {
  let accountId = process.env.ZOOM_ACCOUNT_ID
    ? process.env.ZOOM_ACCOUNT_ID
    : "";
  let clientId = process.env.ZOOM_CLIENT_ID ? process.env.ZOOM_CLIENT_ID : "";
  let clientSecret = process.env.ZOOM_CLIENT_SECRET
    ? process.env.ZOOM_CLIENT_SECRET
    : "";

  let authUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;

  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${generateBasicAuth(clientId, clientSecret)}`,
    },
  });

  const responseBody = await parseResponseBody(response);
  if (!response.ok) {
    throw createZoomError(response.status, responseBody);
  }

  return TokenSchema.parse(responseBody);
}

function generateBasicAuth(username: string, password: string): string {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString("base64");
}
