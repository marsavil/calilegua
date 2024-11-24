import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Producto } from './producto.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Categoria  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nombre: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

 
}