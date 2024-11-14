import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindConditions, Repository } from 'typeorm';

import { Producto } from './../entities/producto.entity';
import { CreateProductoDTO, FilterProductoDTO, UpdateProductoDTO } from './../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';
import { Categoria } from '../entities/categoria.entity';
import { productos } from 'src/data/data';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
    private fabricantesService: FabricantesService,
  ) {}
  
  async seedDB() {
    await Promise.all(productos.map((producto) => this.create(producto)));
    return 'Base de datos cargada';
  }
  findAll(params?: FilterProductoDTO) {
    // Opcional
    if ( params ) {
      const where: FindConditions<Producto> = {}
      const { limit, offset, precioMinimo, precioMaximo } = params;
      if(precioMinimo && precioMaximo) {
        where.precio = Between(precioMinimo, precioMaximo); 
      }
      return this.productosRepository.find({
        relations: ['fabricante', 'categorias'],
        where,
        take: limit,
        skip: offset,
      });
    }
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

    

  async addCategoryToProduct(produtoId: number, categoryId: number) {
    console.log(`Agregando categoría ${categoryId}`)
    const producto = await this.productosRepository.findOne(produtoId, {
      relations: ['categorias'],
    })
    const categoria = await this.categoriasRepository.findOne(categoryId);
    if (!categoria) {
      throw new Error(`Categoría con id ${categoryId} no encontrada`);
    }
    producto.categorias.push(categoria);
    return this.productosRepository.save(producto);
  }

  async removeProductFromCategory(produtoId: number, categoryId: number) {
    console.log(`Quitando categoría ${categoryId}`)
    const producto = await this.productosRepository.findOne(produtoId, {
      relations: ['categorias'],
    })
    producto.categorias = producto.categorias.filter(
      (cat) => cat.id !== categoryId,
    );
    return this.productosRepository.save(producto);
  }
}
