import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from './../entities/producto.entity';
import { CreateProductoDTO, UpdateProductoDTO } from './../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
    private fabricantesService: FabricantesService,
  ) {}
  productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 100,
      stock: 10,
      descripcion: 'Descripción del producto 1',
      imagen: 'imagen1.png',
      origen: 'Origen 1',
      fabricanteId: 3,
      categoriasIds: [1, 2],
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 200,
      stock: 5,
      descripcion: 'Descripción del producto 2',
      imagen: 'imagen2.png',
      origen: 'Origen 2',
      fabricanteId: 3,
      categoriasIds: [2],
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 150,
      stock: 15,
      descripcion: 'Descripción del producto 3',
      imagen: 'imagen3.png',
      origen: 'Origen 3',
      fabricanteId: 4,
      categoriasIds: [3],
    },
  ];

  async seedDB() {
    await Promise.all(this.productos.map((producto) => this.create(producto)));
    return 'Base de datos cargada';
  }
  findAll() {
    return this.productosRepository.find({
      relations: ['fabricante', 'categorias'],
    });
  }

  findOne(id: number) {
    const product = this.productosRepository.findOne(id, {
      relations: ['fabricante', 'categorias'],
    });
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${id} no se encuentra`,
      );
    }
    return product;
  }

  async create(payload: CreateProductoDTO) {

    const newProduct = this.productosRepository.create(payload);
    if (payload.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(
        payload.fabricanteId,
      );
      if (!fabricante) {
        throw new Error(
          `Fabricante con id ${payload.fabricanteId} no encontrado`,
        );
      }
      newProduct.fabricante = fabricante;
    }
    if (payload.categoriasIds) {
      const categorias = await this.categoriasRepository.findByIds(
        payload.categoriasIds,
      );
      console.log('estas son las categorias a guardar',categorias)
      if (categorias.length !== payload.categoriasIds.length) {
        throw new Error(
          `Hay un error con alguno de los ids ${payload.categoriasIds}. Verifique`,
        );
      }
      newProduct.categorias = categorias;
    }
    return this.productosRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductoDTO) {
    // Separar los IDs de fabricante y categorías del resto del payload
    const { fabricanteId, categoriasIds, ...updateData } = payload;
  
    // Buscar el producto
    const product = await this.productosRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no se encuentra`);
    }
  
    // Validar y asignar el fabricante si fabricanteId está en el payload
    if (fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(fabricanteId);
      if (!fabricante) {
        throw new Error(`Fabricante con id ${fabricanteId} no encontrado`);
      }
      product.fabricante = fabricante;
    }
  
    // Validar y asignar categorías si categoriasIds está en el payload
    if (categoriasIds && categoriasIds.length > 0) {
      const categorias = await this.categoriasRepository.findByIds(categoriasIds);
      if (categorias.length !== categoriasIds.length) {
        throw new Error(`Hay un error con alguno de los ids ${categoriasIds}. Verifique`);
      }
      product.categorias = categorias;
    }
  
    // Actualizar el producto con el resto de los datos del payload
    this.productosRepository.merge(product, updateData);
    return this.productosRepository.save(product);
  }
  
  remove(id: number) {

    return this.productosRepository.delete(id);
  }
}
