import { Inject, Injectable } from '@nestjs/common';
import { ReprodutorRepository } from '../domain/reprodutor.repository';

@Injectable()
export class RemoveReprodutorUseCase {
  constructor(
    @Inject('ReprodutorRepository')
    private readonly reprodutorRepository: ReprodutorRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.reprodutorRepository.remove(id);
  }
} 