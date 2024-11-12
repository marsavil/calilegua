import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Fabricante } from './fabricante.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, unique: true})
  nombre: string;

  @Column({type: 'int'})
  precio: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'text'})
  descripcion: string;

  @Column({type: 'varchar'})
  imagen: string;

  @Column({type: 'varchar'})
  origen: string;

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

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.products)
  fabricante: Fabricante;

  @ManyToMany(() => Categoria, (categoria) => categoria.productos ) 
  categorias: Categoria[];
}