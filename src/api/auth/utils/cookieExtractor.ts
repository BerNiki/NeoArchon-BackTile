import { Request } from 'express';

export const cookieExtractor = (req: Request) => {
  let tokens: Record<string, string | null> = {};
  if (req && req.cookies) {
    tokens = req.cookies;
  }
  return tokens;
};
