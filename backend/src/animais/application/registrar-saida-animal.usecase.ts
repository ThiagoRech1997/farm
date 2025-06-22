import { AnimalRepository } from '../domain/animal.repository';

export class RegistrarSaidaAnimalUseCase {
  constructor(private readonly repo: AnimalRepository) {}

  async execute(dto: any) {
    // Chama o método do adapter para registrar saída e marcar como inativo
    if (typeof (this.repo as any).registrarSaidaAnimal === 'function') {
      return (this.repo as any).registrarSaidaAnimal(dto);
    }
    throw new Error('Método registrarSaidaAnimal não implementado no repositório');
  }
} 