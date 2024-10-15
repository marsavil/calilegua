import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('compradores')
export class CompradoresController {
  @Get()
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
  getCompradorById(@Param('idComprador') idComprador: string) {
    return {
      message: 'Comprador encontrado',
      data: {
        id: idComprador,
        nombre: `Comprador con ID ${idComprador}`,
      },
    };
  }
  @Post('add')
  createComprador(@Body() payload: any) {
    return {
      message: 'Comprador agregado exitosamente',
      payload,
    };
  }
  @Put('edit/:idComprador')
  updateComprador(
    @Param('idComprador') idComprador: string,
    @Body() body: any,
  ): any {
    return {
      idComprador: idComprador,
      nombre: body.nombre,
    };
  }
  @Delete('delete/:idComprador')
  deleteComprador(@Param('idComprador') idComprador: string): any {
    return {
      message: 'Comprador eliminado exitosamente',
      idComprador: idComprador,
    };
  }
}
