export class Especie {
  constructor(
    public readonly ID: number,
    public readonly Nome: string,
    public readonly Nome_Cientifico?: string,
    public readonly Descricao?: string,
    public readonly Tipo_Animal?: string,
    public readonly Expectativa_Vida?: number,
    public readonly Peso_Adulto_Min?: number,
    public readonly Peso_Adulto_Max?: number,
  ) {}
} 