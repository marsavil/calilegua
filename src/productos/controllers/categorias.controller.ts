import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDTO } from '../dtos/categorias.dto';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Post('seed')
  @ApiOperation({summary: 'Cargaihnicial de categorias a la base de datos'})
  seedDB() {
    return this.categoriasService.seedDB();
  }
  @Roles(Role.ADMIN)  
  @Post('add')
  @ApiOperation({summary: 'Agrega una nueva categoría'})
  createCategory(@Body() payload: CreateCategoriaDTO) {
    return this.categoriasService.create(payload);
  }
  @Roles(Role.ADMIN)  
  @Put('edit/:id')
  @ApiOperation({summary: 'Modifica la categoria del id proporcionado'})
  updateCategory(@Param('id', MongoIdPipe) id: string, @Body() payload: any) {
    return this.categoriasService.update(id, payload);
  }
  @Roles(Role.ADMIN)  
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina la categoría del id proporcionado'})
  deleteCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoriasService.remove(id);
  }
}
