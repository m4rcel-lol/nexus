export const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;
export const MAX_UPLOAD_MB = 100;

export const SERVER_AUDIO_BITRATE = 384_000;
export const SCREEN_SHARE_MAX_WIDTH = 3840;
export const SCREEN_SHARE_MAX_HEIGHT = 2160;
export const SCREEN_SHARE_MAX_FPS = 60;

export const PERMISSIONS = {
  ADMINISTRATOR: 1n << 0n,
  MANAGE_SERVER: 1n << 1n,
  MANAGE_CHANNELS: 1n << 2n,
  MANAGE_ROLES: 1n << 3n,
  VIEW_CHANNEL: 1n << 4n,
  SEND_MESSAGES: 1n << 5n,
  MANAGE_MESSAGES: 1n << 6n,
  CONNECT_VOICE: 1n << 7n,
  SPEAK: 1n << 8n,
  STREAM_VIDEO: 1n << 9n,
  UPLOAD_FILES: 1n << 10n
} as const;
