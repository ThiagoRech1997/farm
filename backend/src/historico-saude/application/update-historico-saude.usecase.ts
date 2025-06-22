import { Inject, Injectable } from '@nestjs/common';
import { UpdateHistoricoSaudeDto } from '../dto/update-historico-saude.dto';
import { HistoricoSaude } from '../domain/historico-saude.entity';
import { HistoricoSaudeRepository } from '../domain/historico-saude.repository';

@Injectable()
export class UpdateHistoricoSaudeUseCase {
  constructor(
    @Inject('HistoricoSaudeRepository')
    private readonly historicoRepository: HistoricoSaudeRepository,
  ) {}

  async execute(id: number, updateHistoricoSaudeDto: UpdateHistoricoSaudeDto): Promise<HistoricoSaude> {
    return this.historicoRepository.update(id, updateHistoricoSaudeDto);
  }
} 