import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';

export class CreateProductoDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly precio: number;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

// export class UpdateProductoDTO {
//   readonly nombre?: string;
//   readonly precio?: number;
//   readonly descripcion?: string;
//   readonly stock?: number;
//   readonly origen?: string;
//   readonly imagen?: string;
// }

export class UpdateProductoDTO extends PartialType(
  OmitType(CreateProductoDTO, ['nombre']),
) {}
