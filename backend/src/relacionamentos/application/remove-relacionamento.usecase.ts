import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RelacionamentoRepository } from '../domain/relacionamento.repository';

@Injectable()
export class RemoveRelacionamentoUseCase {
  constructor(
    @Inject('RelacionamentoRepository')
    private readonly relacionamentoRepository: RelacionamentoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const relacionamento = await this.relacionamentoRepository.findById(id);
    if (!relacionamento) {
      throw new NotFoundException(`Relacionamento com ID ${id} não encontrado`);
    }
    await this.relacionamentoRepository.remove(id);
  }
}