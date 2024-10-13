import { Inject, Injectable } from '@nestjs/common';
import { Operador } from 'src/operadores/entities/operador.entity';
import { Pedido } from 'src/operadores/entities/pedido.entity';
import { ProductosService } from '../../productos/services/productos.service';

@Injectable()
export class OperadoresService {
  constructor(
    private productsService: ProductosService,
    @Inject ('APIKEY') private apikey: string){}
  operadores: Operador[] = [
    { id: 1, email: 'operador1@email.com', password: '123456', role: 'admin' },
    { id: 2, email: 'operador2@email.com', password: '654321', role: 'operador' },
  ];
  getOrdersByUser (id: number): Pedido {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      productos: this.productsService.findAll()
    }
  }
  findOne(id: number) {
    return this.operadores.find((item) => item.id === id);
  }
}
