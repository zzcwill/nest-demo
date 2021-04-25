import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import bootstrap from './bootstrap';

async function main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await bootstrap(app);
}

main();
