import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/productos.service';
import { Producto } from './entities/producto.entity';
import { Categoria } from './entities/categoria.entity';
import { Fabricante } from './entities/fabricante.entity';

@Module({
  //TypeORM se encargará de administrar las entidades intervinientes
  imports: [
    TypeOrmModule.forFeature([Categoria, Fabricante, Producto]),
  ],
  controllers: [
    FabricantesController,
    ProductosController,
    CategoriasController,
  ],
  providers: [
    ProductosService,
    FabricantesService,
    CategoriasService,
  ],
  exports: [ ProductosService ]
})
export class ProductosModule {}
