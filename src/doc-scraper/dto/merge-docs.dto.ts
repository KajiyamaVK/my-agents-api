import { IsOptional, IsString } from 'class-validator';

export class MergeDocsDto {
  @IsString()
  @IsOptional() // Domain might be required, but checking generic validation
  domain: string;

  @IsString()
  @IsOptional()
  additionalPrompt?: string;
}
