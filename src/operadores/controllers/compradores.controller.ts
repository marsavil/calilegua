import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDTO } from '../dtos/comprador.dto';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradoresService: CompradoresService) {}
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con todos los compradores'})
  getAllCompradores() {
    return this.compradoresService.findAll();
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve un comprador específico'})
  getCompradorById(@Param('id', new ParseIntPipe()) id: number) {
    return this.compradoresService.findOne(id);
  }
  @Post('add')
  @ApiOperation({summary: 'Agrega un nuevo comprador'})
  createComprador(@Body() payload: any) {
    return this.compradoresService.create(payload);
  }
  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza la información de un comprador existente'})
  updateComprador(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: CreateCompradorDTO,
  ) {
    return this.compradoresService.update(id, payload)
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina un comprador existente'})
  deleteComprador(@Param('id', new ParseIntPipe()) id: number){
    return this.compradoresService.remove(id)
  }
}
