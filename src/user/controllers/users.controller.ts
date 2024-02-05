import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PostTokenDto } from '../dto/post-token.dto';
import { UsersProfileService } from '../providers/users.profile.service';
import { UserDecorator } from 'src/_common/decorators/getLoggedInUser.decorator';

@Controller('admin/profile')
export class UserController {
  constructor(private readonly userService: UsersProfileService) {}

  @Get()
  findProfile(@UserDecorator('id') id: number) {
    return this.userService.findProfile(id);
  }

  @Patch()
  update(
    @UserDecorator('id') id: number,
    @Body() updateuserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateuserDto);
  }
  @Post('post-token')
  postToken(
    @UserDecorator('id') id: number,
    @Body() postTokenDto: PostTokenDto,
  ) {
    let updateuserDto = new UpdateUserDto();
    updateuserDto.fcm_token = postTokenDto.fcm_token;
    return this.userService.update(+id, updateuserDto);
  }
  // @Patch("change-password")
  // updatePassword(
  //   @UserDecorator("id") id: number,
  //   @Body() updatePasswordDto: UpdatePasswordDto
  // ) {
  //   return this.userService.updatePassword(+id, updatePasswordDto);
  // }
}
