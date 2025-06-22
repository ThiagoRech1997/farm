import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoricoSaudeDto } from '../dto/create-historico-saude.dto';
import { HistoricoSaude } from '../domain/historico-saude.entity';
import { HistoricoSaudeRepository } from '../domain/historico-saude.repository';

@Injectable()
export class CreateHistoricoSaudeUseCase {
  constructor(
    @Inject('HistoricoSaudeRepository')
    private readonly historicoRepository: HistoricoSaudeRepository,
  ) {}

  async execute(createHistoricoSaudeDto: CreateHistoricoSaudeDto): Promise<HistoricoSaude> {
    return this.historicoRepository.create(createHistoricoSaudeDto);
  }
} 