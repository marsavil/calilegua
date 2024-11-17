import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @Exclude()
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  @Expose()
  get productos() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle) // Usa el método filter para eliminar valores "falsos" (como null, undefined, false, etc.)
        .map((detalle) => {
          const { created_at, updated_at, ...productoSinFechas } =
            detalle.producto; // Excluye las propiedades
          return {
            ...productoSinFechas, // Copia todas las demás propiedades
            cantidad: detalle.cantidad, // Añade la cantidad
          };
        });
    }
    return []; // si no hay detalles, devuelve un array vacío
  }

  @Expose()
  get total() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle) // Usa el método filter para eliminar valores "falsos" (como null, undefined, false, etc.)
        .reduce((total, detalle) => {
          const totalDetalle = detalle.producto.precio * detalle.cantidad;
          return total + totalDetalle; // Suma el total del detalle al total del pedido
        }, 0);
    }
    return 0; // si no hay detalles, devuelve 0
  }
}
