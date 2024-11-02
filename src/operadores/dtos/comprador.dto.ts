import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
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

  @ApiProperty({ description: 'id de un operador'})
  @IsNumber()
  readonly operadorId: number
}


export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre', 'apellido']),
) {}
