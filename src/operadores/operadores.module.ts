import { forwardRef, Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { PedidosService } from './services/pedidos.service';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { ProductosModule } from '../productos/productos.module';
import { Operador, OperadorSchema } from './entities/operador.entity';
import { Comprador, CompradorSchema } from './entities/comprador.entity';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { DetallePedido, DetallePedidoSchema } from './entities/detallePedido.entity';
import { DetallePedidoService } from 'src/productos/services/detalle-pedido.service';
import { DetallePedidosController } from 'src/productos/controllers/detalle-pedido.controller';
import { Producto, ProductoSchema } from '../productos/entities/producto.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosService } from '../productos/services/productos.service';
import { FabricantesService } from '../productos/services/fabricantes.service';
import { Fabricante, FabricanteSchema } from '../productos/entities/fabricante.entity';
import { AuthModule } from '../auth/auth.module';
import { CategoriasService } from '../productos/services/categorias.service';

@Module({
   //Mongoose se encargará de administrar las entidades intervinientes
  imports:[
    forwardRef(() => AuthModule), // Rompe la dependencia circular
    MongooseModule.forFeature([
      {
        name: Comprador.name,
        schema: CompradorSchema
      },
      {
        name: Operador.name,
        schema: OperadorSchema
      },
      {
        name: Pedido.name,
        schema:PedidoSchema
      },
      {
        name: DetallePedido.name,
        schema:DetallePedidoSchema
      }, 
      {
        name: Producto.name,
        schema:ProductoSchema
      },
      {
        name: Fabricante.name,
        schema: FabricanteSchema
      }
    ]),
    ProductosModule,
  ],
  controllers: [PedidosController, OperadoresController, CompradoresController, DetallePedidosController],
  providers: [PedidosService, OperadoresService, CompradoresService, DetallePedidoService, ProductosService, FabricantesService, CategoriasService],
  exports: [OperadoresService]
})
export class OperadoresModule {}
