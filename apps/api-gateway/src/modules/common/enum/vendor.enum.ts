export const VENDOR = 'vendor';
export const BGV_VENDOR = 'bgv_vendor';
export const ALL_VENDOR_ROLES = [VENDOR, BGV_VENDOR] as const;
export type VendorRole = (typeof ALL_VENDOR_ROLES)[number];
