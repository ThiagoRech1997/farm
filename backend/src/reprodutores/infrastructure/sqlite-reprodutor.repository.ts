import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { ReprodutorRepository } from '../domain/reprodutor.repository';
import { Reprodutor } from '../domain/reprodutor.entity';

@Injectable()
export class SqliteReprodutorRepository implements ReprodutorRepository {
  constructor(private readonly db: Database) {}

  async create(dto: any): Promise<Reprodutor> {
    const { Nome, Matriz_ID, Data_Concepcao, Data_Nascimento, Ninhada_Descricao, Perdas } = dto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Reprodutores (Nome, Matriz_ID, Data_Concepcao, Data_Nascimento, Ninhada_Descricao, Perdas) VALUES (?, ?, ?, ?, ?, ?)',
        [Nome, Matriz_ID, Data_Concepcao, Data_Nascimento, Ninhada_Descricao, Perdas],
        function (err) {
          if (err) return reject(err);
          resolve(new Reprodutor(this.lastID, Nome, Matriz_ID, Data_Concepcao, Data_Nascimento, Ninhada_Descricao, Perdas));
        },
      );
    });
  }

  async findAll(): Promise<Reprodutor[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Reprodutores', (err, rows: any[]) => {
        if (err) return reject(err);
        const reprodutores = rows.map(row => new Reprodutor(row.ID, row.Nome, row.Matriz_ID, row.Data_Concepcao, row.Data_Nascimento, row.Ninhada_Descricao, row.Perdas));
        resolve(reprodutores);
      });
    });
  }

  async findOne(id: number): Promise<Reprodutor | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Reprodutores WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const reprodutor = new Reprodutor(row.ID, row.Nome, row.Matriz_ID, row.Data_Concepcao, row.Data_Nascimento, row.Ninhada_Descricao, row.Perdas);
        resolve(reprodutor);
      });
    });
  }

  async update(id: number, dto: any): Promise<Reprodutor> {
    const reprodutorExists = await this.findOne(id);
    if (!reprodutorExists) {
      throw new NotFoundException(`Reprodutor com ID ${id} não encontrado para atualização.`);
    }

    const fields = Object.keys(dto);
    if (fields.length === 0) {
      return reprodutorExists;
    }
    
    const values = Object.values(dto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Reprodutores SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedReprodutor = await this.findOne(id);
    if (!updatedReprodutor) {
      throw new NotFoundException(`Reprodutor com ID ${id} não encontrado após a atualização.`);
    }
    return updatedReprodutor;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Reprodutores WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 