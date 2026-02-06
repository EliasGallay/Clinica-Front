// lib/auth.ts
export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";

// defaults (ajustalos a tu BE)
export const ACCESS_MAX_AGE = 60 * 15;      // 15 min
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 días