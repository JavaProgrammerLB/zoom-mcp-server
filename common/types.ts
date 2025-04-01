import { z } from "zod";

export const TokenSchema = z.object({
    accessToken: z.string(),
    tokenType: z.string(),
    expiresIn: z.number(),
    scope: z.string(),
    apiUrl: z.string()
  });

export const ZoomMeetingSchema = z.object({
    uuid: z.number()
  });
