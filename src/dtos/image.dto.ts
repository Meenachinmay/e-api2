import { IsUrl } from 'class-validator';

export class ImageDto {
  @IsUrl()
  url: string;
}
