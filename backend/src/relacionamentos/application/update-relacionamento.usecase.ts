import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  RelacionamentoRepository,
  UpdateRelacionamentoDto,
} from '../domain/relacionamento.repository';
import { Relacionamento } from '../domain/relacionamento.entity';

@Injectable()
export class UpdateRelacionamentoUseCase {
  constructor(
    @Inject('RelacionamentoRepository')
    private readonly relacionamentoRepository: RelacionamentoRepository,
  ) {}

  async execute(
    id: number,
    updateRelacionamentoDto: UpdateRelacionamentoDto,
  ): Promise<Relacionamento> {
    const relacionamento = await this.relacionamentoRepository.update(
      id,
      updateRelacionamentoDto,
    );
    if (!relacionamento) {
      throw new NotFoundException(`Relacionamento com ID ${id} não encontrado`);
    }
    return relacionamento;
  }
}