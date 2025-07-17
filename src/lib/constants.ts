// Shared constants for the application
export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 20000, // ₦20,000 for free shipping
  STANDARD_SHIPPING_COST: 5000,   // ₦5,000 standard shipping
} as const;

export const CURRENCY = {
  SYMBOL: '₦',
  CODE: 'NGN',
  NAME: 'Nigerian Naira',
} as const;

// Export individual constants for convenience
export const FREE_SHIPPING_THRESHOLD = SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
export const STANDARD_SHIPPING_COST = SHIPPING_CONFIG.STANDARD_SHIPPING_COST;
