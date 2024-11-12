import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsArray,
} from 'class-validator';

export class CreateProductoDTO {
  @ApiProperty({description: 'Marca comercial del producto', required: true})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({description: 'Precio de venta del producto'})
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly precio: number;

  @ApiProperty({description: 'Descripción del producto', required: true})
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({description: 'Cantidad de unidades del producto disponible para la venta', required: true})
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({description: 'Origen del producto', required: true})
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({description: 'Imagen del producto', required: true})
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;

  @ApiProperty({description: 'ID del fabricante del producto', required: true})
  @IsNotEmpty()
  @IsPositive()
  readonly fabricanteId: number;

  @ApiProperty({description: 'Categorias del producto', required: true})
  @IsNotEmpty()
  @IsArray()
  readonly categoriasIds: number[];
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
