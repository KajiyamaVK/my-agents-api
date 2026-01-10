import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger, // <--- Adicione o Logger
} from '@nestjs/common';
import { DocScraperService } from './doc-scraper.service';
import { ScrapeDocsDto } from './dto/scrape-docs.dto';
import { FlowAuthGuard } from '../common/guards/flow.guard';
import { Token } from '../common/decorators/token.decorator';

@Controller('doc-scraper')
@UseGuards(FlowAuthGuard)
export class DocScraperController {
  private readonly logger = new Logger(DocScraperController.name); // <--- Instância do Logger

  constructor(private readonly scraperService: DocScraperService) {}

  @Post('scrape')
  @UsePipes(new ValidationPipe())
  async scrapeDocs(@Body() dto: ScrapeDocsDto, @Token() token: string) {
    // PADRÃO FIRE-AND-FORGET
    // Chamamos o método SEM 'await'. O Node.js continua a execução imediatamente.
    this.scraperService
      .scrapeDocumentation(dto.url)
      .then((result) => {
        this.logger.log(`Scraping finalizado em background para: ${dto.url}`);
        // Aqui você poderia opcionalmente salvar o resultado no banco ou notificar via webhook
      })
      .catch((error) => {
        this.logger.error(
          `Erro no scraping em background para ${dto.url}`,
          error,
        );
      });

    // Retorna resposta imediata para o cliente (evitando timeout)
    return {
      status: 'pending',
      message:
        'O processo de scraping foi iniciado. Os arquivos estarão disponíveis em breve.',
      url: dto.url,
      timestamp: new Date().toISOString(),
    };
  }
}
