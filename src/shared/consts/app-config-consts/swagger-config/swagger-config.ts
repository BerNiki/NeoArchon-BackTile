import { DocumentBuilder } from '@nestjs/swagger';
import { version as softwareNumber } from '../../../../../package.json';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Archon Backend')
  .setDescription('The Archon API documentation')
  .setVersion(softwareNumber as string)
  .addBearerAuth()
  .build();
