import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperService } from './doc-scraper.service';
import { getQueueToken } from '@nestjs/bullmq';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ChatCompletionService } from '../llm/chat-completion/chat-completion.service';
import { MergeDocsDto } from './dto/merge-docs.dto';

// 1. Mock the entire fs module at the top level
jest.mock('fs');

describe('DocScraperService', () => {
  let service: DocScraperService;
  let chatService: ChatCompletionService;

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
        {
          provide: ChatCompletionService,
          useValue: { createChatCompletion: jest.fn() },
        },
      ],
    }).compile();


    
    // Assign service to the variable declared in outer scope
    service = module.get<DocScraperService>(DocScraperService);
    // Assign chatService to the variable declared in outer scope
    chatService = module.get<ChatCompletionService>(ChatCompletionService);
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

      await expect(service.mergeDocuments({ domain })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should merge files successfully and delete source directory (legacy/no prompt)', async () => {
      const domain = 'docs.frigate.video';
      const mockFiles = ['intro.md', 'setup.json']; // Mixed types
      const dto = { domain };

      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles);
      (fs.readFileSync as jest.Mock).mockReturnValue('# Mock Content');
      (fs.lstatSync as jest.Mock).mockReturnValue({ isDirectory: () => false });

      // 2. Mock fs.writeFileSync
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      // @ts-ignore - Ignoring type error because we haven't updated service signature yet (TDD)
      const result = await service.mergeDocuments(dto);

      expect(fs.readdirSync).toHaveBeenCalled();
      
      const expectedOutputPathSuffix = path.join('Full Docs', `${domain}.md`);
      
      // Expect writeFileSync to be called with correct path and content containing merged data
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining(expectedOutputPathSuffix),
        expect.stringContaining('# Mock Content')
      );

      // expect(fs.rmSync).toHaveBeenCalled(); // This check was already there but we can keep/ensure it matches
      expect(fs.rmSync).toHaveBeenCalled();
      expect(result).toEqual({
        path: expect.stringContaining(expectedOutputPathSuffix),
        totalFiles: 2,
      });
    });

    it('should call LLM when additionalPrompt is provided', async () => {
      const domain = 'docs.frigate.video';
      const additionalPrompt = 'Make a table';
      const dto = { domain, additionalPrompt };
      const token = 'mock-token';

      // Mocks
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(['file1.md']);
      (fs.readFileSync as jest.Mock).mockReturnValue('Content');
      (fs.lstatSync as jest.Mock).mockReturnValue({ isDirectory: () => false });
      
      // Mock fs.writeFileSync
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      // Mock ChatCompletionService
      const mockChatCompletion = {
        choices: [{ message: { content: 'LLM Response Table' } }]
      };
      
      (chatService.createChatCompletion as jest.Mock).mockResolvedValue(mockChatCompletion);

      // @ts-ignore - Ignoring type error
      await service.mergeDocuments(dto, token);

      // Verify file reading (should read all files, including .md)
      expect(fs.readdirSync).toHaveBeenCalled();

      // Verify LLM call
      expect(chatService.createChatCompletion).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
                role: 'user',
                content: expect.stringContaining(additionalPrompt)
            })
        ]),
        token
      );
      
      // Verify Output Write (should write LLM response, not raw content)
      expect(fs.writeFileSync).toHaveBeenCalledWith(
          expect.stringContaining(`${domain}.md`),
          expect.stringContaining('LLM Response Table')
      );

      // Clean up
      expect(fs.rmSync).toHaveBeenCalled();
    });
  });
});