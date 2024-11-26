import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCategoriaDTO {
  @ApiProperty({description: 'Denominación de la categoria', required: true})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({description: 'Imagen representativa de la categoria', required: true})
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string

}


export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) {}
