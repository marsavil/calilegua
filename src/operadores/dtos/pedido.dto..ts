import { IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreatePedidoDto {
  @ApiProperty({ description: "ID del comprador", required: true })
  @IsPositive()
  @IsNotEmpty()
  readonly compradorId: number;
}

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}

export class FilterPedidosDTO {
  @ApiProperty({description: 'Cantidad de pedidos por página'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Punto de inicio de la lista de pedidos a devolver'})
  @IsOptional()
  @Min(0)
  offset: number;
}
