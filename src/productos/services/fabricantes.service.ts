import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FabricantesService {
  fabricantes = [
    {
      id: 1,
      nombre: 'Fabricante1',
      direccion: 'calle 1',
      email: 'fabricante1@mail.com',
      imagen:
        'https://res.cloudinary.com/dlzp43wz9/image/upload/v1709585844/user-icon-2048x2048-ihoxz4vq_ydc8ku.png',
    },
    {
      id: 2,
      nombre: 'Fabricante2',
      direccion: 'calle 2',
      email: 'fabricante2@mail.com',
      imagen:
        'https://res.cloudinary.com/dlzp43wz9/image/upload/v1709585844/user-icon-2048x2048-ihoxz4vq_ydc8ku.png',
    },
  ];
  private idCont = this.fabricantes.length; // idCont coincidente con la cantidad de fabricantes
  findAll() {
    return this.fabricantes;
  }

  findOne(id: number) {
    return this.fabricantes.find((item) => item.id === id);
  }

  create(payload: any) {
    this.idCont = this.idCont + 1;
    const newFabricante = {
      id: this.idCont,
      ...payload,
    };
    this.fabricantes.push(newFabricante);
    return newFabricante;
  }
  update(id: number, payload: any) {
    const fabricante = this.fabricantes.find((p) => p.id === id);
    if (!fabricante) {
      throw new Error(`No se encontró el fabricante con id ${id}`);
    }
    Object.assign(fabricante, payload);
    const index = this.fabricantes.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`El fabricante #${id} no se encuentra`);
    }

    // Reemplazar el producto actualizado en la lista
    this.fabricantes.splice(index, 1, fabricante);
    return {
      message: 'Fabricante actualizado correctamente',
      fabricante,
    };
  }
  remove(id: number) {
    const index = this.fabricantes.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `El fabricante con el id ${id} no se encuentra`,
      );
    }
    this.fabricantes.splice(index, 1);
    return {
      message: 'Fabricante eliminado correctamente',
      id,
    };
  }
}
