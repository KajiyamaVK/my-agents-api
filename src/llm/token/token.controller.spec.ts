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

  it('createToken should call tokenService.createToken with body', async () => {
    const body = { clientId: 'id', clientSecret: 'secret', appToAccess: 'app' };
    await expect(controller.createToken(body)).resolves.toEqual({
      token: 'mocked-token',
    });
    expect(tokenService.createToken).toHaveBeenCalledWith(body);
  });
});
