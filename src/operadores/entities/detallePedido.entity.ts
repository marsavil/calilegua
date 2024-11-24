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
import { Exclude } from 'class-transformer';

@Entity()
export class DetallePedido {
  // @PrimaryGeneratedColumn()
  // id: number;
  
  // @Exclude()
  // @CreateDateColumn({
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP'
  // })
  // created_at: Date;

  // @Exclude()
  // @UpdateDateColumn({
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP'
  // })
  // updated_at: Date;

  // @Column({type: 'int'})
  //   cantidad: number;

  //   @ManyToOne(() => Producto) 
  //   producto: Producto; // No es necesaria la relacion bidireccional

  //   @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  //   pedido: Pedido; 

}