import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperProcessor } from './doc-scraper.processor';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';
import { PlaywrightCrawler } from 'crawlee';
import * as fs from 'fs';
import * as path from 'path';

import { ChatCompletionService } from '../llm/chat-completion/chat-completion.service';

// 1. Mock dependencies

// Mock dependencies
jest.mock('fs');
jest.mock('path');

// Mock utils for infinite scroll
const mockInfiniteScroll = jest.fn();
jest.mock('crawlee', () => ({
  PlaywrightCrawler: jest.fn(),
  utils: {
    playwright: {
      infiniteScroll: (...args) => mockInfiniteScroll(...args),
    },
  },
}));

describe('DocScraperProcessor', () => {
  let processor: DocScraperProcessor;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventEmitter: EventEmitter2;
  let chatCompletionService: ChatCompletionService;

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
    (fs.mkdirSync as jest.Mock).mockReturnValue(undefined);
    (fs.writeFileSync as jest.Mock).mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocScraperProcessor,
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
        {
          provide: ChatCompletionService,
          useValue: { 
            createChatCompletion: jest.fn().mockResolvedValue({
              choices: [{ message: { content: '{"mock": "data"}' } }] 
            }) 
          },
        },
      ],
    }).compile();

    processor = module.get<DocScraperProcessor>(DocScraperProcessor);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    chatCompletionService = module.get<ChatCompletionService>(ChatCompletionService);
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });

  describe('process', () => {
    it('should configure crawler correctly and verify file naming logic for documentation', async () => {
      const job = {
        id: 'job-1',
        data: { url: 'https://dart.dev/docs' }, // Default mode is DOCUMENTATION
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
      const mockLog = { warning: jest.fn(), info: jest.fn() };
      
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
      const mockLog = { warning: jest.fn(), info: jest.fn() };
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

  describe('processDynamic', () => {
    it('should use basic scrolling loop if regular implementation (legacy test Check)', async () => {
        // This test is preparing for the new implementation, but checking old behavior first or just structure
        // Since we are replacing the behavior, let's write the test for the NEW behavior we want.
    });

    it('should use infiniteScroll and extract data', async () => {
      const job = {
        id: 'job-dynamic-1',
        data: { 
          url: 'https://visaoimoveisindaiatuba.com.br/venda/residencial_comercial/indaiatuba/',
          mode: 'dynamic',
          scrollIterations: 5,
          targetSelector: '.card'
        },
      } as Job;

      await processor.process(job);

      expect(PlaywrightCrawler).toHaveBeenCalled();

      // Check handler
      const mockLog = { warning: jest.fn(), info: jest.fn(), error: jest.fn() };
      const mockPage = {
        $$eval: jest.fn().mockResolvedValue(['Item 1', 'Item 2']),
        // Mock evaluate to return null for the scrollable container check, forcing infiniteScroll fallback
        evaluate: jest.fn().mockImplementation((fn) => {
            if (typeof fn === 'function') {
                // Return null to simulate "no specific container found", triggering infiniteScroll path
                return null;
            }
            return null;
        }),
        waitForTimeout: jest.fn(),
      };

      if (!capturedRequestHandler) {
        throw new Error('requestHandler was not captured');
      }

      await capturedRequestHandler({
        page: mockPage,
        log: mockLog,
      });

      // Verify infiniteScroll was called fallback
      expect(mockInfiniteScroll).toHaveBeenCalledWith(mockPage, expect.objectContaining({
          waitForSecs: 2,
          stopScrollCallback: expect.any(Function),
      }));

      // Verify extraction logic
      expect(mockPage.$$eval).toHaveBeenCalledWith('.card', expect.any(Function));
      
      // Verify file write
      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call => call[0].endsWith('.json'));
      expect(writeCall).toBeDefined();
      expect(JSON.parse(writeCall[1])).toEqual(['Item 1', 'Item 2']);
    });
  });
});