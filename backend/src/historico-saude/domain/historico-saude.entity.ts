export class HistoricoSaude {
  constructor(
    public readonly id: number,
    public readonly animalId: number,
    public readonly descricao: string,
    public readonly dataEvento?: string,
    public readonly tratamento?: string,
    public readonly veterinario?: string,
  ) {}
} 