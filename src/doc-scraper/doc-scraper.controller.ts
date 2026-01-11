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
    return await this.scraperService.scrapeDocumentation(dto.url);
  }

  @Post('merge')
  async mergeDocs(@Body('domain') domain: string) {
    // Ex: { "domain": "docs.frigate.video" }
    return await this.scraperService.mergeDocuments(domain);
  }
}