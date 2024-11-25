import { Injectable, NotFoundException } from '@nestjs/common';
import { Fabricante } from '../entities/fabricante.entity';
import { CreateFabricanteDTO, FilterFabricantesDTO, UpdatefabricanteDTO } from '../dtos/fabricante.dto';
import { fabricantes } from 'src/data/data';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectModel(Fabricante.name)
    private readonly fabricantesModel: Model<Fabricante>,
  ){}
  
  async seedDB(){
    await Promise.all(fabricantes.map((fabricante) => this.create(fabricante)));
    return 'Fabricantes cargados a l a base de datos'
  }
  async findAll(params?: FilterFabricantesDTO) {
    if(params){
      const filters: FilterQuery<Fabricante> = {}
      const { limit, offset } = params;
      const result = await this.fabricantesModel.find()
        .lean<Fabricante[]>()
        .skip(offset)
        .limit(limit)
        .exec();

      const ids = result.map(r => r._id.toString())

      return {
        data: result,
        ids
      }
    }
    return this.fabricantesModel.find().exec();
  }

  async findOne(id: string) {
    const fabricante = await this.fabricantesModel.findById(id).exec();
    if ( !fabricante ){
      throw new NotFoundException(
        `El producto con el id ${id} no se encuentra`,
      );
    }
    return await fabricante;
  }

  async create(payload: CreateFabricanteDTO) {
    const newFabricante = new this.fabricantesModel(payload);
    return await newFabricante.save();
  }

  async update(id: string, payload: UpdatefabricanteDTO) {
    const fabricante = await this.fabricantesModel
    .findByIdAndUpdate(id, { $set: payload }, { new: true })
    .exec()
    if (!fabricante) {
      throw new NotFoundException(`El fabricante con el id ${id} no se encuentra`);
    } 
    return fabricante
  }

  async remove(id: string) {
    return {
      fabricante: await this.fabricantesModel.findByIdAndDelete(id),
      message: `El fabricante con el id ${id} ha sido eliminado de la base de datos` 
      }

  }
  
 
}
