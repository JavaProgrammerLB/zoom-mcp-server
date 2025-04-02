import { z } from "zod";
import { zoomRequest } from "../common/util.js";
import { ZoomMeetingSchema } from "../common/types.js";

export const CreateMeetingOptionsSchema = z.object({
  agenda: z.string().max(2000).describe("The meeting's agenda"),
  start_time: z.string().optional().describe("The meeting's start time"),
  timezone: z
    .string()
    .optional()
    .describe("Timezone for the meeting's start time"),
  topic: z.string().max(200).optional().describe("The meeting's topic."),
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
