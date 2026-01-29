import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperController } from './doc-scraper.controller';
import { DocScraperService } from './doc-scraper.service';
import { ScrapeDocsDto, ScrapeMode } from './dto/scrape-docs.dto';
import { FlowAuthGuard } from '../common/guards/flow.guard';
import { ExecutionContext } from '@nestjs/common';

describe('DocScraperController', () => {
  let controller: DocScraperController;
  let service: DocScraperService;

  const mockService = {
    scrapeDocumentation: jest.fn(),
    scrapeDynamic: jest.fn(),
    mergeDocuments: jest.fn(),
  };

  const mockGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocScraperController],
      providers: [
        {
          provide: DocScraperService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(FlowAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<DocScraperController>(DocScraperController);
    service = module.get<DocScraperService>(DocScraperService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('scrapeDocs', () => {
    it('should call service.scrapeDocumentation with correct url', async () => {
      const dto: ScrapeDocsDto = { url: 'https://docs.example.com' };
      const token = 'test-token';
      
      const expectedResult = { status: 'pending', url: dto.url };
      mockService.scrapeDocumentation.mockResolvedValue(expectedResult);

      const result = await controller.scrapeDocs(dto, token);

      expect(service.scrapeDocumentation).toHaveBeenCalledWith(dto.url);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('scrapeDynamic', () => {
    it('should call service.scrapeDynamic with correct dto and token', async () => {
      const dto: ScrapeDocsDto = { 
        url: 'https://dynamic.example.com',
        mode: ScrapeMode.DYNAMIC
      };
      const token = 'test-token';
      
      const expectedResult = { status: 'dynamic-scraping-started' };
      mockService.scrapeDynamic.mockResolvedValue(expectedResult);

      const result = await controller.scrapeDynamic(dto, token);

      expect(service.scrapeDynamic).toHaveBeenCalledWith(
        expect.objectContaining({
          url: dto.url,
          mode: 'dynamic'
        }), 
        token
      );
      expect(result).toEqual(expectedResult);
    });

    it('should default mode to dynamic if not provided', async () => {
      const dto: ScrapeDocsDto = { url: 'https://dynamic.example.com' };
      const token = 'test-token';

      await controller.scrapeDynamic(dto, token);

      expect(service.scrapeDynamic).toHaveBeenCalledWith(
        expect.objectContaining({mode: 'dynamic'}),
        token
      );
    });
  });

  describe('mergeDocs', () => {
    it('should call service.mergeDocuments with domain', async () => {
      const domain = 'docs.example.com';
      
      mockService.mergeDocuments.mockResolvedValue({ path: 'merged.md' });

      await controller.mergeDocs(domain);

      expect(service.mergeDocuments).toHaveBeenCalledWith(domain);
    });
  });
});
