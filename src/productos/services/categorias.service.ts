import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from '../entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categorias.dto';
import { categorias } from 'src/data/data';

@Injectable()
export class CategoriasService {
  // constructor(
  //   @InjectRepository(Categoria)
  //   private readonly categoriasRepository: Repository<Categoria>,
  // ){}

  // findAll() {
  //   return this.categoriasRepository.find();
  // }

  // findOne(id: number) {
  //   const categoria = this.categoriasRepository.findOne(id);
  //   if (!categoria) {
  //     throw new NotFoundException(`No se encontró la categoría con id ${id}`);
  //   }
  //   // return this.categoriasRepository.findOneBy({id});
  //   return categoria;
  // }

  // async seedDB(){
  //   await Promise.all(categorias.map((categoria) => this.create(categoria)));
  //   return 'Categorias cargadas a la base de datos'
  // }
  // async create(payload: CreateCategoriaDTO) {
  //   // this.idCont = this.idCont + 1;
  //   // const newCategory = {
  //   //   id: this.idCont,
  //   //   ...payload,
  //   // };
  //   // this.categorias.push(newCategory);
  //   // return newCategory;
  //   const newCategory = this.categoriasRepository.create(payload)
  //   return await this.categoriasRepository.save(newCategory);
  // }
  // async update(id: number, payload: UpdateCategoriaDTO) {
  //   // const category = this.categorias.find((p) => p.id === id);
  //   // if (!category) {
  //   //   throw new Error(`No se encontró la categoría con id ${id}`);
  //   // }
  //   // Object.assign(category, payload);
  //   // const index = this.categorias.findIndex((item) => item.id === id);
  //   // if (index === -1) {
  //   //   throw new NotFoundException(`La categoriía #${id} no se encuentra`);
  //   // }

  //   // // Reemplazar el categoryo actualizado en la lista
  //   // this.categorias.splice(index, 1, category);
  //   // return {
  //   //   message: 'Categoria actualizada correctamente',
  //   //   category,
  //   // };
  //   const category = await this.findOne(id);
  //   if (!category) {
  //     throw new NotFoundException(`El operador #${id} no se encuentra`);
  //   }
  //   this.categoriasRepository.merge(category, payload);
  //   return await this.categoriasRepository.save(category);
  // }
  // remove(id: number) {
  //   // const index = this.categorias.findIndex((item) => item.id === id);
  //   // if (index === -1) {
  //   //   throw new NotFoundException(
  //   //     `La categoria con el id ${id} no se encuentra`,
  //   //   );
  //   // }
  //   // this.categorias.splice(index, 1);
  //   // return {
  //   //   message: 'Categoría eliminada correctamente',
  //   //   id,
  //   // }
  //   return this.categoriasRepository.delete(id)
  // }
}
