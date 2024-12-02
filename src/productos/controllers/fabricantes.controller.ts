import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FabricantesService } from '../services/fabricantes.service';
import { CreateFabricanteDTO, FilterFabricantesDTO } from '../dtos/fabricante.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(private fabricantesService: FabricantesService) {}

  
  @Post('seed')
  @ApiOperation({summary: 'Llena la base de datos con datos de fabricantes'})
  seedDB() {
    console.log('Inicia carga de fabricantes')
    return this.fabricantesService.seedDB();
  }
  
  @Roles(Role.ADMIN)
  @Post('add')
  @ApiOperation({summary:'Agregar un nuevo fabricante a la base de datos'})
  createFabricante(@Body() payload: CreateFabricanteDTO) {
    console.log("se va a agregar un nuevo fabricante")
    return this.fabricantesService.create(payload);
  }
  
  @Get(':id')
  @ApiOperation({summary: 'Devuelve la información de un fabricante en particular'})
  getFabricante(@Param('id', MongoIdPipe) id: string) {
    return this.fabricantesService.findOne(id);
  }
  @Get()
  @ApiOperation({summary: 'Devuelve la lista de todos los fabricantes'})
  getFabricantes(
    @Query() params: FilterFabricantesDTO
  ) {
    return this.fabricantesService.findAll(params);
  }

  
  @Roles(Role.ADMIN)
  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza la información de un fabricante en particular'})
  updateFabricante(@Param('id', MongoIdPipe) id: string, @Body() payload: any) {
    return this.fabricantesService.update(id, payload);
  }
  
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina un fabricante en particular de la base de datos'})
  deleteFabricante(@Param('id', MongoIdPipe) id: string) {
    return this.fabricantesService.remove(id);
  }
}
