import { Inject, Injectable } from '@nestjs/common';
import { HistoricoSaude } from '../domain/historico-saude.entity';
import { HistoricoSaudeRepository } from '../domain/historico-saude.repository';

@Injectable()
export class ListHistoricoSaudeUseCase {
  constructor(
    @Inject('HistoricoSaudeRepository')
    private readonly historicoRepository: HistoricoSaudeRepository,
  ) {}

  async execute(): Promise<HistoricoSaude[]> {
    return this.historicoRepository.findAll();
  }
} 