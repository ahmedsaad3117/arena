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
import { DayOffService } from '../providers/day-off.service';
import { CreateDayOffDto } from '../dto/create-day-off.dto';
import { UpdateDayOffDto } from '../dto/update-day-off.dto';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Controller('day-off')
export class DayOffController {
  constructor(private readonly dayOffService: DayOffService) {}

  @Post()
  create(@Body() createDayOffDto: CreateDayOffDto) {
    return this.dayOffService.create(createDayOffDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.dayOffService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dayOffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDayOffDto: UpdateDayOffDto) {
    return this.dayOffService.update(+id, updateDayOffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dayOffService.remove(+id);
  }
}
