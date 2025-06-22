import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal.entity';

export class CreateAnimalUseCase {
  constructor(private readonly repo: AnimalRepository) {}

  async execute(data: any) {
    // lógica de negócio pode ser expandida
    const animal = new Animal(
      0,
      data.nome,
      data.cor,
      data.sexo,
      data.dataNascimento,
      data.observacoes,
      data.especieId,
      data.racaId,
      true
    );
    return this.repo.save(animal);
  }
} 