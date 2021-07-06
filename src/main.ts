import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as chalk from 'chalk';
import { getIPAdress } from './utils/host';
import { ConfigService } from './config/config.service';

import bootstrap from './bootstrap';


async function main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService: ConfigService = app.get(ConfigService);

    await bootstrap(app);

    if(process.env.NODE_ENV !== 'production') {
        // 配置 Swagger
        const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('nest-shop')
        .setDescription('shop-demo')
        .setVersion('1.0')
        .addTag('shop')
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('doc', app, document);
    }   

    console.info(chalk.green(`app run in ${process.env.NODE_ENV}`));
    console.info(chalk.green(`http://${getIPAdress()}:${configService.server.port}`));    
}

main();
