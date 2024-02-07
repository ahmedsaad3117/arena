import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlaygroundAdminService } from '../providers/playground.admin.service';
import { CreatePlaygroundDto } from '../dto/create-playground.dto';
import { UpdatePlaygroundDto } from '../dto/update-playground.dto';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Controller('admin/playground')
export class PlaygroundAdminController {
  constructor(private readonly playgroundUserService: PlaygroundAdminService) {}

  @Post()
  create(@Body() createPlaygroundDto: CreatePlaygroundDto) {
    return this.playgroundUserService.create(createPlaygroundDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.playgroundUserService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playgroundUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaygroundDto: UpdatePlaygroundDto,
  ) {
    return this.playgroundUserService.update(+id, updatePlaygroundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playgroundUserService.remove(+id);
  }
}
