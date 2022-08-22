import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//*Al extender mi clase del Document de mongoose, este le provee todas las funcionalidades respectivas (nombres, metodos, etc) para trabajar con el

//El decorador @Schema es para indicarle que es un esquema de una base de datos
@Schema()
export class Pokemon extends Document {

    //Mongo me genera la id automaticamente
    
    //Agrego propiedades (properties) a cada una de mis propiedades del Pokemom
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({  
        unique: true,
        index: true,
    })
    no: number;

}

// Hago la exportacion de mi esquema, e indico que se basara en la clase (en este caso Pokemon)
export const PokemonSchema = SchemaFactory.createForClass( Pokemon )
