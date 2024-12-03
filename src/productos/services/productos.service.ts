import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './../entities/producto.entity';
import { FabricantesService } from './fabricantes.service';
import { CreateProductoDTO, FilterProductoDTO, UpdateProductoDTO } from './../dtos/productos.dto';
import { productos } from 'src/data/data';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CategoriasService } from './categorias.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productosModel: Model<Producto>,
    @Inject()
    private readonly fabricantesService: FabricantesService,
    @Inject() 
    private readonly categoriaService: CategoriasService
  ) {}
  
  async seedDB() {
    // Obtener todos los fabricantes de la base de datos
    const fabs = await this.fabricantesService.findAll();
    const cats = await this.categoriaService.findAll()
  
    if (fabs.length === 0) {
      throw new Error('No hay fabricantes en la base de datos. Por favor, crea fabricantes primero.');
    }
    if (cats.length === 0) {
      throw new Error('No hay categorias en la base de datos. Por favor, crea categorias primero.');
    }
  
    // Asignar un fabricante aleatorio a cada producto
    await Promise.all(
      productos.map(async (producto) => {
        // Seleccionar un fabricante aleatorio
        const randomFabricante = fabs[Math.floor(Math.random() * fabs.length)];
        const randomCategoria = cats[Math.floor(Math.random() * cats.length)]

        producto.fabricante = randomFabricante._id; // Asigna el ID del fabricante
        producto.categoria = randomCategoria; // Asigna la categoria
        await this.create(producto); // Crear el producto
      })
    );
  
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
      .find(filters)
      .populate('fabricante')
      .lean<Producto[]>()
      .skip(offset)
      .limit(limit)
      .exec()

      const formated = result.map((r) => {
        const id = r._id.toString(); // Convertir ObjectId a string
        return { ...r, _id: id }; // Actualiza el formato de _id
      });
      return formated
    }
    const result = await this.productosModel
    .find()
    .populate('fabricante')
    .exec()
    const formated = result.map((r) => {
      const id = r._id.toString(); // Convertir ObjectId a string
      return { ...r, _id: id }; // Actualiza el formato de _id
    });
    return formated
  }

  async findOne(id: string) {
    const product = await this.productosModel.findById(id,)
    .populate('fabricante')
    .lean<Producto>()
    .exec();
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${id} no se encuentra`,
      );
    }
    const { _id, ...rest }: any = product;
    const formatId = _id.toString()
    return {
      _id: formatId,
      ...rest
    }
  }

  async create(payload: CreateProductoDTO) {
    console.log('llego al servicio', payload)
    const newProduct = new this.productosModel(payload);
    
    return await newProduct.save();
  }

  async update(id: string, payload: UpdateProductoDTO) {

    // Buscar el producto
    const product = await this.productosModel
    .findByIdAndUpdate(id, { $set: payload }, { new: true })
    .exec()
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no se encuentra`);
    } 
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
