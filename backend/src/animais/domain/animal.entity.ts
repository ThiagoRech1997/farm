export class Animal {
  constructor(
    public id: number,
    public nome: string,
    public cor: string,
    public sexo: string,
    public dataNascimento: string,
    public observacoes?: string,
    public especieId?: number,
    public racaId?: number,
    public ativo?: boolean
  ) {}
} 