import { IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDetallePedidoDto {

  @ApiProperty({ description: 'Id del pedido del detalle del pedido', required: true })
  @IsPositive()
  @IsNotEmpty()
  readonly pedidoId: number;

  @ApiProperty({ description: 'Id del producto del detalle del pedido', required: true })
  @IsPositive()
  @IsNotEmpty()
  readonly productoId: number;

  @ApiProperty({ description: 'Cantidad de productos del detalle del pedido', required: true })
  @IsPositive()
  @IsNotEmpty()
  readonly cantidad: number;
}

export class UpdateDetallePedidoDto extends PartialType(
  CreateDetallePedidoDto,
) {}