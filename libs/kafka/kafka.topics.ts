export const KAFKA_TOPICS = {
  REQUEST_EVENTS: 'request.events',
  VENDOR_EVENTS:  'vendor.events',
  USER_EVENTS:    'user.events',
} as const;

export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];
