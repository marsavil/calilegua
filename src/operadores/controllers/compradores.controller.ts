import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDTO, FilterCompradoresDTO } from '../dtos/comprador.dto';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { Roles } from '../../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradoresService: CompradoresService) {}
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con todos los compradores'})
  getAllCompradores(
    @Query() params:FilterCompradoresDTO
  ) {
    return this.compradoresService.findAll(params);
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve un comprador específico'})
  getCompradorById(@Param('id', MongoIdPipe) id: string) {
    return this.compradoresService.findOne(id);
  }
  @Post('seed')
  @ApiOperation({summary: 'Carga inicial de compradores en la base de datos'})
  seedDB() {
    return this.compradoresService.seedDB();
  }
  @Roles(Role.ADMIN)
  @Post('add')
  @ApiOperation({summary: 'Agrega un nuevo comprador'})
  createComprador(@Body() payload: any) {
    console.log("se va a cargar un nuevo comprador")
    return this.compradoresService.create(payload);
  }
  @Roles(Role.ADMIN)
  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza la información de un comprador existente'})
  updateComprador(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: CreateCompradorDTO,
  ) {
    return this.compradoresService.update(id, payload)
  }
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina un comprador existente'})
  deleteComprador(@Param('id', MongoIdPipe) id: string){
    return this.compradoresService.remove(id)
  }
}
