import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    // Uso injectModel dado a que mi modelo no es un servicio (provider en nest), por lo tanto la inyeccion implementada por nest es injectmodel
    @InjectModel( Pokemon.name ) //Tengo que colocar el nombre del modelo que quiero inyectar
    private readonly pokemonModel : Model<Pokemon>
  ) {}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

      try {
        const newPokemon = await this.pokemonModel.create(createPokemonDto);
        return newPokemon;
        
      } catch (error) {
        this.handleExceptions(error);
      }

  }

  async findAll() {
   
    return this.pokemonModel.find();
  }

  async findOne(termino: string) {
    let pokemon: Pokemon;
    
    //By No
    if ( !isNaN(+termino) ){
       pokemon = await this.pokemonModel.findOne({no: termino});
    }
    //By Mongo Id
    if ( !pokemon && isValidObjectId(termino) ){
      pokemon = await this.pokemonModel.findOne({_id: termino});
    }
    //By Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({name: termino});
    }
    //Not exist
    if(!pokemon) throw new NotFoundException(`Pokemon with id ${termino} not exist`);

    return pokemon;
  }

  async update(termino: string, updatePokemonDto: UpdatePokemonDto) {
   const pokemon = await this.findOne(termino); //No recibo una entity pokemon, recibo el modelo pokemon de moongose, por lo cual me permite realizar operaciones sobre el
  
   try {
      updatePokemonDto.name = ( updatePokemonDto.name ) ? updatePokemonDto.name.toLocaleLowerCase() : updatePokemonDto.name;
      await pokemon.updateOne( updatePokemonDto) //Con new en true devuelvo el  pokemon nuevo
      // Armo y desarmo mi pokemon y el updatePokemon para devolverlo modificado
      return {...pokemon.toJSON(), ...updatePokemonDto };
    
   } catch (error) {
      this.handleExceptions(error);
  }
}

async remove(id: string) {
  // const result = await this.pokemonModel.findByIdAndDelete(id);

  const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
  
  if ( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id "${id}" not found`)
  return;
}

private handleExceptions ( error : any) {
    if (error.code === 11000){
      throw new BadRequestException(`This Pokemon already exist ${ JSON.stringify( error.keyValue )}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon, contact the db administrator`);

  }
}
