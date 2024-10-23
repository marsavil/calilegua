import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Operador } from 'src/operadores/entities/operador.entity';
import { Pedido } from 'src/operadores/entities/pedido.entity';
import { ProductosService } from 'src/productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { Client } from 'pg';


@Injectable()
export class OperadoresService {
  constructor(
    private productService: ProductosService,
    private configService: ConfigService, // Inyección de dependencias de ConfigService
    @Inject('PG') private clientPg: Client,
  ){}
  operadores: Operador[] = [
    { id: 1, email: 'operador1@email.com', password: '123456', role: 'admin' },
    { id: 2, email: 'operador2@email.com', password: '654321', role: 'operador' },
  ];
  private idCont = this.operadores.length; // idCont coincidente con la cantidad de operadores

  getOrdersByUser (id: number): Pedido {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      productos: this.productService.findAll()
    }
  }
  findOne(id: number) {
    return this.operadores.find((item) => item.id === id);
  }
  findAll() {
    const apiKey = this.configService.get('API_KEY'); // Asignacion de la variable de entorno a una constante
    const dbName = this.configService.get('DATABASE_NAME');  // idem
    console.log('Api key: ',apiKey, 'DB name: ', dbName);
    return this.operadores;
    }
    update(id: number, payload: UpdateOperadorDTO) {
      const operador = this.operadores.find((p) => p.id === id);
      if (!operador) {
        throw new Error(`No se encontró el operador con id ${id}`);
      }
      Object.assign(operador, payload);
      const index = this.operadores.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new NotFoundException(`El operador #${id} no se encuentra`);
      }
  
      // Reemplazar el operadoro actualizado en la lista
      this.operadores.splice(index, 1, operador);
      return {
        message: 'operador actualizado correctamente',
        operador,
      };
    }
    create(payload: CreateOperadorDTO) {
      this.idCont = this.idCont + 1;
      const newOperador = {
        id: this.idCont,
        ...payload,
      };
      this.operadores.push(newOperador);
      return newOperador;
    }
    remove(id: number) {
      const index = this.operadores.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new NotFoundException(
          `El operador con el id ${id} no se encuentra`,
        );
      }
      this.operadores.splice(index, 1);
      return {
        message: 'Operador eliminado correctamente',
        id,
      }
    }
    getTasks() {
      console.log('Solicitando listado de tareas desde la BD');
      return new Promise((resolve, reject) => {
        this.clientPg.query('SELECT * FROM tareas', (err, res) => {
          if (err) {
            console.log('Error de petición', err);
            reject(err);
          }
          console.log('respuesta:', res.rows);
          resolve(res.rows);
        });
      });
    }
    
}
