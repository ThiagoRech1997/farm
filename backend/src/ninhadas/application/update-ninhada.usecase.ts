import { Inject, Injectable } from '@nestjs/common';
import { UpdateNinhadaDto } from '../dto/update-ninhada.dto';
import { Ninhada } from '../domain/ninhada.entity';
import { NinhadaRepository } from '../domain/ninhada.repository';

@Injectable()
export class UpdateNinhadaUseCase {
  constructor(
    @Inject('NinhadaRepository')
    private readonly ninhadaRepository: NinhadaRepository,
  ) {}

  async execute(id: number, updateNinhadaDto: UpdateNinhadaDto): Promise<Ninhada> {
    return this.ninhadaRepository.update(id, updateNinhadaDto);
  }
} 