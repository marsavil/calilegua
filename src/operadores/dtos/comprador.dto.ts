import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCompradorDTO {
  @ApiProperty({description: 'Nombre de pila del comprador', required: true})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({description:'Apellido del comprador', required: true})
  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @ApiProperty({description:'Teléfono del comprador', required: true})
  @IsString()
  @IsNotEmpty()
  readonly telefono: string;
}


export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre', 'apellido']),
) {}

export class FilterCompradoresDTO {
  @ApiProperty({description: 'Cantidad de compradores por página'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Punto de inicio de la lista de compradores a devolver'})
  @IsOptional()
  @Min(0)
  offset: number;
}