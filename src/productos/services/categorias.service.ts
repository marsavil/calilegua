import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categorias.dto';
import { categorias } from 'src/data/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriasModel: Model<Categoria>,
  ){}

  async findAll() {
    const result = await this.categoriasModel
    .find()
    .lean<Categoria[]>()
    .populate('productos')
    .exec();

    const ids = result.map(r => r._id.toString())
      const formated = result.map((r) => {
        const id = r._id.toString();
        r._id = id;
        return r
      })

      return formated
  }

  findOne(id: string) {
    const categoria = this.categoriasModel
    .findById(id)
    .populate('productos');
    if (!categoria) {
      throw new NotFoundException(`No se encontró la categoría con id ${id}`);
    }
    // return this.categoriasModel.findOneBy({id});
    return categoria;
  }

  async seedDB(){
    await Promise.all(categorias.map((categoria) => this.create(categoria)));
    return 'Categorias cargadas a la base de datos'
  }
  async create(payload: CreateCategoriaDTO) {
    const newCategoria = new this.categoriasModel(payload);
    await newCategoria.save();
    const { _id, ...rest }: any  = newCategoria;
    const stringId = _id.toString();
    return {
      _id: stringId,
      ...rest
    }

  }
  async update(id: string, payload: UpdateCategoriaDTO) {
    const category = await this.categoriasModel
    .findByIdAndUpdate( id, { $set: payload }, { new: true })
    .exec();
    if ( !category ) {
      throw new NotFoundException(`La categoria con el id ${id} no se encuentra`);
    } 
    return await category.save();
  }
  async remove(id: string) {
    if (!id) {
      throw new Error('ID no proporcionado');
    }
  
    const deletedCategory = await this.categoriasModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error(`Categoría con id ${id} no encontrada`);
    }
  
    return `La categoría con el id ${id} ha sido eliminada de la base de datos`;
  }
}
