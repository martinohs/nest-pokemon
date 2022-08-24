import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon') //Path o ruta q ira en el navegador
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //Especifico mi codigo de status -> si no recuerdo los numeros, nest me ofrece los codigos de status para importar @HttpCode( HttpStatus.OK )
  @HttpCode ( 200 )
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll( paginationDto );
  }

  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    return this.pokemonService.findOne( termino );
  }

  @Patch(':termino')
  update(@Param('termino') termino: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(termino, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
