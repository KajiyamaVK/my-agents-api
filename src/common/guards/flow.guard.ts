// src/common/guards/flow.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger, // Add Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class FlowAuthGuard implements CanActivate {
  private readonly logger = new Logger(FlowAuthGuard.name); // Add Logger

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Bearer token');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Use ignoreNotBefore to prevent 401s caused by small clock differences
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
      request['token'] = token;
      return true;
    } catch (error) {
      // IMPORTANT: This will tell you EXACTLY why it failed in the logs
      this.logger.error(`JWT Verification Failed: ${error.message}`); 
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}