import { TokenSchema } from "./types.js";
import { zoomRequest } from "./util.js";

export async function getAccessToken() {
  let accountId = process.env.ZOOM_ACCOUNT_ID
    ? process.env.ZOOM_ACCOUNT_ID
    : "";

  let authUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;

  const key = `Basic ${refreshToken()}`;
  const response = await zoomRequest(authUrl, {
    method: "POST",
    headers: { Authorization: key },
  });
  return TokenSchema.parse(response);
}

function refreshToken(): string {
  let clientId = process.env.ZOOM_CLIENT_ID ? process.env.ZOOM_CLIENT_ID : "";
  let clientSecret = process.env.ZOOM_CLIENT_SECRET
    ? process.env.ZOOM_CLIENT_SECRET
    : "";
  return generateBasicAuth(clientId, clientSecret);
}

function generateBasicAuth(username: string, password: string): string {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString("base64");
}
