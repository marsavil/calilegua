import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './../entities/producto.entity';
import { CreateProductoDTO, FilterProductoDTO, UpdateProductoDTO } from './../dtos/productos.dto';
import { productos } from 'src/data/data';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productosModel: Model<Producto>,
  ) {}
  
  async seedDB() {
    await Promise.all(productos.map((producto) => this.create(producto)));
    return 'Base de datos cargada';
  }
  async findAll(params?: FilterProductoDTO) {
    // Opcional
    if ( params ) {
      const filters: FilterQuery<Producto> = {}
      const { limit, offset, precioMinimo, precioMaximo } = params;
      if(precioMinimo && precioMaximo) {
        filters.precio = { $gte: precioMinimo, $lte: precioMaximo }; 
      }
      const result = await this.productosModel
      .find()
      .lean<Producto[]>()
      .skip(offset)
      .limit(limit)
      .exec()

      const ids = result.map(r => r._id.toString())

      return {
        data: result,
        ids
      }
    }
    const result = await this.productosModel
    .find()
    .exec()
    const ids = result.map(r => r._id.toString())
    return {
      data: result,
      ids
    }
  }

  async findOne(id: string) {
    const product = await this.productosModel.findById(id,).exec();
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${id} no se encuentra`,
      );
    }
    return product;
  }

  async create(payload: CreateProductoDTO) {

    const newProduct = new this.productosModel(payload);
    // if (payload.fabricanteId) {
    //   const fabricante = await this.fabricantesService.findOne(
    //     payload.fabricanteId,
    //   );
    //   if (!fabricante) {
    //     throw new Error(
    //       `Fabricante con id ${payload.fabricanteId} no encontrado`,
    //     );
    //   }
    //   newProduct.fabricante = fabricante;
    // }
    // if (payload.categoriasIds) {
    //   const categorias = await this.categoriasRepository.findByIds(
    //     payload.categoriasIds,
    //   );
    //   console.log('estas son las categorias a guardar',categorias)
    //   if (categorias.length !== payload.categoriasIds.length) {
    //     throw new Error(
    //       `Hay un error con alguno de los ids ${payload.categoriasIds}. Verifique`,
    //     );
    //   }
    //   newProduct.categorias = categorias;
    // }
    return await newProduct.save();
  }

  async update(id: string, payload: UpdateProductoDTO) {
    // Separar los IDs de fabricante y categorías del resto del payload
    // const { fabricanteId, categoriasIds, ...updateData } = payload;
  
    // Buscar el producto
    const product = await this.productosModel
    .findByIdAndUpdate(id, { $set: payload }, { new: true })
    .exec()
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no se encuentra`);
    } 
  
    // Validar y asignar el fabricante si fabricanteId está en el payload
    // if (fabricanteId) {
    //   const fabricante = await this.fabricantesService.findOne(fabricanteId);
    //   if (!fabricante) {
    //     throw new Error(`Fabricante con id ${fabricanteId} no encontrado`);
    //   }
    //   product.fabricante = fabricante;
    // }
  
    // // Validar y asignar categorías si categoriasIds está en el payload
    // if (categoriasIds && categoriasIds.length > 0) {
    //   const categorias = await this.categoriasRepository.findByIds(categoriasIds);
    //   if (categorias.length !== categoriasIds.length) {
    //     throw new Error(`Hay un error con alguno de los ids ${categoriasIds}. Verifique`);
    //   }
    //   product.categorias = categorias;
    // }
  
    return await product.save();
  }

  async remove(id: string) {

    return {
      producto: await this.productosModel.findByIdAndDelete(id),
      message: `El producto con el id ${id} ha sido eliminado de la base de datos` 
      }
    }

  // async addCategoryToProduct(produtoId: number, categoryId: number) {
  //   console.log(`Agregando categoría ${categoryId}`)
  //   const producto = await this.productosModel.findOne(produtoId, {
  //     relations: ['categorias'],
  //   })
  //   const categoria = await this.categoriasRepository.findOne(categoryId);
  //   if (!categoria) {
  //     throw new Error(`Categoría con id ${categoryId} no encontrada`);
  //   }
  //   producto.categorias.push(categoria);
  //   return this.productosModel.save(producto);
  // }

  // async removeProductFromCategory(produtoId: number, categoryId: number) {
  //   console.log(`Quitando categoría ${categoryId}`)
  //   const producto = await this.productosModel.findOne(produtoId, {
  //     relations: ['categorias'],
  //   })
  //   producto.categorias = producto.categorias.filter(
  //     (cat) => cat.id !== categoryId,
  //   );
  //   return this.productosModel.save(producto);
  // }
}
