import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 

import { Producto } from './../entities/producto.entity'; 
import { CreateProductoDTO, UpdateProductoDTO } from './../dtos/productos.dto';


@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
  ){}
  productos = [
    { 
      id: 1, 
      nombre: 'Producto 1', 
      precio: 100, 
      stock: 10, 
      descripcion: 'Descripción del producto 1', 
      imagen: 'imagen1.png', 
      origen: 'Origen 1' 
    },
    { 
      id: 2, 
      nombre: 'Producto 2', 
      precio: 200, 
      stock: 5, 
      descripcion: 'Descripción del producto 2', 
      imagen: 'imagen2.png', 
      origen: 'Origen 2' 
    },
    { 
      id: 3, 
      nombre: 'Producto 3', 
      precio: 150, 
      stock: 15, 
      descripcion: 'Descripción del producto 3', 
      imagen: 'imagen3.png', 
      origen: 'Origen 3' 
    }]
  private idCont = this.productos.length; // idCont coincidente con la cantidad de productos
  
  async seedDB(){
    await Promise.all(this.productos.map((producto) => this.create(producto)));
    return 'Base de datos cargada'
  }
  findAll() {
    return this.productosRepository.find();
  }

  findOne(id: number) {
    return this.productosRepository.findOneBy({id});
  }

  async create(payload: CreateProductoDTO) {
    // this.idCont = this.idCont + 1;
    // const newProduct = {
    //   id: this.idCont,
    //   ...payload,
    // };
    // this.productos.push(newProduct);
    // return newProduct;
    const newProduct = this.productosRepository.create(payload)
    return this.productosRepository.save(newProduct);
  }
  async update(id: number, payload: UpdateProductoDTO) {
    // const product = this.productos.find((p) => p.id === id);
    // if (!product) {
    //   throw new Error(`No se encontró el producto con id ${id}`);
    // }
    // Object.assign(product, payload);
    // const index = this.productos.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`El producto #${id} no se encuentra`);
    // }

    // // Reemplazar el producto actualizado en la lista
    // this.productos.splice(index, 1, product);
    // return {
    //   message: 'Producto actualizado correctamente',
    //   product,
    // };
    const product = await this.productosRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no se encuentra`);
    }
    this.productosRepository.merge( product, payload )
    return this.productosRepository.save(product)
  }
  remove(id: number) {
    // const index = this.productos.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(
    //     `El producto con el id ${id} no se encuentra`,
    //   );
    // }
    // this.productos.splice(index, 1);
    // return {
    //   message: 'Producto eliminado correctamente',
    //   id,
    // }
    return this.productosRepository.delete(id)
  }
}
