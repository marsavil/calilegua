import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from  'typeorm'
import { Operador } from "./operador.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

    @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;
  
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido) 
  detalles: DetallePedido[];
}