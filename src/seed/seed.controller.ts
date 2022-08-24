import { Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';

//Controlador -> escuchar solicitudes y devolver respuestas
//La logica de negocio va en el servicio!!

@Controller('seed')
export class SeedController {
  
  constructor(private readonly seedService: SeedService) {}


  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }

}
