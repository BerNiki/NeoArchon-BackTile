import { readFileSync } from 'fs';

export const httpsOptions = {
  key: readFileSync('./secrets/certs/key.pem'),
  cert: readFileSync('./secrets/certs/cert.pem'),
};
