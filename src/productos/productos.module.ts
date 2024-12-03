import { Module } from '@nestjs/common';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/productos.service';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Fabricante, FabricanteSchema } from './entities/fabricante.entity';
import { Categoria, CategoriaSchema } from './entities/categoria.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  //Mongoose se encargará de administrar las entidades intervinientes
  imports: [
    AuthModule, // Importa AuthModule si se necesita autenticación
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema
      },
      {
        name: Fabricante.name,
        schema: FabricanteSchema
      },
      {
        name: Categoria.name,
        schema:CategoriaSchema
      }
    ])
    
    ,
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
  exports: [ ProductosService, CategoriasService, MongooseModule ]
})
export class ProductosModule {}
