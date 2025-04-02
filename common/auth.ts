import { TokenSchema } from "./types.js";
import { zoomRequest } from "./util.js";

export async function getAccessToken() {
  let accountId = '';
  if (process.env.ZOOM_ACCOUNT_ID) {
    accountId = process.env.ZOOM_ACCOUNT_ID;
  }

  let authUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`

  const key = `Basic ${calculateToken()}`;
  const response = await zoomRequest(authUrl, {
    method: "POST",
    headers: { 'Authorization': key }
  });
  return TokenSchema.parse(response);
}

function calculateToken(): string {
  let clientId = '';
  let clientSecret = '';

  if (process.env.ZOOM_CLIENT_ID) {
    clientId = process.env.ZOOM_CLIENT_ID;
  }

  if (process.env.ZOOM_CLIENT_SECRET) {
    clientSecret = process.env.ZOOM_CLIENT_SECRET;
  }
  return generateBasicAuth(clientId, clientSecret);
}

function generateBasicAuth(username: string, password: string): string {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString('base64');
}