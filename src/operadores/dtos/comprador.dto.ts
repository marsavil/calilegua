import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
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

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({each: true})
  @Type(()=> CreateDireccionesDTO)
  readonly direcciones?: CreateDireccionesDTO[]; //las direcciones pueden venir o no
}


export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre', 'apellido']),
) {}

export class FilterCompradoresDTO {
  @ApiProperty({description: 'Cantidad de compradores por página'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Punto de inicio de la lista de compradores a devolver'})
  @IsOptional()
  @Min(0)
  offset: number;
}

export class CreateDireccionesDTO{
  @IsString()
  @IsNotEmpty()
  readonly calle: string;

  @IsString()
  @IsNotEmpty()
  readonly numero: string;

  @IsString()
  @IsNotEmpty()
  readonly ciudad: string;
}

export class UpdateDirecciones extends
PartialType(CreateDireccionesDTO) {}