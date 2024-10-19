import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  @Post('add')
  @ApiOperation({summary:'Agregar un nuevo fabricante a la base de datos'})
  createFabricante(@Body() payload: any) {
    // Implementar la lógica para crear un fabricante
    return { message: 'Fabricante creado exitosamente', payload };
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve la información de un fabricante en particular'})
  getFabricante(@Param('id', new ParseIntPipe()) id: number) {
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
  @ApiOperation({summary: 'Devuelve la lista de todos los fabricantes'})
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
  @ApiOperation({summary: 'Actualiza la información de un fabricante en particular'})
  updateFabricante(@Param('id', new ParseIntPipe()) id: number, @Body() payload: any) {
    // Implementar la lógica para actualizar un fabricante por ID
    return {
      message: `Fabricante con ID ${id} actualizado exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina un fabricante en particular de la base de datos'})
  deleteFabricante(@Param('id', new ParseIntPipe()) id: number) {
    // Implementar la lógica para eliminar un fabricante por ID
    return {
      message: `Fabricante con ID ${id} eliminado exitosamente`,
    };
  }
}
