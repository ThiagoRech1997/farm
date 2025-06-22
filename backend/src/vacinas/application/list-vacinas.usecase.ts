import { Inject, Injectable } from '@nestjs/common';
import { Vacina } from '../domain/vacina.entity';
import { VacinaRepository } from '../domain/vacina.repository';

@Injectable()
export class ListVacinasUseCase {
  constructor(
    @Inject('VacinaRepository')
    private readonly vacinaRepository: VacinaRepository,
  ) {}

  async execute(): Promise<Vacina[]> {
    return this.vacinaRepository.findAll();
  }
} 