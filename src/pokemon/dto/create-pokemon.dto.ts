import { IsNotEmpty, isNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator"

/** //>> RECORDAR IMPORTAR ESTO EN EL MAIN!!! PARA QUE VALIDE LOS PIPES DEL CLASS-VALIDATOR
 * instalar class-transformer y class-validator
 *   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
    )
 */

export class CreatePokemonDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name:string

    @IsNumber()
    @IsPositive()
    @Min(1)
    no: number
}
