import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCompradorDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @IsString()
  @IsNotEmpty()
  readonly telefono: string;
}


export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre']),
) {}
