import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoSaudeDto } from './create-historico-saude.dto';

export class UpdateHistoricoSaudeDto extends PartialType(CreateHistoricoSaudeDto) {}
