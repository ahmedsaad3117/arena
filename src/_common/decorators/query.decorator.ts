import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FilteredQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    // Remove any query parameters with falsy values
    Object.entries(query).forEach(([key, value]) => {
      if (!value) delete query[key];
    });
    return query;
  },
);
