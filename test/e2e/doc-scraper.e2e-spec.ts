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
      status: 'success',
      message: 'Mocked scrape',
      outputDirectory: 'mock/path',
      filesCount: 10,
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DocScraperService)
      .useValue(mockScrapeService)
      .overrideGuard(FlowAuthGuard) // Opcional: Bypass auth se quiser testar só a rota
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
        expect(res.body.status).toEqual('success');
        expect(mockScrapeService.scrapeDocumentation).toHaveBeenCalled();
      });
  });
});
