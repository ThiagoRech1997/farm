import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal.entity';

export class SqliteAnimalRepository implements AnimalRepository {
  // Recebe a instância do banco via construtor
  constructor(private readonly db: any) {}

  async findById(id: number): Promise<Animal | null> {
    // Exemplo de consulta, adaptar conforme seu acesso ao banco
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Animais WHERE ID = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new Animal(row.ID, row.Nome, row.Cor, row.Sexo, row.Data_Nascimento, row.Observacoes, row.Especie_ID, row.Raca_ID, row.Ativo));
      });
    });
  }

  async findAll(): Promise<Animal[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Animais WHERE Ativo = 1', (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(row => new Animal(row.ID, row.Nome, row.Cor, row.Sexo, row.Data_Nascimento, row.Observacoes, row.Especie_ID, row.Raca_ID, row.Ativo)));
      });
    });
  }

  async save(animal: Animal): Promise<Animal> {
    // Exemplo simplificado
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO Animais (Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID, Ativo) VALUES (?, ?, ?, ?, ?, ?, ?, 1)');
      stmt.run([animal.nome, animal.cor, animal.sexo, animal.dataNascimento, animal.observacoes, animal.especieId, animal.racaId], function (err) {
        if (err) return reject(err);
        resolve(new Animal(this.lastID, animal.nome, animal.cor, animal.sexo, animal.dataNascimento, animal.observacoes, animal.especieId, animal.racaId, true));
      });
    });
  }

  async update(animal: Animal): Promise<Animal> {
    // Exemplo simplificado
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('UPDATE Animais SET Nome=?, Cor=?, Sexo=?, Data_Nascimento=?, Observacoes=?, Especie_ID=?, Raca_ID=?, Ativo=? WHERE ID=?');
      stmt.run([animal.nome, animal.cor, animal.sexo, animal.dataNascimento, animal.observacoes, animal.especieId, animal.racaId, animal.ativo ? 1 : 0, animal.id], function (err) {
        if (err) return reject(err);
        resolve(animal);
      });
    });
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE Animais SET Ativo = 0 WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 