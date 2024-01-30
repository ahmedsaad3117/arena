import { SetMetadata } from '@nestjs/common';

export const requiredPermissionKey = 'required_permission';
export const CanDoThis = (permission) =>
  SetMetadata(requiredPermissionKey, permission);
