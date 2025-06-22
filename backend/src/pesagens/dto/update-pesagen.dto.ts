import { PartialType } from '@nestjs/mapped-types';
import { CreatePesagenDto } from './create-pesagen.dto';

export class UpdatePesagenDto extends PartialType(CreatePesagenDto) {}
