import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, Index, JoinColumn } from 'typeorm';
import { Fabricante } from './fabricante.entity';
import { Categoria } from './categoria.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Index(['precio', 'stock'])
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

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.products)
  @JoinColumn({
    name: 'fabricante_id',
    //referencedColumnName: 'id'
  })
  fabricante: Fabricante;

  @ManyToMany(() => Categoria, (categoria) => categoria.productos ) 
  categorias: Categoria[];
}