import { Inject, Injectable } from '@nestjs/common';
import { RelacionamentoRepository } from '../domain/relacionamento.repository';
import { Relacionamento } from '../domain/relacionamento.entity';

@Injectable()
export class ListRelacionamentosUseCase {
  constructor(
    @Inject('RelacionamentoRepository')
    private readonly relacionamentoRepository: RelacionamentoRepository,
  ) {}

  async execute(): Promise<Relacionamento[]> {
    return this.relacionamentoRepository.findAll();
  }
}