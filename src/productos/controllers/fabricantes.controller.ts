import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('fabricantes')
export class FabricantesController {
  @Post('add')
  createFabricante(@Body() payload: any) {
    // Implementar la lógica para crear un fabricante
    return { message: 'Fabricante creado exitosamente', payload };
  }
  @Get(':id')
  getFabricante(@Param('id') id: string) {
    // Implementar la lógica para obtener un fabricante por ID
    return {
      message: 'Fabricante obtenido exitosamente',
      data: {
        id: '123',
        nombre: 'Fabricante1',
        origen: 'origen fabriccante 1',
      },
    };
  }
  @Get()
  getFabricantes() {
    // Implementar la lógica para obtener un fabricante por ID
    return {
      message: 'Fabricantes obtenidos exitosamente',
      data: [
        {
          id: '123',
          nombre: 'Fabricante1',
          origen: 'origen fabricante 1',
        },
        {
          id: '456',
          nombre: 'Fabricante2',
          origen: 'origen fabricante 2',
        },
      ],
    };
  }
  @Put('edit/:id')
  updateFabricante(@Param('id') id: string, @Body() payload: any) {
    // Implementar la lógica para actualizar un fabricante por ID
    return {
      message: `Fabricante con ID ${id} actualizado exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  deleteFabricante(@Param('id') id: string) {
    // Implementar la lógica para eliminar un fabricante por ID
    return {
      message: `Fabricante con ID ${id} eliminado exitosamente`,
    };
  }
}
