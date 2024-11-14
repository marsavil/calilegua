import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateFabricanteDTO {
  @ApiProperty({description: 'Nombre del fabricante', required: true})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({description: 'Domicilio legal del fabricante', required: true})
  @IsString()
  @IsNotEmpty()
  readonly direccion: string;

  @ApiProperty({description: 'Email de contacto del fabricante', required: true})
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({description: 'Logo identificador del fabricante', required: true})
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}


export class UpdatefabricanteDTO extends PartialType(
  OmitType(CreateFabricanteDTO, ['nombre']),
) {}

export class FilterFabricantesDTO {
  @ApiProperty({description: 'Cantidad de Fabricantes por página'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Punto de inicio de la lista de fabricantes a devolver'})
  @IsOptional()
  @Min(0)
  offset: number;
}