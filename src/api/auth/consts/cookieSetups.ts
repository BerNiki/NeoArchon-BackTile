const fourteenDays = 14 * 24 * 60 * 60 * 1000;

export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  // process.env.NODE_ENV === 'production' &&
  // process.env.COOKIE_SECURE === 'true',
  sameSite: (process.env.COOKIE_SAMESITE as 'strict' | 'none' | 'lax') ?? 'lax',
  maxAge: fourteenDays,
  //...(process.env.NODE_ENV === 'production'
  //  ? { domain: process.env.COOKIE_DOMAIN }
  //  : {}),
  path: process.env.COOKIE_PATH ?? '/',
};

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  //    process.env.NODE_ENV === 'production' &&
  //    process.env.COOKIE_SECURE === 'true',
  sameSite: (process.env.COOKIE_SAMESITE as 'strict' | 'none' | 'lax') ?? 'lax',
  maxAge: fourteenDays,
  // ...(process.env.NODE_ENV === 'production'
  //   ? { domain: process.env.COOKIE_DOMAIN }
  //   : {}),
  path: process.env.COOKIE_PATH ?? '/',
};
