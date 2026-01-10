import { IsNotEmpty, IsUrl } from 'class-validator';

export class ScrapeDocsDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
