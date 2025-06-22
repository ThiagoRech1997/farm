import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Vacina } from '../domain/vacina.entity';
import { VacinaRepository } from '../domain/vacina.repository';

@Injectable()
export class GetVacinaUseCase {
  constructor(
    @Inject('VacinaRepository')
    private readonly vacinaRepository: VacinaRepository,
  ) {}

  async execute(id: number): Promise<Vacina> {
    const vacina = await this.vacinaRepository.findOne(id);
    if (!vacina) {
      throw new NotFoundException(`Vacina com ID ${id} não encontrada.`);
    }
    return vacina;
  }
} 