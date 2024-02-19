import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from './image.dto';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  activities: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  omiyage: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  snsLinks: string[];

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  prefecture: string;
}
