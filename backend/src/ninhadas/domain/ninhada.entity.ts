export class Ninhada {
  constructor(
    public readonly id: number,
    public readonly matrizId?: number,
    public readonly reprodutorId?: number,
    public readonly dataConcepcao?: string,
    public readonly dataNascimento?: string,
    public readonly descricao?: string,
    public readonly perdas?: string,
  ) {}
} 