import { z } from "zod";
import { zoomRequest } from "../common/util.js";
import { ZoomListMeetingsSchema, ZoomMeetingSchema } from "../common/types.js";

export const CreateMeetingOptionsSchema = z.object({
  agenda: z
    .string()
    .max(2000)
    .describe("The meeting's agenda.")
    .default("New Meeting's agenda"),
  start_time: z
    .string()
    .optional()
    .describe(
      `The meeting's start time. This supports local time and GMT formats.To set a meeting's start time in GMT, use the yyyy-MM-ddTHH:mm:ssZ date-time format. For example, 2020-03-31T12:02:00Z. To set a meeting's start time using a specific timezone, use the yyyy-MM-ddTHH:mm:ss date-time format and specify the timezone ID in the timezone field. If you do not specify a timezone, the timezone value defaults to your Zoom account's timezone. You can also use UTC for the timezone value. Note: If no start_time is set for a scheduled meeting, the start_time is set at the current time and the meeting type changes to an instant meeting, which expires after 30 days. current time is ${new Date().toISOString()}.`,
    ),
  timezone: z
    .string()
    .optional()
    .describe(
      `Timezone for the meeting's start time. The Current timezone is ${Intl.DateTimeFormat().resolvedOptions().timeZone}.`,
    ),
  topic: z.string().max(200).optional().describe("The meeting's topic."),
});

export const ListMeetingOptionsSchema = z.object({
  type: z
    .string()
    .optional()
    .describe(
      "The type of meeting. Choose from upcoming, scheduled or previous_meetings. upcoming - All upcoming meetings; scheduled - All valid previous (unexpired) meetings and upcoming scheduled meetings; previous_meetings - All the previous meetings;",
    )
    .default("upcoming"),
});

export const DeleteMeetingOptionsSchema = z.object({
  id: z.number().describe("The ID of the meeting to delete."),
});

export type CreateMeetingOptions = z.infer<typeof CreateMeetingOptionsSchema>;
export type ListMeetingOptions = z.infer<typeof ListMeetingOptionsSchema>;
export type DeleteMeetingOptions = z.infer<typeof DeleteMeetingOptionsSchema>;

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

export async function deleteMeeting(options: DeleteMeetingOptions) {
  const response = await zoomRequest(
    `https://api.zoom.us/v2/meetings/${options.id}`,
    {
      method: "DELETE",
    },
  );
  return response;
}
