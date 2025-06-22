import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { NinhadaRepository } from '../domain/ninhada.repository';
import { CreateNinhadaDto } from '../dto/create-ninhada.dto';
import { UpdateNinhadaDto } from '../dto/update-ninhada.dto';
import { Ninhada } from '../domain/ninhada.entity';

@Injectable()
export class SqliteNinhadaRepository implements NinhadaRepository {
  constructor(private readonly db: Database) {}

  async create(createNinhadaDto: CreateNinhadaDto): Promise<Ninhada> {
    const { Matriz_ID, Reprodutor_ID, Data_Concepcao, Data_Nascimento, Descricao, Perdas } = createNinhadaDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Ninhadas (Matriz_ID, Reprodutor_ID, Data_Concepcao, Data_Nascimento, Descricao, Perdas) VALUES (?, ?, ?, ?, ?, ?)',
        [Matriz_ID, Reprodutor_ID, Data_Concepcao, Data_Nascimento, Descricao, Perdas],
        function (err) {
          if (err) return reject(err);
          resolve(new Ninhada(this.lastID, Matriz_ID, Reprodutor_ID, Data_Concepcao, Data_Nascimento, Descricao, Perdas));
        },
      );
    });
  }

  async findAll(): Promise<Ninhada[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Ninhadas', (err, rows: any[]) => {
        if (err) return reject(err);
        const ninhadas = rows.map(row => new Ninhada(row.ID, row.Matriz_ID, row.Reprodutor_ID, row.Data_Concepcao, row.Data_Nascimento, row.Descricao, row.Perdas));
        resolve(ninhadas);
      });
    });
  }

  async findOne(id: number): Promise<Ninhada | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Ninhadas WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const ninhada = new Ninhada(row.ID, row.Matriz_ID, row.Reprodutor_ID, row.Data_Concepcao, row.Data_Nascimento, row.Descricao, row.Perdas);
        resolve(ninhada);
      });
    });
  }

  async update(id: number, updateNinhadaDto: UpdateNinhadaDto): Promise<Ninhada> {
    const ninhadaExists = await this.findOne(id);
    if (!ninhadaExists) {
      throw new NotFoundException(`Ninhada com ID ${id} não encontrada para atualização.`);
    }

    const fields = Object.keys(updateNinhadaDto);
    if (fields.length === 0) {
      return ninhadaExists;
    }
    
    const values = Object.values(updateNinhadaDto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Ninhadas SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedNinhada = await this.findOne(id);
    if (!updatedNinhada) {
      throw new NotFoundException(`Ninhada com ID ${id} não encontrada após a atualização.`);
    }
    return updatedNinhada;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Ninhadas WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 