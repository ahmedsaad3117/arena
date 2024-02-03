import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersBaseService } from "src/user/providers/users.base.service";
import { RolesService } from "src/roles/providers/roles.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserStatusEnum } from "src/_common/enums/user_status.enum";

//import { EmailService } from 'src/_common/services/email/email.service';
import { AppUserType } from "src/_common/enums/app_user_types.enum";
import { OtpTypesEnum } from "src/_common/enums/otp_types.enum";
import {
  createSuccessAutoTranslated,
  notFoundErrorAutoTranslatedString,
} from "src/_common/utils/successResponseMessage.util";
import { hashPasswordUtil } from "src/_common/utils/hash-passwrod.util";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import { translateThis } from "src/_common/utils/translate-this";
import { UserEntity } from "src/user/entities/users.entity";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly usersService: UsersBaseService //private readonly emailService: EmailService,
  ) {}

  async login(loginDto: LoginDto) {
    const { user: username, password } = loginDto;

    const user: UserEntity = await this.usersService.findOne(null, [
      {
        email: username,
      },
      {
        phone: username,
      },
    ]);
    if (!user)
      throw new UnauthorizedException({
        message: "Credentials is incorrect!",
      });
    const isPasswordCorrect = await user.isCorrectPassword(password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException({
        message: "Credentials is incorrect!",
      });
    if (user.status === UserStatusEnum.DEACTIVE)
      throw new UnauthorizedException({
        message: "Please activate/verify your account first.",
      });

    const token = await user.generateToken();
    const populatedUser = await this.usersService.findOnePopulated(user.id);
    const message = translateThis("auth.user_loggedin");
    return {
      message: message,
      data: {
        user: populatedUser.data,
      },
      meta: {
        token,
      },
    };
  }
}
