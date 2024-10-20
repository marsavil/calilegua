import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CompradoresService {
  compradores = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '123456789' },
        { id: 2, nombre: 'Maria', apellido: 'Lopez', telefono: '987654321' },
        { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', telefono: '147852369' },
        { id: 4, nombre: 'Luis', apellido: 'Gomez', telefono: '369852147' },
      ]
  private idCont = this.compradores.length; // idCont coincidente con la cantidad de compradores
  findAll() {
    return this.compradores;
  }

  findOne(id: number) {
    return this.compradores.find((item) => item.id === id);
  }

  create(payload: any) {
    this.idCont = this.idCont + 1;
    const newComprador = {
      id: this.idCont,
      ...payload,
    };
    this.compradores.push(newComprador);
    return newComprador;
  }
  update(id: number, payload: any) {
    const comprador = this.compradores.find((p) => p.id === id);
    if (!comprador) {
      throw new Error(`No se encontró el compradoro con id ${id}`);
    }
    Object.assign(comprador, payload);
    const index = this.compradores.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`El comprador #${id} no se encuentra`);
    }

    // Reemplazar el compradoro actualizado en la lista
    this.compradores.splice(index, 1, comprador);
    return {
      message: 'comprador actualizado correctamente',
      comprador,
    };
  }
  remove(id: number) {
    const index = this.compradores.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `El comprador con el id ${id} no se encuentra`,
      );
    }
    this.compradores.splice(index, 1);
    return {
      message: 'comprador eliminado correctamente',
      id,
    }
  }
}
