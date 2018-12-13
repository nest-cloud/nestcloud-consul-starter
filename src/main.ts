import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Boot } from 'nest-boot';

import { NestLogger } from './logger';

// https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function bootstrap() {
    const boot = new Boot(__dirname);
    const app = await NestFactory.create(AppModule, { logger: new NestLogger() });
    await app.listen(boot.get('web.port', 8081));
}

bootstrap();
