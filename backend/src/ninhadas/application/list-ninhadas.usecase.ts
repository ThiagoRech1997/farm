import { Inject, Injectable } from '@nestjs/common';
import { Ninhada } from '../domain/ninhada.entity';
import { NinhadaRepository } from '../domain/ninhada.repository';

@Injectable()
export class ListNinhadasUseCase {
  constructor(
    @Inject('NinhadaRepository')
    private readonly ninhadaRepository: NinhadaRepository,
  ) {}

  async execute(): Promise<Ninhada[]> {
    return this.ninhadaRepository.findAll();
  }
} 