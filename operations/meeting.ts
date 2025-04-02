import { z } from "zod";
import { zoomRequest } from "../common/util.js";
import { ZoomMeetingSchema } from "../common/types.js";

export const CreateMeetingOptionsSchema = z.object({
  agenda: z.string().describe("Meeting name"),
  startTime: z.string().optional().describe("Meeting start time"),
});

export type CreateMeetingOptions = z.infer<typeof CreateMeetingOptionsSchema>;

export async function createMeeting(
  options: CreateMeetingOptions,
  token: string,
) {
  const response = await zoomRequest(
    `https://api.zoom.us/v2/users/me/meetings`,
    {
      method: "POST",
      body: options,
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return ZoomMeetingSchema.parse(response);
}
