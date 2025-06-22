import { PartialType } from '@nestjs/mapped-types';
import { CreateNinhadaDto } from './create-ninhada.dto';

export class UpdateNinhadaDto extends PartialType(CreateNinhadaDto) {}
