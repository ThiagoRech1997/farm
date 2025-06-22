import { PartialType } from '@nestjs/mapped-types';
import { CreateReprodutoreDto } from './create-reprodutore.dto';

export class UpdateReprodutoreDto extends PartialType(CreateReprodutoreDto) {}
