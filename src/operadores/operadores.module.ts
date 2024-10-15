import { Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { PedidosService } from './services/pedidos.service';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [ ProductosModule ],
  controllers: [
    PedidosController,
    OperadoresController,
    CompradoresController,
  ],
  providers: [
    PedidosService,
    OperadoresService,
    CompradoresService,
  ],
})
export class OperadoresModule {}
