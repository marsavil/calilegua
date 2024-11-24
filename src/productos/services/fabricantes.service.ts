import { Injectable, NotFoundException } from '@nestjs/common';
import { Fabricante } from '../entities/fabricante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFabricanteDTO, FilterFabricantesDTO, UpdatefabricanteDTO } from '../dtos/fabricante.dto';
import { fabricantes } from 'src/data/data';

@Injectable()
export class FabricantesService {
  // constructor(
  //   @InjectRepository(Fabricante)
  //   private readonly fabricantesRepository: Repository<Fabricante>,
  // ){}
  
  // async seedDB(){
  //   await Promise.all(fabricantes.map((fabricante) => this.create(fabricante)));
  //   return 'Fabricantes cargados a l a base de datos'
  // }
  // findAll(params?: FilterFabricantesDTO) {
  //   if(params){
  //     const { limit, offset } = params;
  //     return this.fabricantesRepository.find({ 
  //       relations: ['products'], 
  //       take: limit, 
  //       skip: offset 
  //     });
  //   }
  //   return this.fabricantesRepository.find({ relations: ['products']});
  // }

  // findOne(id: number) {
  //   // return this.fabricantesRepository.findOneBy({id});
  //   return this.fabricantesRepository.findOne(id, { relations: ['products']});
  // }

  // async create(payload: CreateFabricanteDTO) {
  //   // this.idCont = this.idCont + 1;
  //   // const newFabricante = {
  //   //   id: this.idCont,
  //   //   ...payload,
  //   // };
  //   // this.fabricantes.push(newFabricante);
  //   const newFabricante = this.fabricantesRepository.create(payload)
  //   return this.fabricantesRepository.save(newFabricante);
  // }
  // async update(id: number, payload: UpdatefabricanteDTO) {
  //   // const fabricante = this.fabricantes.find((p) => p.id === id);
  //   // if (!fabricante) {
  //   //   throw new Error(`No se encontró el fabricante con id ${id}`);
  //   // }
  //   // Object.assign(fabricante, payload);
  //   // const index = this.fabricantes.findIndex((item) => item.id === id);
  //   // if (index === -1) {
  //   //   throw new NotFoundException(`El fabricante #${id} no se encuentra`);
  //   // }

  //   // // Reemplazar el producto actualizado en la lista
  //   // this.fabricantes.splice(index, 1, fabricante);
  //   // return {
  //   //   message: 'Fabricante actualizado correctamente',
  //   //   fabricante,
  //   // };
  //   const fabricante = await this.findOne(id)
  //   if (!fabricante) {
  //     throw new NotFoundException(`El fabricante con id ${id} no se encuentra`);
  //   }
  //   this.fabricantesRepository.merge(fabricante, payload)
  //   console.log(fabricante)
  //   return this.fabricantesRepository.save(fabricante);
  // }
  // remove(id: number) {
  //   // const index = this.fabricantes.findIndex((item) => item.id === id);
  //   // if (index === -1) {
  //   //   throw new NotFoundException(
  //   //     `El fabricante con el id ${id} no se encuentra`,
  //   //   );
  //   // }
  //   // this.fabricantes.splice(index, 1);
  //   // return {
  //   //   message: 'Fabricante eliminado correctamente',
  //   //   id,
  //   // };
  //   return this.fabricantesRepository.delete(id)
  // }
}
