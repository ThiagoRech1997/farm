import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Reprodutor } from '../domain/reprodutor.entity';
import { ReprodutorRepository } from '../domain/reprodutor.repository';

@Injectable()
export class GetReprodutorUseCase {
  constructor(
    @Inject('ReprodutorRepository')
    private readonly reprodutorRepository: ReprodutorRepository,
  ) {}

  async execute(id: number): Promise<Reprodutor> {
    const reprodutor = await this.reprodutorRepository.findOne(id);
    if (!reprodutor) {
      throw new NotFoundException(`Reprodutor com ID ${id} não encontrado.`);
    }
    return reprodutor;
  }
} 