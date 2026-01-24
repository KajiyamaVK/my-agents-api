// src/common/guards/flow.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class FlowAuthGuard implements CanActivate {
  private readonly logger = new Logger(FlowAuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Bearer token');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // BEST PRACTICE: Use .decode() instead of .verifyAsync()
      // This allows you to read user data (email, roles) without needing 
      // the provider's private key to verify the signature.
      const payload = this.jwtService.decode(token);
      
      if (!payload) {
        throw new Error('Token format is invalid and could not be decoded');
      }

      // Attach the decoded data to the request for your decorators and services
      request['user'] = payload;
      request['token'] = token;
      
      return true;
    } catch (error) {
      this.logger.error(`JWT Decoding Failed: ${error.message}`); 
      throw new UnauthorizedException('Invalid token');
    }
  }
}