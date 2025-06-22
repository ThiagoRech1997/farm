import { Inject, Injectable } from '@nestjs/common';
import { Raca } from '../domain/raca.entity';
import { RacaRepository } from '../domain/raca.repository';

@Injectable()
export class ListRacasUseCase {
  constructor(
    @Inject('RacaRepository')
    private readonly racaRepository: RacaRepository,
  ) {}

  async execute(): Promise<Raca[]> {
    return this.racaRepository.findAll();
  }
} 