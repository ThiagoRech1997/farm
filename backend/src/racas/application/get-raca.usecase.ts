import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Raca } from '../domain/raca.entity';
import { RacaRepository } from '../domain/raca.repository';

@Injectable()
export class GetRacaUseCase {
  constructor(
    @Inject('RacaRepository')
    private readonly racaRepository: RacaRepository,
  ) {}

  async execute(id: number): Promise<Raca> {
    const raca = await this.racaRepository.findOne(id);
    if (!raca) {
      throw new NotFoundException(`Raça com ID ${id} não encontrada.`);
    }
    return raca;
  }
} 