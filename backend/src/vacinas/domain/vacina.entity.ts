export class Vacina {
  constructor(
    public readonly id: number,
    public readonly animalId: number,
    public readonly nomeVacina: string,
    public readonly dataAplicacao?: string,
    public readonly proximaAplicacao?: string,
    public readonly veterinario?: string,
  ) {}
} 