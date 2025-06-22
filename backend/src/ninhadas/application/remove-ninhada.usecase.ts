import { Inject, Injectable } from '@nestjs/common';
import { NinhadaRepository } from '../domain/ninhada.repository';

@Injectable()
export class RemoveNinhadaUseCase {
  constructor(
    @Inject('NinhadaRepository')
    private readonly ninhadaRepository: NinhadaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.ninhadaRepository.remove(id);
  }
} 