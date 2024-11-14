import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprador } from '../entities/comprador.entity';
import { Repository } from 'typeorm';
import { CreateCompradorDTO, FilterCompradoresDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';
import { compradores } from 'src/data/data';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador)
    private readonly compradoresRepository: Repository<Comprador>,
  ){}
  async seedDB(){
    await Promise.all(compradores.map((comprador) => this.create(comprador)));
    return 'Coimpradores cargados a la base de datos'
  }
  async findAll(params?: FilterCompradoresDTO) {
    if (params) {
      const { limit, offset } = params
      return this.compradoresRepository.find({
        relations: ['operador'],
        take: limit,
        skip: offset,
      });
    }
    const compradores =  await this.compradoresRepository.find({
      relations: ['operador']
    });
    if ( !compradores.length) {
      throw new NotFoundException('No se encontraron compradores en la base de datos');
    }
    return compradores
  }

  async findOne(id: number) {
    //return this.compradoresRepository.findOneBy({ id });
    const comprador = await this.compradoresRepository.findOne( id, {
      relations: ['operador']
    } );
    if (!comprador) {
      throw new NotFoundException(`El comprador con el id ${id} no se encuentra`);
    }
    return comprador
  }

  async create(payload: CreateCompradorDTO) {
    // this.idCont = this.idCont + 1;
    // const newComprador = {
    //   id: this.idCont,
    //   ...payload,
    // };
    // this.compradores.push(newComprador);
    // return newComprador;
    const newComprador = await this.compradoresRepository.create(payload);
    return await this.compradoresRepository.save(newComprador);
  }
  async update(id: number, payload: UpdateCompradorDTO) {
    // const comprador = this.compradores.find((p) => p.id === id);
    // if (!comprador) {
    //   throw new Error(`No se encontró el compradoro con id ${id}`);
    // }
    // Object.assign(comprador, payload);
    // const index = this.compradores.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`El comprador #${id} no se encuentra`);
    // }

    // // Reemplazar el compradoro actualizado en la lista
    // this.compradores.splice(index, 1, comprador);
    // return {
    //   message: 'comprador actualizado correctamente',
    //   comprador,
    // };
    const comprador = await this.findOne(id)
    if (!comprador) {
      throw new NotFoundException(`El comprador con el id ${id} no se encuentra`);
    }
    await this.compradoresRepository.merge(comprador, payload);
    return await this.compradoresRepository.save(comprador);
  }
  async remove(id: number) {
    // const index = this.compradores.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(
    //     `El comprador con el id ${id} no se encuentra`,
    //   );
    // }
    // this.compradores.splice(index, 1);
    // return {
    //   message: 'comprador eliminado correctamente',
    //   id,
    // }
    const comprador = await this.compradoresRepository.findOne(id);
    if (!comprador) {
      throw new NotFoundException(`No existe un comprador con el id ${id} en esta base de datos`);
    }
    return this.compradoresRepository.delete(id)
  }
}
