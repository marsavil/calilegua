import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Comprador } from './comprador.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Operador {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column({type: 'varchar', unique: true})
  // email: string;

  // @Column({type: 'varchar'})
  // password: string;

  // @Column({type: 'varchar'})
  // role: string;

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

  // @OneToOne(() => Comprador, (comprador) => comprador.operador, {
  //   nullable: true,
  // })
  // @JoinColumn({ 
  //   name: 'comprador_id'
  // })
  // comprador: Comprador;

  // @Column( { name: 'comprador_id', nullable: true} )
  // comprador_id: number;
  
}