import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNumberString } from 'class-validator';
import { Operador } from './operador.entity';

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
}