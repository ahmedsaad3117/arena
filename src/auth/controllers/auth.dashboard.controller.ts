import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { AdminAuthService } from "../services/auth.admin.service";
import { LoginDto } from "../dto/login.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import { Public } from "src/_common/decorators/public.decorator";
import { UsersBaseService } from "src/user/providers/users.base.service";
import { UserDecorator } from "src/_common/decorators/getLoggedInUser.decorator";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("admin")
export class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private usersService: UsersBaseService
  ) {}

  @Post("login")
  @Public()
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("/who-am-i")
  whoAmI(@UserDecorator("id") id) {
    return this.usersService.findOnePopulated(+id);
  }
}
