import { Inject, Injectable } from '@nestjs/common';
import { Reprodutor } from '../domain/reprodutor.entity';
import { ReprodutorRepository } from '../domain/reprodutor.repository';

@Injectable()
export class CreateReprodutorUseCase {
  constructor(
    @Inject('ReprodutorRepository')
    private readonly reprodutorRepository: ReprodutorRepository,
  ) {}

  async execute(createReprodutorDto: any): Promise<Reprodutor> {
    return this.reprodutorRepository.create(createReprodutorDto);
  }
} 