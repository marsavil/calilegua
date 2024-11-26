import { Injectable, NotFoundException } from '@nestjs/common';;
import { Pedido } from '../entities/pedido.entity';
import { Comprador } from '../entities/comprador.entity';
import { CreatePedidoDto, FilterPedidosDto, UpdatePedidoDto } from '../dtos/pedido.dto.';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name) private pedidosModel: Model<Pedido>,
    @InjectModel(Comprador.name) private compradorModel: Model<Comprador>
  ){}

findAll(params?) {
  if (params) {
        const { limit, offset } = params;
        return this.pedidosModel
        .find()
        //.populate('comprador')
        // .populate({
        //   path: 'productos',
        //   model: 'Producto',
        // })
        .skip(offset)
        .limit(limit)
        .exec()
  }
  return this.pedidosModel
    .find()
    // .populate('comprador')
    // .populate({
    //   path: 'productos',
    //   model: 'Producto',
    // })
    .exec();
}
  // findAll(params?: FilterPedidosDTO) {
  //   if (params) {
  //     const { limit, offset } = params;
  //     return this.pedidosModel.find();
  //   }
  //   return this.pedidosModel.find()
  // }

  async findOne(id: string){
    const pedido = await this.pedidosModel.findById(id);
    if (!pedido) {
      throw new NotFoundException(`El pedido con el id ${id} no se encuentra`);
    }
    return pedido;
  }

  async create(payload: CreatePedidoDto){
    const pedido = new this.pedidosModel(payload)
    if (payload.compradorId){
      const comprador = await this.compradorModel.findById(payload.compradorId);
      if (!comprador) {
        throw new NotFoundException(`El comprador con el id ${payload.compradorId} no se encuentra`);
      } else {
        pedido.comprador = comprador.id;
      }
      
    }
    const saved = await pedido.save();
    return `Pedido se ha creado creado bajo el identificador ${saved.id}`;
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
    await this.pedidosModel.findByIdAndDelete(id)
    return `Pedido ${id} eliminado`;
  }
  async removeProducto ( id: string, productId: string){
    const pedido = await this.pedidosModel.findById(id);
    pedido.productos.pull(productId)
    pedido.save()
    return {
      pedido,
      message: `Producto con el id ${productId} quitado del pedido ${id}`
    };
  }

  async addProductos( id: string, productsIds: string[]){
    const pedido = await this.pedidosModel.findById(id);
    productsIds.forEach((pId) => pedido.productos.push(pId));
    pedido.save()
    return {
      pedido,
      message: `Productos con agregados al pedido ${id}`
    }
  }
}
