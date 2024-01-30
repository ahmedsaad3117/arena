import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { isPublicKey } from "../decorators/public.decorator";
import { UserEntity } from "src/user/entities/users.entity";
import { translateThis } from "../utils/translate-this";
import { UserStatusEnum } from "../enums/user_status.enum";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(isPublicKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    let message = translateThis("auth.user_is_blocked");

    if (user && user.status == UserStatusEnum.DEACTIVE) {
      throw new UnauthorizedException({
        message,
      });
    }
    return user ? true : false;
  }
}
