import { Injectable, NotFoundException } from '@nestjs/common';
import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDTO, FilterCompradoresDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';
import { compradores } from 'src/data/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectModel(Comprador.name)
    private readonly compradoresModel: Model<Comprador>,
  ){}
  async seedDB(){
    console.log("Carga de compradores")
    await Promise.all(compradores.map((comprador) => this.create(comprador)));
    return 'Compradores cargados a la base de datos'
  }
  async findAll(params?: FilterCompradoresDTO) {
    if (params) {
      const { limit, offset } = params
      const result = await this.compradoresModel
      .find()
      .lean<Comprador[]>()
      .skip(offset)
      .limit(limit)
      .exec()

      const ids = result.map(r => r._id.toString())

      return {
        data: result,
        ids
      }
    }
    const result = await this.compradoresModel
    .find()
    .exec()
    const ids = result.map(r => r._id.toString())
    return {
      data: result,
      ids
    }
  }

  async findOne(id: string) {
    const comprador = await this.compradoresModel.findById( id );
    if (!comprador) {
      throw new NotFoundException(`El comprador con el id ${id} no se encuentra`);
    }
    return comprador
  }

  async create(payload: CreateCompradorDTO) {
    try {
      //console.log("Agregando el nuevo comprador")
      const newComprador = await new this.compradoresModel(payload);
      return  newComprador;
    } catch (error: any) {
      return error.message
    }

  }
  async update(id: string, payload: UpdateCompradorDTO) {
    const comprador = await this.compradoresModel.findByIdAndUpdate(id)
    if (!comprador) {
      throw new NotFoundException(`El comprador con el id ${id} no se encuentra`);
    }
    return await comprador.save();
  }
  async remove(id: string) {

    return {
      producto: await this.compradoresModel.findByIdAndDelete(id),
      message: `El comprador con el id ${id} ha sido eliminado de la base de datos` 
      }
    }
  }
