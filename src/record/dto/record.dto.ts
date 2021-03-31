import { IsEmail, IsNotEmpty, Length, IsAlphanumeric } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AddRecordDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(10, 13)
  mobile: string;

  @IsNotEmpty()
  technologies: string;

  profile: string;
}

export class UpdateRecordDto extends PartialType(AddRecordDto) {}

export class FindOneParams {
  @IsAlphanumeric()
  id: string;
}
