import { Inject, Injectable } from '@nestjs/common';
import { Reprodutor } from '../domain/reprodutor.entity';
import { ReprodutorRepository } from '../domain/reprodutor.repository';

@Injectable()
export class UpdateReprodutorUseCase {
  constructor(
    @Inject('ReprodutorRepository')
    private readonly reprodutorRepository: ReprodutorRepository,
  ) {}

  async execute(id: number, updateReprodutorDto: any): Promise<Reprodutor> {
    return this.reprodutorRepository.update(id, updateReprodutorDto);
  }
} 