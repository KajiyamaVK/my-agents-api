import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DocScraperService } from '../../src/doc-scraper/doc-scraper.service';
import { FlowAuthGuard } from '../../src/common/guards/flow.guard';

describe('DocScraperController (e2e)', () => {
  let app: INestApplication;

  const mockScrapeService = {
    scrapeDocumentation: jest.fn().mockResolvedValue({
      status: 'pending',
      message: 'Tarefa de scraping adicionada à fila.',
      url: 'https://docs.frigate.video',
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DocScraperService)
      .useValue(mockScrapeService)
      .overrideGuard(FlowAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/doc-scraper/scrape (POST)', () => {
    return request(app.getHttpServer())
      .post('/doc-scraper/scrape')
      .send({ url: 'https://docs.frigate.video' })
      .expect(201)
      .expect((res) => {
        expect(res.body.status).toEqual('pending');
        expect(mockScrapeService.scrapeDocumentation).toHaveBeenCalled();
      });
  });
});
