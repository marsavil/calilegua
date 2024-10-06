import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('categorias')
export class CategoriasController {
  @Get()
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
  getCategoryById(@Param('id') id: number) {
    const category = { id, nombre: `Categoría con id ${id}` };
    return {
      message: 'Categoría encontrada',
      data: category,
    };
  }
  @Post('add')
  createCategory(@Body() payload: any) {
    return {
      message: 'Categoria creada exitosamente',
      payload,
    };
  }
  @Put('edit/:id')
  updateCategory(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Categoría con ID ${id} actualizada exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  deleteCategory(@Param('id') id: number) {
    return {
      message: 'Categoría eliminada exitosamente',
      id,
    };
  
}
