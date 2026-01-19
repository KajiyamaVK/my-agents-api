import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LocalNetworkGuard implements CanActivate {
  private readonly logger = new Logger(LocalNetworkGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Tenta pegar o IP real, considerando proxies ou conexão direta
    const clientIp = (request.headers['x-forwarded-for'] as string) || request.socket.remoteAddress || '';
    
    // Lista de prefixos/IPs permitidos (Localhost + Redes Privadas)
    // ::1 e 127.0.0.1 = Localhost
    // 192.168. = Rede doméstica comum
    // 10. = Rede interna (Docker muitas vezes usa essa faixa)
    // 172. = Faixa docker/interna
    const allowedPrefixes = ['::1', '127.0.0.1', 'localhost', '192.168.', '10.', '172.'];

    const isLocal = allowedPrefixes.some(prefix => clientIp.includes(prefix));

    if (!isLocal) {
      this.logger.warn(`Blocked external access attempt to local endpoint from IP: ${clientIp}`);
      return false;
    }

    return true;
  }
}