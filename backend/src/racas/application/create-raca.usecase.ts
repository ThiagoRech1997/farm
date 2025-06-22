import { Inject, Injectable } from '@nestjs/common';
import { CreateRacaDto } from '../dto/create-raca.dto';
import { Raca } from '../domain/raca.entity';
import { RacaRepository } from '../domain/raca.repository';

@Injectable()
export class CreateRacaUseCase {
  constructor(
    @Inject('RacaRepository')
    private readonly racaRepository: RacaRepository,
  ) {}

  async execute(createRacaDto: CreateRacaDto): Promise<Raca> {
    return this.racaRepository.create(createRacaDto);
  }
} 