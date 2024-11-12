import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNumberString } from 'class-validator';
import { Operador } from './operador.entity';
import { Pedido } from './pedido.entity';

@Entity()
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nombre: string;

  @Column({type: 'varchar'})
  apellido: string;

  @Column({type: 'varchar'})
  @IsNumberString()
  telefono: string;

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

  @OneToOne(() => Operador, (operador) => operador.comprador, {
    nullable: true,
  })

  @JoinColumn({ name: 'operadorId'})
  operador: Operador;

  @Column( { name: 'operadorId', nullable: true} )
  operadorId: number;

  @OneToMany(() => Pedido, (pedido) => pedido.comprador )
  pedidos: Pedido[];
}