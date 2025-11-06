import { readFileSync } from 'fs';
import { importPKCS8, importSPKI } from 'jose';

const loadKeyPair = async (): Promise<CryptoKeyPair> => {
  const priv = readFileSync(process.env.JWT_KEY_PRIVATE_PATH!, 'utf8');
  const pub = readFileSync(process.env.JWT_KEY_PUBLIC_PATH!, 'utf8');
  return {
    privateKey: await importPKCS8(priv, 'EdDSA'),
    publicKey: await importSPKI(pub, 'EdDSA'),
  };
};

export const jwtKeysProvider = {
  provide: 'JWT_KEY_PAIR',
  useFactory: async () => {
    const { publicKey, privateKey } = await loadKeyPair();
    return { publicKey, privateKey };
  },
};
