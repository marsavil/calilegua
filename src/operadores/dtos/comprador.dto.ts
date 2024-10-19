import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import {
  IsNotEmpty,
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
}


export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre']),
) {}
