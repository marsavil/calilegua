import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateOperadorDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}


export class UpdateOperadorDTO extends PartialType(
  OmitType(CreateOperadorDTO, ['email']),
) {}
