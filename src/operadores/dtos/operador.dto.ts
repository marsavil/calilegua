import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateOperadorDTO {
  @ApiProperty({description: 'Email del operador', required: true})
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({description: 'Contraseña de acceso a la cuenta', required: true})
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({description: 'Rol del operador', required: true})
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  // @IsOptional()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly comprador_id: number;
}


export class UpdateOperadorDTO extends PartialType(
  OmitType(CreateOperadorDTO, ['email']),
) {}

export class FilterOperadoresDTO {
  @ApiProperty({description: 'Cantidad de operadores por página'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Punto de inicio de la lista de operadores a devolver'})
  @IsOptional()
  @Min(0)
  offset: number;
}