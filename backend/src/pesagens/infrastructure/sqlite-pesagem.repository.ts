import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { PesagemRepository, PesagemComNomeAnimal } from '../domain/pesagem.repository';
import { Pesagem } from '../domain/pesagem.entity';

@Injectable()
export class SqlitePesagemRepository implements PesagemRepository {
  constructor(private readonly db: Database) {}

  async create(dto: any): Promise<Pesagem> {
    const { Animal_ID, Data_Pesagem, Peso } = dto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Pesagens (Animal_ID, Data_Pesagem, Peso) VALUES (?, ?, ?)',
        [Animal_ID, Data_Pesagem, Peso],
        function (err) {
          if (err) return reject(err);
          resolve(new Pesagem(this.lastID, Animal_ID, Data_Pesagem, Peso));
        },
      );
    });
  }

  async findAll(): Promise<Pesagem[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Pesagens', (err, rows: any[]) => {
        if (err) return reject(err);
        const pesagens = rows.map(row => new Pesagem(row.ID, row.Animal_ID, row.Data_Pesagem, row.Peso));
        resolve(pesagens);
      });
    });
  }
  
  async findAllWithAnimalNames(): Promise<PesagemComNomeAnimal[]> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT p.ID, p.Animal_ID, p.Data_Pesagem, p.Peso, a.Nome as Animal_Nome
        FROM Pesagens p
        LEFT JOIN Animais a ON p.Animal_ID = a.ID
        ORDER BY p.Data_Pesagem DESC
      `;
      this.db.all(sql, (err, rows: any[]) => {
        if (err) return reject(err);
        const pesagens = rows.map(row => ({
            id: row.ID,
            animalId: row.Animal_ID,
            dataPesagem: row.Data_Pesagem,
            peso: row.Peso,
            animalNome: row.Animal_Nome,
        }));
        resolve(pesagens);
      });
    });
  }

  async findOne(id: number): Promise<Pesagem | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Pesagens WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new Pesagem(row.ID, row.Animal_ID, row.Data_Pesagem, row.Peso));
      });
    });
  }

  async update(id: number, dto: any): Promise<Pesagem> {
    const pesagemExists = await this.findOne(id);
    if (!pesagemExists) {
      throw new NotFoundException(`Pesagem com ID ${id} não encontrada para atualização.`);
    }

    const fields = Object.keys(dto);
    if (fields.length === 0) return pesagemExists;
    
    const values = Object.values(dto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Pesagens SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedPesagem = await this.findOne(id);
    if (!updatedPesagem) {
      throw new NotFoundException(`Pesagem com ID ${id} não encontrada após a atualização.`);
    }
    return updatedPesagem;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Pesagens WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 