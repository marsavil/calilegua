import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
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

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Valida que cada elemento del array sea una cadena
  readonly productos?: string[]; // Define que esta propiedad es opcional
}


export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) {}
