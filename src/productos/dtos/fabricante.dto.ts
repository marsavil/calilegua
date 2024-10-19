import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
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
