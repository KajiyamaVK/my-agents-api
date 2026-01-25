import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperProcessor } from './doc-scraper.processor';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';
import { PlaywrightCrawler } from 'crawlee';
import * as fs from 'fs';
import * as path from 'path';

// 1. Mock dependencies
jest.mock('crawlee');
jest.mock('fs');
jest.mock('path');

describe('DocScraperProcessor', () => {
  let processor: DocScraperProcessor;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventEmitter: EventEmitter2;

  // Variable to capture the internal handler defined inside process()
  let capturedRequestHandler: any;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Mock PlaywrightCrawler to capture the requestHandler
    (PlaywrightCrawler as unknown as jest.Mock).mockImplementation((config) => {
      capturedRequestHandler = config.requestHandler;
      return {
        run: jest.fn().mockResolvedValue(undefined),
      };
    });

    // Mock path.join to behave predictably in tests
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));

    // Mock fs checks
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocScraperProcessor,
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    processor = module.get<DocScraperProcessor>(DocScraperProcessor);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });

  describe('process', () => {
    it('should configure crawler correctly and verify file naming logic', async () => {
      const job = {
        id: 'job-1',
        data: { url: 'https://dart.dev/docs' },
      } as Job;

      // 1. Execute process() to trigger Crawler setup
      await processor.process(job);

      // Assert Crawler was initialized
      expect(PlaywrightCrawler).toHaveBeenCalledWith(
        expect.objectContaining({
          maxConcurrency: 2,
          requestHandler: expect.any(Function),
        }),
      );

      // 2. Test the Internal Logic inside requestHandler
      // We simulate the context passed by Crawlee to the handler
      const mockEnqueueLinks = jest.fn();
      const mockLog = { warning: jest.fn() };
      
      // Mock Page behavior (successful scrape)
      const mockPage = {
        $: jest.fn().mockResolvedValue(true), // Content selector found
        waitForSelector: jest.fn().mockResolvedValue(true),
        $eval: jest.fn().mockResolvedValue('<h1>Mock Content</h1>'), // Returns HTML
      };

      // Scenario: We started at /docs, but crawler found a link to /language/keywords
      // This tests if the "origin" replacement logic works for sibling paths
      const mockRequest = {
        url: 'https://dart.dev/language/keywords',
      };

      // Manually invoke the captured handler
      if (!capturedRequestHandler) {
        throw new Error('requestHandler was not captured from PlaywrightCrawler mock');
      }

      await capturedRequestHandler({
        page: mockPage,
        request: mockRequest,
        log: mockLog,
        enqueueLinks: mockEnqueueLinks,
      });

      // 3. Verify Enqueue Strategy (Critical Fix Check)
      expect(mockEnqueueLinks).toHaveBeenCalledWith({
        strategy: 'same-domain',
      });

      // 4. Verify File Naming Logic
      // URL: https://dart.dev/language/keywords
      // Origin: https://dart.dev
      // Expected path logic: /language/keywords -> -language-keywords -> language-keywords.md
      
      // Note: we mocked path.join to just join with '/', so expected path is:
      // ./scraped_docs/dart.dev/language-keywords.md
      const expectedFileName = 'language-keywords.md';
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining(expectedFileName),
        expect.stringContaining('Source: https://dart.dev/language/keywords'),
      );
    });

    it('should handle index pages correctly', async () => {
      const job = {
        id: 'job-2',
        data: { url: 'https://dart.dev' },
      } as Job;

      await processor.process(job);

      const mockEnqueueLinks = jest.fn();
      const mockLog = { warning: jest.fn() };
      const mockPage = {
        $: jest.fn().mockResolvedValue(true),
        waitForSelector: jest.fn().mockResolvedValue(true),
        $eval: jest.fn().mockResolvedValue('<h1>Home</h1>'),
      };
      const mockRequest = {
        url: 'https://dart.dev', // Root URL
      };

      await capturedRequestHandler({
        page: mockPage,
        request: mockRequest,
        log: mockLog,
        enqueueLinks: mockEnqueueLinks,
      });

      // URL == Origin -> replaced to empty string -> fallback to 'index'
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('index.md'),
        expect.any(String),
      );
    });
  });
});