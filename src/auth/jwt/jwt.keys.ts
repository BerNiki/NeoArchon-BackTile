import { readFileSync } from 'fs';
import { importPKCS8, importSPKI } from 'jose';

export const loadKeyPair = () => {
  const priv = readFileSync(process.env.JWT_KEY_PRIVATE_PATH!, 'utf8');
  const pub = readFileSync(process.env.JWT_KEY_PUBLIC_PATH!, 'utf8');
  return {
    privateKey: importPKCS8(priv, 'edDSA'),
    publicKey: importSPKI(pub, 'edDSA'),
  };
};
