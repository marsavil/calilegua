import { Injectable, NotFoundException } from '@nestjs/common';;
import { Pedido } from '../entities/pedido.entity';
import { Comprador } from '../entities/comprador.entity';
import { CreatePedidoDto, FilterPedidosDTO, UpdatePedidoDto } from '../dtos/pedido.dto.';

@Injectable()
export class PedidosService {
//   constructor(
//     @InjectRepository(Pedido) private pedidosRepository: Repository<Pedido>,
//     @InjectRepository(Comprador) private compradorRepository: Repository<Comprador>
//   ){}

//   findAll(params?: FilterPedidosDTO) {
//     if (params) {
//       const { limit, offset } = params;
//       return this.pedidosRepository.find({
//         take: limit,
//         skip: offset,
//         relations: ['detalles', 'detalles.producto']
//       });
//     }
//     return this.pedidosRepository.find()
//   }

//   async findOne(id: number){
//     const pedido = await this.pedidosRepository.findOne(id, { relations: ['detalles', 'detalles.producto'] });
//     if (!pedido) {
//       throw new NotFoundException(`El pedido con el id ${id} no se encuentra`);
//     }
//     return pedido;
//   }

//   async create(payload: CreatePedidoDto){
    // const pedido = new Pedido();
    // if (payload.compradorId){
    //   const comprador = await this.compradorRepository.findOne(payload.compradorId);
    //   if (!comprador) {
    //     throw new NotFoundException(`El comprador con el id ${payload.compradorId} no se encuentra`);
    //   }
    //   pedido.comprador = comprador;
    // }
    // const saved = await this.pedidosRepository.save(pedido);
    // return `Pedido creado bajo el identificador ${saved.id}`;
  //}

  // async update(id: number, payload: UpdatePedidoDto){K
    // const pedido = await this.pedidosRepository.findOne(id);
    // if (payload.compradorId) {
    //   const comprador = await this.compradorRepository.findOne(payload.compradorId);
    //   if (!comprador) {
    //     throw new NotFoundException(`El comprador con el id ${payload.compradorId} no se encuentra`);
    //   }
    //   pedido.comprador = comprador;
    // }
    // return this.pedidosRepository.save(pedido);
  // }
  // remove(id: number){
  //   return this.pedidosRepository.delete(id);
  // }
}
