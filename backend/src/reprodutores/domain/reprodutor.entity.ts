export class Reprodutor {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly matrizId?: number,
    public readonly dataConcepcao?: string,
    public readonly dataNascimento?: string,
    public readonly ninhadaDescricao?: string,
    public readonly perdas?: string,
  ) {}
} 