import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //App es una "instancia" de node
  app.setGlobalPrefix('api/v1')  //Configuro el prefijo de mi ruta -> localhost:3000/api/...

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
      forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an exception.
      transform: true, //Me transforma la informacion que flushe por los DTO segun lo que se espera 
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(3000);
}
bootstrap();
