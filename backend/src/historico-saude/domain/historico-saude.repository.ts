import { CreateHistoricoSaudeDto } from '../dto/create-historico-saude.dto';
import { UpdateHistoricoSaudeDto } from '../dto/update-historico-saude.dto';
import { HistoricoSaude } from './historico-saude.entity';

export interface HistoricoSaudeRepository {
  create(createHistoricoSaudeDto: CreateHistoricoSaudeDto): Promise<HistoricoSaude>;
  findAll(): Promise<HistoricoSaude[]>;
  findOne(id: number): Promise<HistoricoSaude | null>;
  update(id: number, updateHistoricoSaudeDto: UpdateHistoricoSaudeDto): Promise<HistoricoSaude>;
  remove(id: number): Promise<void>;
} 