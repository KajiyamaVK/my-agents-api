import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('llm/token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get('health')
  checkHealth() {
    return this.tokenService.checkHealth();
  }

  @Post()
  async createToken(
    @Body()
    body: {
      clientId?: string;
      clientSecret?: string;
      appToAccess?: string;
    },
  ) {
    return await this.tokenService.createToken(body);
  }
}
