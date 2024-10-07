import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductosService {
  productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 100,
      stock: 50,
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 200,
      stock: 30,
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 300,
      stock: 20,
    },
  ];
  private idCont = 3; // idCont coincidente con la cantidad de productos
  findAll() {
    return this.productos;
  }

  findOne(id: number) {
    return this.productos.find((item) => item.id === id);
  }

  create(payload: any) {
    this.idCont = this.idCont + 1;
    const newProduct = {
      id: this.idCont,
      ...payload,
    };
    this.productos.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: any) {
    const product = this.productos.find((p) => p.id === id);
    if (!product) {
      throw new Error(`No se encontró el producto con id ${id}`);
    }
    Object.assign(product, payload);
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`El producto #${id} no se encuentra`);
    }

    // Reemplazar el producto actualizado en la lista
    this.productos.splice(index, 1, product);
    return {
      message: 'Producto actualizado correctamente',
      product,
    };
  }
  remove(id: number) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `El producto con el id ${id} no se encuentra`,
      );
    }
    this.productos.splice(index, 1);
    return {
      message: 'Producto eliminado correctamente',
      id,
    }
  }
}
