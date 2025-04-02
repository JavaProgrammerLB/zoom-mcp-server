import { z } from "zod";

export const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  api_url: z.string(),
});

export const ZoomMeetingSchema = z.object({
  uuid: z.string(),
});
