import { z } from "zod";

export const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  api_url: z.string(),
});

export const ZoomMeetingSettingsSchema = z.object({
  host_video: z.boolean().optional(),
  participant_video: z.boolean().optional(),
  cn_meeting: z.boolean().optional(),
  in_meeting: z.boolean().optional(),
  join_before_host: z.boolean().optional(),
  jbh_time: z.number().optional(),
  mute_upon_entry: z.boolean().optional(),
  watermark: z.boolean().optional(),
  use_pmi: z.boolean().optional(),
  approval_type: z.number().optional(),
  audio: z.string().optional(),
  auto_recording: z.string().optional(),
  enforce_login: z.boolean().optional(),
  enforce_login_domains: z.string().optional(),
  alternative_hosts: z.string().optional(),
  alternative_host_update_polls: z.boolean().optional(),
  close_registration: z.boolean().optional(),
  show_share_button: z.boolean().optional(),
  allow_multiple_devices: z.boolean().optional(),
  registrants_confirmation_email: z.boolean().optional(),
  waiting_room: z.boolean().optional(),
  request_permission_to_unmute_participants: z.boolean().optional(),
  registrants_email_notification: z.boolean().optional(),
  meeting_authentication: z.boolean().optional(),
  encryption_type: z.string().optional(),
  approved_or_denied_countries_or_regions: z.object({
    enable: z.boolean().optional(),
  }),
  breakout_room: z.object({
    enable: z.boolean().optional(),
  }),
  internal_meeting: z.boolean().optional(),
  continuous_meeting_chat: z.object({
    enable: z.boolean().optional(),
    auto_add_invited_external_users: z.boolean().optional(),
    auto_add_meeting_participants: z.boolean().optional(),
    channel_id: z.string().optional(),
  }),
  participant_focused_meeting: z.boolean().optional(),
  push_change_to_calendar: z.boolean().optional(),
  resources: z.array(z.unknown().optional()),
  allow_host_control_participant_mute_state: z.boolean().optional(),
  alternative_hosts_email_notification: z.boolean().optional(),
  show_join_info: z.boolean().optional(),
  device_testing: z.boolean().optional(),
  focus_mode: z.boolean().optional(),
  meeting_invitees: z.array(z.unknown().optional()),
  private_meeting: z.boolean().optional(),
  email_notification: z.boolean().optional(),
  host_save_video_order: z.boolean().optional(),
  sign_language_interpretation: z.object({
    enable: z.boolean().optional(),
  }),
  email_in_attendee_report: z.boolean().optional(),
});

export const ZoomMeetingSchema = z.object({
  uuid: z.string(),
  id: z.number(),
  host_id: z.string().optional(),
  host_email: z.string().optional(),
  topic: z.string().optional(),
  type: z.number().optional(),
  status: z.string().optional(),
  start_time: z.string().optional(),
  duration: z.number().optional(),
  timezone: z.string().optional(),
  agenda: z.string().optional(),
  created_at: z.string().optional(),
  start_url: z.string().optional(),
  join_url: z.string().optional(),
  password: z.string().optional(),
  h323_password: z.string().optional(),
  pstn_password: z.string().optional(),
  encrypted_password: z.string().optional(),
  settings: ZoomMeetingSettingsSchema,
  creation_source: z.string().optional(),
  pre_schedule: z.boolean().optional(),
});

export const ZoomListMeetingsSchema = z.object({
  page_size: z.number(),
  total_records: z.number(),
  next_page_token: z.string(),
  meetings: z.array(
    z.object({
      uuid: z.string(),
      id: z.number(),
      host_id: z.string().optional(),
      topic: z.string().optional(),
      type: z.number().optional(),
      start_time: z.string().optional(),
      duration: z.number().optional(),
      timezone: z.string().optional(),
      agenda: z.string().optional(),
      created_at: z.string().optional(),
      join_url: z.string().optional(),
    }),
  ),
});

export const ZoomMeetingDetailSchema = z.object({
  assistant_id: z.string().optional(),
  host_email: z.string().optional(),
  host_id: z.string().optional(),
  id: z.number(),
  uuid: z.string(),
  agenda: z.string().optional(),
  created_at: z.string().optional(),
  duration: z.number().optional(),
  encrypted_password: z.string().optional(),
  pstn_password: z.string().optional(),
  h323_password: z.string().optional(),
  join_url: z.string().optional(),
  chat_join_url: z.string().optional(),
  occurrences: z
    .array(
      z.object({
        duration: z.number().optional(),
        occurrence_id: z.string().optional(),
        start_time: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .optional(),
  password: z.string().optional(),
  pmi: z.string().optional(),
  pre_schedule: z.boolean().optional(),
  recurrence: z
    .object({
      end_date_time: z.string().optional(),
      end_times: z.number().optional(),
      monthly_day: z.number().optional(),
      monthly_week: z.number().optional(),
      monthly_week_day: z.number().optional(),
      repeat_interval: z.number().optional(),
      type: z.number().optional(),
      weekly_days: z.string().optional(),
    })
    .optional(),
  settings: ZoomMeetingSettingsSchema.extend({
    approved_or_denied_countries_or_regions: z
      .object({
        approved_list: z.array(z.string()).optional(),
        denied_list: z.array(z.string()).optional(),
        enable: z.boolean().optional(),
        method: z.string().optional(),
      })
      .optional(),
    authentication_exception: z
      .array(
        z.object({
          email: z.string().optional(),
          name: z.string().optional(),
          join_url: z.string().optional(),
        }),
      )
      .optional(),
    breakout_room: z
      .object({
        enable: z.boolean().optional(),
        rooms: z
          .array(
            z.object({
              name: z.string().optional(),
              participants: z.array(z.string()).optional(),
            }),
          )
          .optional(),
      })
      .optional(),
    global_dial_in_numbers: z
      .array(
        z.object({
          city: z.string().optional(),
          country: z.string().optional(),
          country_name: z.string().optional(),
          number: z.string().optional(),
          type: z.string().optional(),
        }),
      )
      .optional(),
    language_interpretation: z
      .object({
        enable: z.boolean().optional(),
        interpreters: z
          .array(
            z.object({
              email: z.string().optional(),
              languages: z.string().optional(),
              interpreter_languages: z.string().optional(),
            }),
          )
          .optional(),
      })
      .optional(),
    sign_language_interpretation: z
      .object({
        enable: z.boolean().optional(),
        interpreters: z
          .array(
            z.object({
              email: z.string().optional(),
              sign_language: z.string().optional(),
            }),
          )
          .optional(),
      })
      .optional(),
    meeting_invitees: z
      .array(
        z.object({
          email: z.string().optional(),
          internal_user: z.boolean().optional(),
        }),
      )
      .optional(),
    continuous_meeting_chat: z
      .object({
        enable: z.boolean().optional(),
        auto_add_invited_external_users: z.boolean().optional(),
        auto_add_meeting_participants: z.boolean().optional(),
        who_is_added: z.string().optional(),
        channel_id: z.string().optional(),
      })
      .optional(),
    resources: z
      .array(
        z.object({
          resource_type: z.string().optional(),
          resource_id: z.string().optional(),
          permission_level: z.string().optional(),
        }),
      )
      .optional(),
    question_and_answer: z
      .object({
        enable: z.boolean().optional(),
        allow_submit_questions: z.boolean().optional(),
        allow_anonymous_questions: z.boolean().optional(),
        question_visibility: z.string().optional(),
        attendees_can_comment: z.boolean().optional(),
        attendees_can_upvote: z.boolean().optional(),
      })
      .optional(),
    auto_start_meeting_summary: z.boolean().optional(),
    who_will_receive_summary: z.number().optional(),
    auto_start_ai_companion_questions: z.boolean().optional(),
    who_can_ask_questions: z.number().optional(),
    summary_template_id: z.string().optional(),
  }).optional(),
  start_time: z.string().optional(),
  start_url: z.string().optional(),
  status: z.string().optional(),
  timezone: z.string().optional(),
  topic: z.string().optional(),
  tracking_fields: z
    .array(
      z.object({
        field: z.string().optional(),
        value: z.string().optional(),
        visible: z.boolean().optional(),
      }),
    )
    .optional(),
  type: z.number().optional(),
  dynamic_host_key: z.string().optional(),
  creation_source: z.string().optional(),
});
