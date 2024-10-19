import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con todos los compradores'})
  getAllCompradores() {
    return {
      message: 'Listado de compradores',
      data: [
        { id: '1', nombre: 'Juan' },
        { id: '2', nombre: 'Maria' },
        { id: '3', nombre: 'Pedro' },
        { id: '4', nombre: 'Luis' },
      ],
    };
  }
  @Get(':idComprador')
  @ApiOperation({summary: 'Devuelve un comprador específico'})
  getCompradorById(@Param('id', new ParseIntPipe()) id: number) {
    return {
      message: 'Comprador encontrado',
      data: {
        id: id,
        nombre: `Comprador con ID ${id}`,
      },
    };
  }
  @Post('add')
  @ApiOperation({summary: 'Agrega un nuevo comprador'})
  createComprador(@Body() payload: any) {
    return {
      message: 'Comprador agregado exitosamente',
      payload,
    };
  }
  @Put('edit/:idComprador')
  @ApiOperation({summary: 'Actualiza la información de un comprador existente'})
  updateComprador(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: any,
  ): any {
    return {
      idComprador: id,
      nombre: body.nombre,
    };
  }
  @Delete('delete/:idComprador')
  @ApiOperation({summary: 'Elimina un comprador existente'})
  deleteComprador(@Param('id', new ParseIntPipe()) id: number): any {
    return {
      message: 'Comprador eliminado exitosamente',
      idComprador: id,
    };
  }
}
