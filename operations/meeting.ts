import { z } from "zod";

export const CreateMeetingOptionsSchema = z.object({
    agenda:  z.string().describe("Meeting name"),
    startTime: z.string().optional().describe("Meeting start time")
})