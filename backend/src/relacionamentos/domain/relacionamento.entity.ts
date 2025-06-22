export class Relacionamento {
  constructor(
    public readonly id: number,
    public readonly animalPaiId: number,
    public readonly animalMaeId: number,
    public readonly filhoteId: number,
    public readonly tipoRelacao: string,
  ) {}

  serialize() {
    return {
      id: this.id,
      animalPaiId: this.animalPaiId,
      animalMaeId: this.animalMaeId,
      filhoteId: this.filhoteId,
      tipoRelacao: this.tipoRelacao,
    };
  }
}