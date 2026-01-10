import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DocScraperService } from './doc-scraper.service';
import { ScrapeDocsDto } from './dto/scrape-docs.dto';
import { FlowAuthGuard } from '../common/guards/flow.guard';
import { Token } from '../common/decorators/token.decorator';

@Controller('doc-scraper')
@UseGuards(FlowAuthGuard)
export class DocScraperController {
  constructor(private readonly scraperService: DocScraperService) {}

  @Post('scrape')
  @UsePipes(new ValidationPipe())
  async scrapeDocs(@Body() dto: ScrapeDocsDto, @Token() token: string) {
    // O token não é usado na lógica do scraper, mas o Guard exige.
    // Futuramente você pode usar o token para limitar quota por usuário.
    return await this.scraperService.scrapeDocumentation(dto.url);
  }
}
