import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Operador } from 'src/operadores/entities/operador.entity';
//import { Pedido } from 'src/operadores/entities/pedido.entity';
import { ProductosService } from 'src/productos/services/productos.service';
import { CreateOperadorDTO, FilterOperadoresDTO, UpdateOperadorDTO } from '../dtos/operador.dto';;
import { CompradoresService } from './compradores.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private readonly operadoresModel: Model<Operador>,
    private compradorService: CompradoresService,
    private productService: ProductosService,
    private configService: ConfigService, // Inyección de dependencias de ConfigService

    //@Inject('PG') private clientPg: Client,
  ){}
  operadores: Partial<Operador>[] = [
    { email: 'operador1@email.com', password: '123456', role: 'admin' },
    { email: 'operador2@email.com', password: '654321', role: 'operador' },
  ];
  private idCont = this.operadores.length; // idCont coincidente con la cantidad de operadores

  async seedDB() {
    // Usa un bucle para crear y guardar cada operador
    for (const operador of this.operadores) {
      const nuevoOperador = new this.operadoresModel(operador);
      await nuevoOperador.save(); // Guardar cada operador
    }
    return 'Carga inicial de operadores a la base de datos realizada';
  }

  async findOne(id: string) {
    const operador = await this.operadoresModel.findById(id);
    if ( !operador ) {
      throw new NotFoundException(`El operador con el id ${id} no se encuentra`);
    }
    // return this.operadoresModel.findOneBy({id});
    return operador;
  }
  async findAll(params?: FilterOperadoresDTO) {
    if (params) {
      const { limit, offset } = params;
      const result = await this.operadoresModel
      .find()
      .lean<Operador[]>()
      .skip(offset)
      .limit(limit)
      .exec()

      const formated = result.map((r) => {
        const id = r._id.toString(); // Convertir ObjectId a string
        return { ...r, _id: id }; // Actualiza el formato de _id
      });
      return formated
    }
    const result = await this.operadoresModel
    .find()
    .exec()
    const ids = result.map(r => r._id.toString())
    return {
      data: result,
      ids
    };
    }

    async update(id: string, payload: UpdateOperadorDTO) {
      const operador = await this.operadoresModel
      .findByIdAndUpdate(id, { $set: payload }, { new:true })
      .exec();

      if (!operador) {
        throw new NotFoundException(`El operador con el id ${id} no se encuentra`);
      }
      return await operador.save()
    }
    async create(payload: CreateOperadorDTO) {
      const newOperador = new this.operadoresModel(payload);
      return await newOperador.save(); 
    }
    async remove(id: string) {

      return {
        producto: await this.operadoresModel.findByIdAndDelete(id),
        message: `El operador con el id ${id} ha sido eliminado de la base de datos` 
        }
    }
    // async getOrdersByUser (id: number){
    //   const operador = this.findOne(id);
    //   const productos = await this.productService.findAll();  // Esperar el resultado de findAll
    //   return {
    //     date: new Date(),
    //     operador,
    //     productos
    //   }
  //}
}
