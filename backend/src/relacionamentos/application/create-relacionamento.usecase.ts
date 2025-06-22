import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRelacionamentoDto,
  RelacionamentoRepository,
} from '../domain/relacionamento.repository';
import { Relacionamento } from '../domain/relacionamento.entity';

@Injectable()
export class CreateRelacionamentoUseCase {
  constructor(
    @Inject('RelacionamentoRepository')
    private readonly relacionamentoRepository: RelacionamentoRepository,
  ) {}

  async execute(
    createRelacionamentoDto: CreateRelacionamentoDto,
  ): Promise<Relacionamento> {
    return this.relacionamentoRepository.create(createRelacionamentoDto);
  }
}