import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperService } from './doc-scraper.service';
import { getQueueToken } from '@nestjs/bullmq';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

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

    // Default mock implementation for fs.existsSync to handle constructor checks
    (fs.existsSync as jest.Mock).mockReturnValue(true);

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
    it('should add a scraping job to the queue if full docs do not exist', async () => {
      const url = 'https://docs.frigate.video';
      const domain = 'docs.frigate.video';

      // Mock existsSync: Directories exist, but specific full doc file does NOT exist
      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        if (filePath.endsWith(`${domain}.md`)) return false;
        return true;
      });

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

    it('should throw BadRequestException if full docs already exist', async () => {
      const url = 'https://docs.frigate.video';
      
      // Mock existsSync to return true for everything (implying file exists)
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      await expect(service.scrapeDocumentation(url)).rejects.toThrow(
        BadRequestException,
      );
      
      expect(mockQueue.add).not.toHaveBeenCalled();
    });
  });

  describe('mergeDocuments', () => {
    it('should throw NotFoundException if source directory does not exist', async () => {
      const domain = 'unknown-domain.com';
      
      // Mock existsSync: Return false specifically for the source directory check
      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        // We simulate that 'Full Docs' exists, but the domain folder 'unknown-domain.com' does NOT
        if (filePath.includes(domain) && !filePath.includes('Full Docs')) return false;
        return true;
      });

      await expect(service.mergeDocuments(domain)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should merge files successfully and delete source directory', async () => {
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
      
      // Verify correct output path (in Full Docs folder with correct name)
      // We expect the path to end with "Full Docs/docs.frigate.video.md"
      const expectedOutputPathSuffix = path.join('Full Docs', `${domain}.md`);
      expect(fs.createWriteStream).toHaveBeenCalledWith(
        expect.stringContaining(expectedOutputPathSuffix),
      );

      // Expect 2 header writes + 2 files * (3 writes each: sep start, sep end, content)
      expect(mockWrite).toHaveBeenCalled();
      
      // 4. Verify Cleanup: Ensure source directory was deleted
      // We verify it called rmSync with the domain folder (NOT the full docs folder)
      expect(fs.rmSync).toHaveBeenCalledWith(
          expect.not.stringContaining('Full Docs'), 
          { recursive: true, force: true }
      );

      expect(result).toEqual({
        path: expect.stringContaining(expectedOutputPathSuffix),
        totalFiles: 2,
      });
    });
  });
});