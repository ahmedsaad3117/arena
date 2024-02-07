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
import {} from '../providers/playground.admin.service';
import { CreatePlaygroundDto } from '../dto/create-playground.dto';
import { UpdatePlaygroundDto } from '../dto/update-playground.dto';
import { PlaygroundCustomerService } from '../providers/playground.customer.service';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Controller('customer/playground')
export class PlaygroundCustomerController {
  constructor(
    private readonly playgroundCustomerService: PlaygroundCustomerService,
  ) {}

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.playgroundCustomerService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playgroundCustomerService.findOne(+id);
  }
}
