import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprador } from '../entities/comprador.entity';
import { Repository } from 'typeorm';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador)
    private readonly compradoresRepository: Repository<Comprador>,
  ){}
  compradores = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '123456789' },
        { id: 2, nombre: 'Maria', apellido: 'Lopez', telefono: '987654321' },
        { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', telefono: '147852369' },
        { id: 4, nombre: 'Luis', apellido: 'Gomez', telefono: '369852147' },
      ]
  private idCont = this.compradores.length; // idCont coincidente con la cantidad de compradores
  async seedDB(){
    await Promise.all(this.compradores.map((comprador) => this.create(comprador)));
    return 'Coimpradores cargados a la base de datos'
  }
  findAll() {
    return this.compradoresRepository.find();
  }

  findOne(id: number) {
    return this.compradoresRepository.findOneBy({ id });
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
  remove(id: number) {
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
    return this.compradoresRepository.delete(id)
  }
}
