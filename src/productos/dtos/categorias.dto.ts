import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

}


export class UpdateCategoriaDTO extends PartialType(
  OmitType(CreateCategoriaDTO, ['nombre']),
) {}
