import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from  'typeorm'
import { Operador } from "./operador.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;
  
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido) 
  detalles: DetallePedido[];
}

