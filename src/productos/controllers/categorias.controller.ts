import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  @Get()
  @ApiOperation({summary: 'Devuelve la lista de todas las categorias de productos de la base de datos'})
  getAllCategories() {
    return {
      message: 'Listado de categorias',
      data: [
        { id: 1, nombre: 'Juegos' },
        { id: 2, nombre: 'Musica' },
        { id: 3, nombre: 'Deportes' },
      ],
    };
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve la categoría con el id especificado'})
  getCategoryById(@Param('id') id: number) {
    const category = { id, nombre: `Categoría con id ${id}` };
    return {
      message: 'Categoría encontrada',
      data: category,
    };
  }
  @Post('add')
  @ApiOperation({summary: 'Agrega una nueva categoría'})
  createCategory(@Body() payload: any) {
    return {
      message: 'Categoria creada exitosamente',
      payload,
    };
  }
  @Put('edit/:id')
  @ApiOperation({summary: 'Modifica la categoria del id proporcionado'})
  updateCategory(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Categoría con ID ${id} actualizada exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina la categoría del id proporcionado'})
  deleteCategory(@Param('id') id: number) {
    return {
      message: 'Categoría eliminada exitosamente',
      id,
    };
  }
}
