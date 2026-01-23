// src/common/decorators/ai-tool.decorator.ts
import { SetMetadata, CustomDecorator } from '@nestjs/common';

export interface AiToolOptions {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export const AI_TOOL_METADATA = 'AI_TOOL_METADATA';

// Mudança aqui: Usamos o tipo CustomDecorator do NestJS
export const AiTool = (options: AiToolOptions): CustomDecorator<string> => 
  SetMetadata(AI_TOOL_METADATA, options);