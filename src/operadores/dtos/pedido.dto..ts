import { IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreatePedidoDto {
  @ApiProperty({ description: "ID del comprador", required: true })
  @IsPositive()
  @IsNotEmpty()
  readonly compradorId: number;
}

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}

