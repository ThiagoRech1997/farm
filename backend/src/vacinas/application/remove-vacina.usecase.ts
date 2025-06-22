import { Inject, Injectable } from '@nestjs/common';
import { VacinaRepository } from '../domain/vacina.repository';

@Injectable()
export class RemoveVacinaUseCase {
  constructor(
    @Inject('VacinaRepository')
    private readonly vacinaRepository: VacinaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.vacinaRepository.remove(id);
  }
} 