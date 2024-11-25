import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCategoriaDTO {
  @ApiProperty({description: 'Denominación de la categoria', required: true})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

}


export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) {}
