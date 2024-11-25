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

@Module({
  //Mongoose se encargará de administrar las entidades intervinientes
  imports: [
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema
      },
      {
        name: Fabricante.name,
        schema: FabricanteSchema
      }
    ])
    
    ,
  ],
  controllers: [
    FabricantesController,
    ProductosController,
    //CategoriasController,
  ],
  providers: [
    ProductosService,
    FabricantesService,
    //CategoriasService,
  ],
  exports: [ ProductosService ]
})
export class ProductosModule {}
