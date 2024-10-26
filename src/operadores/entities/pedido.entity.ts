import { Entity } from "typeorm";
import { Operador } from "./operador.entity";
import { Producto } from "src/productos/entities/producto.entity";

@Entity()
export class Pedido {
  //id: number;
  date: Date;
  operador: Operador;
  productos: Producto[];
}