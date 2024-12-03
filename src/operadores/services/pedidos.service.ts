import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido } from '../entities/pedido.entity';
import { Comprador } from '../entities/comprador.entity';
import {
  CreatePedidoDto,
  FilterPedidosDto,
  UpdatePedidoDto,
} from '../dtos/pedido.dto.';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name) private pedidosModel: Model<Pedido>,
    @InjectModel(Comprador.name) private compradorModel: Model<Comprador>,
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
  ) {}

  async findAll(params?) {
    if (params) {
      const { limit, offset } = params;
      const result = await this.pedidosModel
        .find()
        // .populate('comprador')
        // .populate({
        //   path: 'productos',
        //   model: 'Producto',
        // })
        .skip(offset)
        .limit(limit)
        .exec();
      const formated = result.map((r) => {
        const id = r._id.toString(); // Convertir ObjectId a string
        return { ...r, _id: id }; // Actualiza el formato de _id
      });
      return formated;
    }
    const result = await this.pedidosModel
      .find()
      // .populate('comprador')
      // .populate({
      //   path: 'productos',
      //   model: 'Producto',
      // })
      .exec();
    const formated = result.map((r) => {
      const id = r._id.toString(); // Convertir ObjectId a string
      return { ...r, _id: id }; // Actualiza el formato de _id
    });
    return formated;
  }

  async findOne(id: string) {
    const pedido = await this.pedidosModel.findById(id);
    if (!pedido) {
      throw new NotFoundException(`El pedido con el id ${id} no se encuentra`);
    }
    const idFormated = pedido._id.toString();
    const { _id, comprador, productos }: any = pedido;
    return {
      _id: idFormated,
      comprado: comprador.toString(),
      productos,
    };
  }

  async create(payload: CreatePedidoDto) {
    // Resolvemos todas las promesas para obtener los productos
    const productos = await Promise.all(
      payload.productos.map(async (p) => {
        const producto = await this.productoModel.findById(p);
        if (!producto) {
          throw new NotFoundException(
            `El producto con el id ${p} no se encuentra.`,
          );
        }
        return producto;
      }),
    );

    // Calculamos el total del pedido
    const total = productos.reduce((acc, product) => acc + product.precio, 0);

    // Validamos si existe el comprador
    if (payload.compradorId) {
      const costumer = await this.compradorModel.findById(payload.compradorId);
      if (!costumer) {
        console.log('entro al if');
        throw new NotFoundException(
          `El comprador con el id ${payload.compradorId} no se encuentra. Registre al comprador antes de procesar el pedido`,
        );
      } else {
        // Creamos el pedido con los datos proporcionados y el total calculado
        const pedido = new this.pedidosModel({
          comprador: costumer._id,
          productos: payload.productos,
          total,
        });
        // Guardamos el pedido en la base de datos
        const saved = await pedido.save();
        const { _id, comprador, ...rest }: any = saved
        const formatId = _id.toString()
        const formatComprador = comprador.toString()
        return {
          message: `Pedido se ha creado bajo el identificador ${saved.id}`,
          data: {_id: formatId, comprador: formatComprador, ...rest },
        };
      }
    }
  }

  // async update(id: number, payload: UpdatePedidoDto){K
  // const pedido = await this.pedidosModel.findOne(id);
  // if (payload.compradorId) {
  //   const comprador = await this.compradorRepository.findOne(payload.compradorId);
  //   if (!comprador) {
  //     throw new NotFoundException(`El comprador con el id ${payload.compradorId} no se encuentra`);
  //   }
  //   pedido.comprador = comprador;
  // }
  // return this.pedidosModel.save(pedido);
  // }
  async remove(id: string){
    return await this.pedidosModel.findByIdAndDelete(id)
  }
  async removeProducto(id: string, productId: string) {
    const pedido = await this.pedidosModel.findById(id);
  
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
  
    // Filtrar el producto que queremos eliminar
    pedido.productos = pedido.productos.filter(
      (prodId) => prodId.toString() !== productId,
    );
  
    // Guardar cambios
    await pedido.save();
  
    return {
      pedido,
      message: `Producto con el id ${productId} quitado del pedido ${id}`,
    };
  }

  async addProductos(id: string, productsIds: string[]) {
    const pedido = await this.pedidosModel.findById(id);
  
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
  
    // Verificamos y agregamos los productos
    for (const pId of productsIds) {
      const prod = await this.findOne(pId); // Asegúrate de que `findOne` funciona correctamente.
      pedido.productos.push(new Types.ObjectId(prod._id));
    }
  
    // Guardar cambios
    await pedido.save();
  
    return {
      pedido,
      message: `Productos agregados al pedido ${id}`,
    };
  }
}
