import { Inject, Injectable } from '@nestjs/common';
import { CreateNinhadaDto } from '../dto/create-ninhada.dto';
import { Ninhada } from '../domain/ninhada.entity';
import { NinhadaRepository } from '../domain/ninhada.repository';

@Injectable()
export class CreateNinhadaUseCase {
  constructor(
    @Inject('NinhadaRepository')
    private readonly ninhadaRepository: NinhadaRepository,
  ) {}

  async execute(createNinhadaDto: CreateNinhadaDto): Promise<Ninhada> {
    return this.ninhadaRepository.create(createNinhadaDto);
  }
} 