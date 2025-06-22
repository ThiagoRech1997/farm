import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal.entity';

export class UpdateAnimalUseCase {
  constructor(private readonly repo: AnimalRepository) {}

  async execute(id: number, data: any) {
    // Buscar animal existente
    const animal = await this.repo.findById(id);
    if (!animal) throw new Error('Animal não encontrado');
    // Atualizar campos
    animal.nome = data.nome ?? animal.nome;
    animal.cor = data.cor ?? animal.cor;
    animal.sexo = data.sexo ?? animal.sexo;
    animal.dataNascimento = data.dataNascimento ?? animal.dataNascimento;
    animal.observacoes = data.observacoes ?? animal.observacoes;
    animal.especieId = data.especieId ?? animal.especieId;
    animal.racaId = data.racaId ?? animal.racaId;
    animal.ativo = data.ativo ?? animal.ativo;
    return this.repo.update(animal);
  }
} 