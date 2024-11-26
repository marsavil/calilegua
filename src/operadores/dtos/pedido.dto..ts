import { IsArray, IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class CreatePedidoDto {
  @ApiProperty({ description: "ID del comprador", required: true })
  @IsNotEmpty()
  readonly compradorId: string;

  @ApiProperty({ description: "Productos del pedido", required: true })
  @IsArray()
  @IsNotEmpty()
  readonly productos: string[]
}

export class UpdatePedidoDto extends PartialType(OmitType(CreatePedidoDto, ['productos'])) {}

export class FilterPedidosDto {
  @ApiProperty({description: 'Cantidad de pedidos por página'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Punto de inicio de la lista de pedidos a devolver'})
  @IsOptional()
  @Min(0)
  offset: number;
}
export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
