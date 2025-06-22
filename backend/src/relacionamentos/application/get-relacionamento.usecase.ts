import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RelacionamentoRepository } from '../domain/relacionamento.repository';
import { Relacionamento } from '../domain/relacionamento.entity';

@Injectable()
export class GetRelacionamentoUseCase {
  constructor(
    @Inject('RelacionamentoRepository')
    private readonly relacionamentoRepository: RelacionamentoRepository,
  ) {}

  async execute(id: number): Promise<Relacionamento | null> {
    const relacionamento = await this.relacionamentoRepository.findById(id);
    if (!relacionamento) {
      throw new NotFoundException(`Relacionamento com ID ${id} não encontrado`);
    }
    return relacionamento;
  }
}