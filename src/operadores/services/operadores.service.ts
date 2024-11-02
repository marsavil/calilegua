import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Operador } from 'src/operadores/entities/operador.entity';
//import { Pedido } from 'src/operadores/entities/pedido.entity';
import { ProductosService } from 'src/productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompradoresService } from './compradores.service';


@Injectable()
export class OperadoresService {
  constructor(
    @InjectRepository(Operador)
    private readonly operadoresRepository: Repository<Operador>,
    private compradorService: CompradoresService,
    private productService: ProductosService,
    private configService: ConfigService, // Inyección de dependencias de ConfigService

    //@Inject('PG') private clientPg: Client,
  ){}
  // operadores: Operador[] = [
  //   { id: 1, email: 'operador1@email.com', password: '123456', role: 'admin' },
  //   { id: 2, email: 'operador2@email.com', password: '654321', role: 'operador' },
  // ];
  // private idCont = this.operadores.length; // idCont coincidente con la cantidad de operadores

  // async seedDB(){
  //   await Promise.all(this.operadores.map((operador) => this.create(operador)));
  //   return 'Carga inicial de operadores a base de datos realizada'
  // }

  async findOne(id: number) {
    const operador = await this.operadoresRepository.findOne(id, {
      relations: ['comprador'],
    });
    if ( !operador ) {
      throw new NotFoundException(`El operador con el id ${id} no se encuentra`);
    }
    // return this.operadoresRepository.findOneBy({id});
    return operador;
  }
  async findAll() {
    // const apiKey = this.configService.get('API_KEY'); // Asignacion de la variable de entorno a una constante
    // const dbName = this.configService.get('DATABASE_NAME');  // idem
    // console.log('Api key: ',apiKey, 'DB name: ', dbName);
    // return this.operadores;
    const operadores = await this.operadoresRepository.find({
      relations: ['comprador'],
    });
    if ( !operadores.length ) {
      throw new NotFoundException(`No se encontraron operadores cargados a la base de datos`);
    }
    return operadores;
    }

    async update(id: number, payload: UpdateOperadorDTO) {
      // const operador = this.operadores.find((p) => p.id === id);
      // if (!operador) {
      //   throw new Error(`No se encontró el operador con id ${id}`);
      // }
      // Object.assign(operador, payload);
      // const index = this.operadores.findIndex((item) => item.id === id);
      // if (index === -1) {
      //   throw new NotFoundException(`El operador #${id} no se encuentra`);
      // }
  
      // Reemplazar el operadoro actualizado en la lista
      // this.operadores.splice(index, 1, operador);
      // return {
      //   message: 'operador actualizado correctamente',
      //   operador,
      // };
      const operador = await this.findOne(id);
      if (!operador) {
        throw new NotFoundException(`El operador con el id ${id} no se encuentra`);
      }
      await this.operadoresRepository.merge(operador, payload)
      return await this.operadoresRepository.save(operador);
    }
    async create(payload: CreateOperadorDTO) {
      // this.idCont = this.idCont + 1;
      // const newOperador = {
      //   id: this.idCont,
      //   ...payload,
      // };
      // this.operadores.push(newOperador);
      // return newOperador;
      const newOperador = this.operadoresRepository.create(payload);
      return await this.operadoresRepository.save(newOperador); 
    }
    async remove(id: number) {
      // const index = this.operadores.findIndex((item) => item.id === id);
      // if (index === -1) {
      //   throw new NotFoundException(
      //     `El operador con el id ${id} no se encuentra`,
      //   );
      // }
      // this.operadores.splice(index, 1);
      // return {
      //   message: 'Operador eliminado correctamente',
      //   id,
      // }
      const operador = await  this.operadoresRepository.findOne(id);
      if (!operador) {
        throw new NotFoundException(`El  id ${id} no pertenece a un operador registrado en esta base de datos`);
      }
      return this.operadoresRepository.delete(id)
    }
    async getOrdersByUser (id: number){
      const operador = this.findOne(id);
      const productos = await this.productService.findAll();  // Esperar el resultado de findAll
      return {
        date: new Date(),
        operador,
        productos
      }
    }
    // getTasks() {
    //   console.log('Solicitando listado de tareas desde la BD');
    //   return new Promise((resolve, reject) => {
    //     this.clientPg.query('SELECT * FROM tareas', (err, res) => {
    //       if (err) {
    //         console.log('Error de petición', err);
    //         reject(err);
    //       }
    //       console.log('respuesta:', res.rows);
    //       resolve(res.rows);
    //     });
    //   });
    // }
    
}
