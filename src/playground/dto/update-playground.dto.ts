import { PartialType } from '@nestjs/swagger';
import { CreatePlaygroundDto } from './create-playground.dto';

export class UpdatePlaygroundDto extends PartialType(CreatePlaygroundDto) {}
