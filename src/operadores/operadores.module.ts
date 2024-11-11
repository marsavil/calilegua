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
//import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([Operador, Comprador]),
  ],
  controllers: [PedidosController, OperadoresController, CompradoresController],
  providers: [PedidosService, OperadoresService, CompradoresService],
})
export class OperadoresModule {}
