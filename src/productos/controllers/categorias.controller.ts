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
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDTO } from '../dtos/categorias.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}
  @Get()
  @ApiOperation({summary: 'Devuelve la lista de todas las categorias de productos de la base de datos'})
  getAllCategories() {
    console.log("se van a mostrar todas las categorías de productos")
    return this.categoriasService.findAll()
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve la categoría con el id especificado'})
  getCategoryById(@Param('id', MongoIdPipe) id: string) {
    
    return this.categoriasService.findOne(id);
  }
  // @Post('seed')
  // @ApiOperation({summary: 'Cargaihnicial de categorias a la base de datos'})
  // seedDB() {
  //   return this.categoriasService.seedDB();
  // }
  @Post('add')
  @ApiOperation({summary: 'Agrega una nueva categoría'})
  createCategory(@Body() payload: CreateCategoriaDTO) {
    return this.categoriasService.create(payload);
  }
  @Put('edit/:id')
  @ApiOperation({summary: 'Modifica la categoria del id proporcionado'})
  updateCategory(@Param('id', MongoIdPipe) id: string, @Body() payload: any) {
    return this.categoriasService.update(id, payload);
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina la categoría del id proporcionado'})
  deleteCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoriasService.remove(id);
  }
}
