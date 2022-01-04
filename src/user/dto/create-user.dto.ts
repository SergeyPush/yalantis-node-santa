import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'List of wishes must contain at least one wish' })
  @ArrayMaxSize(11, {
    message: 'Maximum size of wishes is 10',
  })
  listOfWishes: string[];
}
