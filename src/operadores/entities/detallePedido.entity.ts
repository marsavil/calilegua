import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from  'typeorm'
import { Producto } from 'src/productos/entities/producto.entity';
import { Pedido } from './pedido.entity';

@Entity()
export class DetallePedido {
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

  @Column({type: 'int'})
    cantidad: number;

    @ManyToOne(() => Producto) 
    producto: Producto; // No es necesaria la relacion bidireccional

    @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
    pedido: Pedido; 

}