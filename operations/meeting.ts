import { z } from "zod";
import { zoomRequest } from "../common/util.js";
import { ZoomListMeetingsSchema, ZoomMeetingSchema } from "../common/types.js";

export const CreateMeetingOptionsSchema = z.object({
  agenda: z
    .string()
    .max(2000)
    .describe("The meeting's agenda")
    .default("New Meeting"),
  start_time: z.string().optional().describe("The meeting's start time"),
  timezone: z
    .string()
    .optional()
    .describe("Timezone for the meeting's start time"),
  topic: z.string().max(200).optional().describe("The meeting's topic."),
});

export const ListMeetingOptionsSchema = z.object({
  type: z.string().optional().describe("The type of meeting."),
});

export type CreateMeetingOptions = z.infer<typeof CreateMeetingOptionsSchema>;
export type ListMeetingOptions = z.infer<typeof ListMeetingOptionsSchema>;

export async function createMeeting(options: CreateMeetingOptions) {
  const response = await zoomRequest(
    `https://api.zoom.us/v2/users/me/meetings`,
    {
      method: "POST",
      body: options,
    },
  );
  return ZoomMeetingSchema.parse(response);
}

export async function listMeetings(options: ListMeetingOptions) {
  let url = "https://api.zoom.us/v2/users/me/meetings";
  const params = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  if (Array.from(params).length > 0) {
    url += `?${params.toString()}`;
  }
  const response = await zoomRequest(url, {
    method: "GET",
  });
  return ZoomListMeetingsSchema.parse(response);
}
