import { z } from "zod";
import { zoomRequest } from "../common/util.js";
import { ZoomMeetingSchema } from "../common/types.js";

export const CreateMeetingOptionsSchema = z.object({
    agenda:  z.string().describe("Meeting name"),
    startTime: z.string().optional().describe("Meeting start time")
})

export type CreateMeetingOptions = z.infer<typeof CreateMeetingOptionsSchema>;

export async function createMeeting(options: CreateMeetingOptions) {
    const user_id = '';
    const response = await zoomRequest(`https://api.zoom.us/v2/users/${user_id}/meetings`, {
      method: "POST",
      body: options,
    });
    return ZoomMeetingSchema.parse(response);
  }