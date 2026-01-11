import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperService } from './doc-scraper.service';
import { getQueueToken } from '@nestjs/bullmq';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

// 1. Mock the entire fs module at the top level
jest.mock('fs');

describe('DocScraperService', () => {
  let service: DocScraperService;

  const mockQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    // Clear all mocks before each test to ensure a clean state
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocScraperService,
        {
          provide: getQueueToken('scrape-docs'),
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<DocScraperService>(DocScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('scrapeDocumentation', () => {
    it('should add a scraping job to the queue', async () => {
      const url = 'https://docs.frigate.video';

      const result = await service.scrapeDocumentation(url);

      expect(mockQueue.add).toHaveBeenCalledWith(
        'scrape',
        { url },
        expect.any(Object),
      );

      expect(result).toEqual({
        status: 'pending',
        message: 'Tarefa de scraping adicionada à fila.',
        url,
      });
    });
  });

  describe('mergeDocuments', () => {
    it('should throw NotFoundException if directory does not exist', async () => {
      // Configure the mock directly
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      await expect(service.mergeDocuments('unknown-domain.com')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return null if no markdown files are found', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      // Return files that are not .md
      (fs.readdirSync as jest.Mock).mockReturnValue(['image.png']);

      const result = await service.mergeDocuments('empty-domain.com');

      expect(result).toEqual({ path: null, totalFiles: 0 });
    });

    it('should merge files successfully', async () => {
      const domain = 'docs.frigate.video';
      const mockFiles = ['intro.md', 'setup.md'];

      // 1. Mock File System Checks
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles);
      (fs.readFileSync as jest.Mock).mockReturnValue('# Mock Content');

      // 2. Mock Write Stream
      const mockWrite = jest.fn();
      const mockEnd = jest.fn();
      // Emulate the 'on' method to trigger the finish callback immediately
      const mockOn = jest.fn((event, callback) => {
        if (event === 'finish') callback(); 
        return {}; 
      });

      (fs.createWriteStream as jest.Mock).mockReturnValue({
        write: mockWrite,
        end: mockEnd,
        on: mockOn,
      });

      const result = await service.mergeDocuments(domain);

      // 3. Assertions
      expect(fs.readdirSync).toHaveBeenCalled();
      expect(fs.createWriteStream).toHaveBeenCalledWith(
        expect.stringContaining('_FULL_DOCUMENTATION.md'),
      );
      // Expect 2 header writes + 2 files * (3 writes each: sep start, sep end, content)
      expect(mockWrite).toHaveBeenCalled();
      expect(result).toEqual({
        path: expect.stringContaining('_FULL_DOCUMENTATION.md'),
        totalFiles: 2,
      });
    });
  });
});