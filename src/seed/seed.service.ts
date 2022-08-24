import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { resourceUsage } from 'process';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {


  constructor(
    //?? private readonly pokemonService: PokemonService 
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //!BORRA TODOS LOS DOCUMENTOS DE LA BD


    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    let pokemonsArray : {name:string, no:number}[] = [];
    
    
    data.results.forEach( ({name,url}) => {

      const segments = url.split('/');
      const noPokemon:number = +segments[ segments.length - 2];
      
      pokemonsArray.push({ name: name, no: noPokemon });
    }

    )
    //? this.pokemonService.populateDBWithPokemons(pokemonsArray)
    
    await this.pokemonModel.insertMany(pokemonsArray)
    
    return 'seed created';
  }


}
