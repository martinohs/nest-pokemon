import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    //>> Indico que mi index.html esta en la carpeta public (para esto debo instalar el packete serve-static)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    //>> Creo la referencia a la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), //En forRoot indicamos el url de nuestra bd

    PokemonModule, CommonModule, SeedModule
  ],
})
export class AppModule {}
