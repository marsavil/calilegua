import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Categoria  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nombre: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Producto, (producto) => producto.categorias)
  @JoinTable()// solo se declara en una parte de la relación

  productos: Producto[]
}