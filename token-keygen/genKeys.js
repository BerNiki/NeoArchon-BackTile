// @ts-check
const generateKeyPairSync = require('crypto').generateKeyPairSync;
const writeFileSync = require('fs').writeFileSync;

const { publicKey, privateKey } = generateKeyPairSync('ed25519');

writeFileSync(
  'secrets/token-keys/private.key',
  privateKey.export({ type: 'pkcs8', format: 'pem' }),
);
writeFileSync(
  'secrets/token-keys/public.key',
  publicKey.export({ type: 'spki', format: 'pem' }),
);

console.log('Keys generated in ./keys folder');
