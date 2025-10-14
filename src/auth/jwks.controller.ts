import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { importSPKI, exportJWK } from 'jose';

@Controller('.well-known')
export class JwksController {
  constructor(private readonly configService: ConfigService) {}

  @Get('jwks.json')
  async getJwks() {
    const pubKey = this.configService.get<string>('JWT_PUBLIC_KEY');
    const kid = this.configService.get<string>('JWT_KID');
    if (!pubKey || !kid) {
      return { keys: [] };
    }
    // EdDSA (Ed25519) assumed; adjust if needed
    const cryptoKey = await importSPKI(pubKey, 'EdDSA');
    const jwk = await exportJWK(cryptoKey);
    return { keys: [{ ...jwk, kid }] };
  }
}
