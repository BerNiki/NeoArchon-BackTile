import { v4 as uuid } from 'uuid';
import * as crypto from 'crypto';
import { SignJWT } from 'jose';

export const tokensSigner = async (
  userId: string,
  privateKey: CryptoKey,
  kid: string,
  jwtExpiration: string,
  issuer: string,
  audience: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const refreshToken = crypto.randomBytes(40).toString('hex');

  const accessToken = await new SignJWT()
    .setSubject(userId)
    .setProtectedHeader({ alg: 'EdDSA', kid })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(`${jwtExpiration}s`)
    .setJti(uuid())
    .sign(privateKey);

  return { accessToken, refreshToken };
};
