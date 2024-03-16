import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './configs/global/config.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  const config = new ConfigService();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    //disableErrorMessages:true,
  }));

  const config2 = new DocumentBuilder()
    .setTitle('Hcare')
    .setDescription('App PFE ANYPLI')
    .setVersion('1.0')
    .addTag('HC')
    .build();
  const document = SwaggerModule.createDocument(app, config2);
  SwaggerModule.setup('api', app, document);


  await app.listen(await config.getPortConfig());
}
bootstrap();
