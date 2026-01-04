import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Return just the token string without "Bearer "
    return authHeader ? authHeader.split(' ')[1] : null;
  },
);
