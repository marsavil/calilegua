import { Injectable, NotFoundException } from '@nestjs/common';
import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDTO, FilterCompradoresDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';
import { compradores } from '../../data/data';
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
  const formatResult = (result: Comprador[]) =>
    result.map((comprador) => {
      const id = comprador._id.toString(); // Convertir ObjectId a string
      const direcciones = comprador.direcciones.map((direccion) => {
        const { _id, ...rest } = direccion;
        return { _id: _id.toString(), ...rest }; // Formatear ID de direcciones
      });
      return { ...comprador, _id: id, direcciones }; // Actualizar comprador
    });

  if (params) {
    const { limit, offset } = params;
    const result = await this.compradoresModel
      .find()
      .lean<Comprador[]>()
      .skip(offset)
      .limit(limit)
      .exec();
    return formatResult(result);
  }

  const result = await this.compradoresModel.find().exec();
  return formatResult(result);
}

  async findOne(id: string) {
    const comprador = await this.compradoresModel
    .findById( id )
    .lean<Comprador>();
    if (!comprador) {
      throw new NotFoundException(`El comprador con el id ${id} no se encuentra`);
    }
    const { _id, direcciones, ...rest }: any = comprador;
    const formatDirecciones = direcciones.map((direccion) => {
      const { _id, ...rest } = direccion;
      return { _id: _id.toString(), ...rest }; // Formatear ID de direcciones
    });
    const stringId = _id.toString();

    return {
      _id: stringId,
      ...rest,
      direcciones: formatDirecciones,
    }
  }

  async create(payload: CreateCompradorDTO) {
      //console.log("Agregando el nuevo comprador")
      const newComprador = new this.compradoresModel(payload);
      await newComprador.save();
      return  newComprador;
  }
  async update(id: string, payload: UpdateCompradorDTO) {
    const comprador = await this.compradoresModel.findByIdAndUpdate(id)
    if (!comprador) {
      throw new NotFoundException(`El comprador con el id ${id} no se encuentra`);
    }
    return await comprador.save();
  }
  async remove(id: string) {
    await this.compradoresModel.findByIdAndDelete(id);
    return `El comprador con el id ${id} ha sido eliminado de la base de datos`
    
  }
}
