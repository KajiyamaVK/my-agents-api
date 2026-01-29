import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export enum ScrapeMode {
  DOCUMENTATION = 'documentation',
  DYNAMIC = 'dynamic',
}

export class ScrapeDocsDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsEnum(ScrapeMode)
  mode?: ScrapeMode = ScrapeMode.DOCUMENTATION;

  @IsOptional()
  @IsObject()
  schema?: Record<string, any>;

  @IsOptional()
  @IsString()
  targetSelector?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  scrollIterations?: number = 0;
}
