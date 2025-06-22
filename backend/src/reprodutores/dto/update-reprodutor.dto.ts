import { PartialType } from '@nestjs/mapped-types';
import { CreateReprodutorDto } from './create-reprodutor.dto';

export class UpdateReprodutorDto extends PartialType(CreateReprodutorDto) {}
