import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Operador } from 'src/operadores/entities/operador.entity';
//import { Pedido } from 'src/operadores/entities/pedido.entity';
import { ProductosService } from 'src/productos/services/productos.service';
import { CreateOperadorDTO, FilterOperadoresDTO, UpdateOperadorDTO } from '../dtos/operador.dto';;
import { CompradoresService } from './compradores.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private readonly operadoresModel: Model<Operador>,
    private compradorService: CompradoresService,
    private productService: ProductosService,
    private configService: ConfigService, // Inyección de dependencias de ConfigService

    //@Inject('PG') private clientPg: Client,
  ){}
  operadores: CreateOperadorDTO[] = [
    { email: 'operador1@email.com', password: '123456', role: 'admin' },
    { email: 'operador2@email.com', password: '654321', role: 'operador' },
  ];
  
  async seedDB() {
    // Usa un bucle para crear y guardar cada operador
    for (const operador of this.operadores) {
      this.create(operador)
    }
    return 'Carga inicial de operadores a la base de datos realizada';
  }

  async findOne(id: string) {
    const operador = await this.operadoresModel
    .findById(id)
    .lean<Operador>();
    if ( !operador ) {
      throw new NotFoundException(`El operador con el id ${id} no se encuentra`);
    }
    const { _id, password, ...rest }: any = operador;
    const stringId = _id.toString();

    return {
      _id: stringId,
      ...rest
    }
  }
  async findAll(params?: FilterOperadoresDTO) {
    const query = this.operadoresModel.find();
  
    if (params) {
      const { limit, offset } = params;
      query.skip(offset).limit(limit);
    }
  
    // Excluimos el campo 'password' y usamos lean() para obtener objetos JavaScript simples
    const result = await query.select('-password').lean<Operador[]>().exec();
  
    // Convertimos _id de ObjectId a string
    const formated = result.map((r) => ({
      ...r,
      _id: r._id.toString(), // Convertir ObjectId a string
    }));
  
    return formated;
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
      const hashPassword = await bcrypt.hash(newOperador.password, 10);
      console.log('se va a guardar la contraseña hasheada', hashPassword)
      newOperador.password = hashPassword;
      const operador = await newOperador.save();
      const id = operador._id.toString()
      const { password, ...rest } = operador.toJSON()
      rest._id = id
      return ; 
    }
    async remove(id: string) {

      return {
        producto: await this.operadoresModel.findByIdAndDelete(id),
        message: `El operador con el id ${id} ha sido eliminado de la base de datos` 
        }
    }

    async findByEmail(email: string){
      const user = await this.operadoresModel.findOne({email}).exec()
      if ( !user ){
        throw new NotFoundException
      }
      const id = user._id.toString()
      user._id = id
      return user
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
