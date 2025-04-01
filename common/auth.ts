import { TokenSchema } from "./types.js";
import { zoomRequest } from "./util.js";

// Function implementations
export async function getAccessToken() {
    const grantType = "account_credentials"
    const accountId=""
    const response = await zoomRequest("https://zoom.us/oauth/token", {        
      method: "GET",
    });
    return TokenSchema.parse(response);
  }