import { Inject, Injectable } from '@nestjs/common';
import { HistoricoSaudeRepository } from '../domain/historico-saude.repository';

@Injectable()
export class RemoveHistoricoSaudeUseCase {
  constructor(
    @Inject('HistoricoSaudeRepository')
    private readonly historicoRepository: HistoricoSaudeRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.historicoRepository.remove(id);
  }
} 