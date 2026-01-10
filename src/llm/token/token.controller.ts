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
  async createToken() {
    return await this.tokenService.createToken();
  }
}
