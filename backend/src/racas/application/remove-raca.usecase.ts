import { Inject, Injectable } from '@nestjs/common';
import { RacaRepository } from '../domain/raca.repository';

@Injectable()
export class RemoveRacaUseCase {
  constructor(
    @Inject('RacaRepository')
    private readonly racaRepository: RacaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.racaRepository.remove(id);
  }
} 