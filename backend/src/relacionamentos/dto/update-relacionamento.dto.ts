import { PartialType } from '@nestjs/mapped-types';
import { CreateRelacionamentoDto } from './create-relacionamento.dto';

export class UpdateRelacionamentoDto extends PartialType(CreateRelacionamentoDto) {}
