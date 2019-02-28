import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Boot } from 'nest-boot';

import { NestLogger } from './logger';

// https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function bootstrap() {
    const boot = new Boot(__dirname);
    const app = await NestFactory.create(AppModule, { logger: new NestLogger() });

    process.on('SIGINT', async () => {
        setTimeout(() => process.exit(1), 5000);
        await app.close();
        process.exit(0);
    });

    //kill -15
    process.on('SIGTERM', async () => {
        setTimeout(() => process.exit(1), 5000);
        await app.close();
        process.exit(0);
    });
    
    await app.listen(boot.get('web.port', 8081));
}

bootstrap();
