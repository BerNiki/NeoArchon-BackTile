import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Archon Backend')
  .setDescription('The Archon API documentation')
  .setVersion('0.1a')
  .addBearerAuth()
  .build();
