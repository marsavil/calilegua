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
import { PedidosService } from 'src/operadores/services/pedidos.service';
import { Pedido } from 'src/operadores/entities/pedido.entity';
import { Comprador } from 'src/operadores/entities/comprador.entity';

@Module({
  //TypeORM se encargará de administrar las entidades intervinientes
  imports: [
    TypeOrmModule.forFeature([Categoria, Fabricante, Producto, Pedido, Comprador]),
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
