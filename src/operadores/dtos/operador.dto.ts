import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
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
}


export class UpdateOperadorDTO extends PartialType(
  OmitType(CreateOperadorDTO, ['email']),
) {}
