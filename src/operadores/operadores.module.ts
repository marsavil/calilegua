import { Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { PedidosService } from './services/pedidos.service';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { ProductosModule } from 'src/productos/productos.module';
import { Operador } from './entities/operador.entity';
import { Comprador } from './entities/comprador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { DetallePedido } from './entities/detallePedido.entity';
import { DetallePedidoService } from 'src/productos/services/detalle-pedido.service';
import { DetallePedidosController } from 'src/productos/controllers/detalle-pedido.controller';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  // imports: [
  //   ProductosModule,
  //   TypeOrmModule.forFeature([Operador, Comprador, Pedido, DetallePedido, Producto]),
  // ],
  // controllers: [PedidosController, OperadoresController, CompradoresController, DetallePedidosController],
  // providers: [PedidosService, OperadoresService, CompradoresService, DetallePedidoService],
})
export class OperadoresModule {}
