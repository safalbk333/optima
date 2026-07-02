export const RATE_CARD_CONSTANTS = {
  EXPIRY_REMINDER_DAYS: [90, 60, 30] as const,
  DEFAULT_CURRENCY: 'INR',
  NOTIFICATION_TYPE_CODES: {
    RATE_CARD_EXPIRY_90: 'RATE_CARD_EXPIRY_90',
    RATE_CARD_EXPIRY_60: 'RATE_CARD_EXPIRY_60',
    RATE_CARD_EXPIRY_30: 'RATE_CARD_EXPIRY_30',
    RATE_CARD_EXPIRED: 'RATE_CARD_EXPIRED',
    RATE_CARD_ACTIVATED: 'RATE_CARD_ACTIVATED',
  },
  CRON_TIMEZONE: 'Asia/Kolkata',
};

export const RATE_CARD_ERROR_MESSAGES = {
  DUPLICATE_CODE: 'Rate card code already exists',
  DUPLICATE_ITEM: 'Item already exists in this rate card',
  INVALID_DATE_RANGE: 'Valid From date must be earlier than Valid To date',
  OVERLAPPING_TIER: 'Tier ranges overlap with an existing tier for this item',
  DUPLICATE_MILESTONE_ORDER: 'Milestone order already exists for this item',
  MULTIPLE_ACTIVE_CARDS: 'Vendor already has an active rate card overlapping this date range',
  CANNOT_ACTIVATE_EXPIRED: 'Cannot activate a rate card whose Valid To date has already passed',
  CANNOT_DELETE_ACTIVE: 'Cannot delete an active rate card. Deactivate it first',
  RATE_CARD_NOT_FOUND: 'Rate card not found',
  RATE_CARD_ITEM_NOT_FOUND: 'Rate card item not found',
  FIXED_PRICE_NOT_FOUND: 'Fixed price not found for this rate card item',
  TIER_NOT_FOUND: 'Tier not found',
  MILESTONE_NOT_FOUND: 'Milestone not found',
  INVALID_PRICING_TYPE: 'Pricing type mismatch for this rate card item',
  NO_ACTIVE_PRICE: 'No active price found for given vendor and item',
  MILESTONE_REQUIRED: 'Milestone name is required for milestone pricing type',
  QUANTITY_REQUIRED: 'Quantity is required for fixed/tier pricing type',
  NO_TIER_MATCH: 'No tier found matching the given quantity',
  NO_MILESTONE_MATCH: 'No milestone found matching the given milestone name',
};