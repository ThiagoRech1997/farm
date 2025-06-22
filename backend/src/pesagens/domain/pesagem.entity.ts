export class Pesagem {
  constructor(
    public readonly id: number,
    public readonly animalId: number,
    public readonly dataPesagem: string,
    public readonly peso: number,
  ) {}
} 