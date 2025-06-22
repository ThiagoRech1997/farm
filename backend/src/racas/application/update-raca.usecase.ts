import { Inject, Injectable } from '@nestjs/common';
import { UpdateRacaDto } from '../dto/update-raca.dto';
import { Raca } from '../domain/raca.entity';
import { RacaRepository } from '../domain/raca.repository';

@Injectable()
export class UpdateRacaUseCase {
  constructor(
    @Inject('RacaRepository')
    private readonly racaRepository: RacaRepository,
  ) {}

  async execute(id: number, updateRacaDto: UpdateRacaDto): Promise<Raca> {
    return this.racaRepository.update(id, updateRacaDto);
  }
} 