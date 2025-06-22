import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { HistoricoSaude } from '../domain/historico-saude.entity';
import { HistoricoSaudeRepository } from '../domain/historico-saude.repository';

@Injectable()
export class GetHistoricoSaudeUseCase {
  constructor(
    @Inject('HistoricoSaudeRepository')
    private readonly historicoRepository: HistoricoSaudeRepository,
  ) {}

  async execute(id: number): Promise<HistoricoSaude> {
    const historico = await this.historicoRepository.findOne(id);
    if (!historico) {
      throw new NotFoundException(`Registro de histórico de saúde com ID ${id} não encontrado.`);
    }
    return historico;
  }
} 