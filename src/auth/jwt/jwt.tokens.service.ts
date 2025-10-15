import { JWTPayload, SignJWT } from 'jose';
import { v4 as UUID } from 'uuid';

export const signToken = async (
  payload: JWTPayload,
  privateKey: CryptoKey,
  kid: string,
  ttlSeconds: number,
  issuer: string,
  audience: string,
) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: 'edDSA', kid })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(`${ttlSeconds}`)
    .setJti(UUID())
    .sign(privateKey);
