import { JWTPayload, SignJWT } from 'jose';
import { v4 as UUID } from 'uuid';

export const signToken = async (
  payload: JWTPayload,
  privateKey: CryptoKey,
  kid: string,
  ttlSeconds: number,
) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: 'edDSA', kid })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISS!)
    .setAudience(process.env.JWT_AUD!)
    .setExpirationTime(`${ttlSeconds}s`)
    .setJti(UUID())
    .sign(privateKey);
