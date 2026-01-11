import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DocScraperService } from '../../src/doc-scraper/doc-scraper.service';
import { FlowAuthGuard } from '../../src/common/guards/flow.guard';

describe('DocScraperController (e2e)', () => {
  let app: INestApplication;

  // Updated Mock to include mergeDocuments
  const mockScrapeService = {
    scrapeDocumentation: jest.fn().mockResolvedValue({
      status: 'pending',
      message: 'Tarefa de scraping adicionada à fila.',
      url: 'https://docs.frigate.video',
    }),
    mergeDocuments: jest.fn().mockResolvedValue({
      path: 'scraped_docs/docs.frigate.video/_FULL_DOCUMENTATION.md',
      totalFiles: 5,
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DocScraperService)
      .useValue(mockScrapeService)
      .overrideGuard(FlowAuthGuard)
      .useValue({ canActivate: () => true }) // Bypass Auth for testing
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
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

  // New Test Case
  it('/doc-scraper/merge (POST)', () => {
    return request(app.getHttpServer())
      .post('/doc-scraper/merge')
      .send({ domain: 'docs.frigate.video' })
      .expect(201)
      .expect((res) => {
        expect(res.body.totalFiles).toEqual(5);
        expect(res.body.path).toContain('_FULL_DOCUMENTATION.md');
        expect(mockScrapeService.mergeDocuments).toHaveBeenCalledWith('docs.frigate.video');
      });
  });
});