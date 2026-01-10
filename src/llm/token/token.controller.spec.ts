import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

describe('TokenController', () => {
  let controller: TokenController;
  let tokenService: any;

  beforeEach(async () => {
    const mockTokenService = {
      createToken: jest.fn().mockResolvedValue({ token: 'mocked-token' }),
      checkHealth: jest.fn().mockResolvedValue({ status: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [{ provide: TokenService, useValue: mockTokenService }],
    }).compile();

    controller = module.get<TokenController>(TokenController);
    tokenService = module.get(TokenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('checkHealth should return service result', async () => {
    await expect(controller.checkHealth()).resolves.toEqual({ status: 'ok' });
    expect(tokenService.checkHealth).toHaveBeenCalled();
  });

  it('createToken should call tokenService.createToken without arguments', async () => {
    // - Updated to remove body args
    await expect(controller.createToken()).resolves.toEqual({
      token: 'mocked-token',
    });
    // Verify it was called with NO arguments
    expect(tokenService.createToken).toHaveBeenCalled();
  });
});
