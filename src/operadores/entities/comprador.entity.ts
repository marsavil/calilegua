import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNumberString } from 'class-validator';
import { Operador } from './operador.entity';
import { Pedido } from './pedido.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comprador {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column({type: 'varchar'})
  // nombre: string;

  // @Column({type: 'varchar'})
  // apellido: string;

  // @Column({type: 'varchar'})
  // @IsNumberString()
  // telefono: string;

  // @Exclude()
  // @CreateDateColumn({
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // created_at: Date;

  // @Exclude()
  // @UpdateDateColumn({
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updated_at: Date;

  // @OneToOne(() => Operador, (operador) => operador.comprador, {
  //   nullable: true,
  // })

  // @JoinColumn({ name: 'operador_id'})
  // operador: Operador;

  // @Column( { name: 'operador_id', nullable: true} )
  // operador_id: number;

  // @OneToMany(() => Pedido, (pedido) => pedido.comprador )
  // pedidos: Pedido[];
}