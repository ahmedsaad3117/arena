import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const UserDecorator = createParamDecorator(
  (attr: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;
    return attr ? request.user[attr] : request.user;
  },
);
