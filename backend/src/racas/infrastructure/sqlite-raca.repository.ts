import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { RacaRepository } from '../domain/raca.repository';
import { Raca } from '../domain/raca.entity';
import { CreateRacaDto } from '../dto/create-raca.dto';
import { UpdateRacaDto } from '../dto/update-raca.dto';

@Injectable()
export class SqliteRacaRepository implements RacaRepository {
  constructor(private readonly db: Database) {}

  async create(dto: CreateRacaDto): Promise<Raca> {
    const { Nome, Descricao } = dto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Racas (Nome, Descricao) VALUES (?, ?)',
        [Nome, Descricao],
        function (err) {
          if (err) return reject(err);
          resolve(new Raca(this.lastID, Nome, Descricao));
        },
      );
    });
  }

  async findAll(): Promise<Raca[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Racas', (err, rows: any[]) => {
        if (err) return reject(err);
        const racas = rows.map(row => new Raca(row.ID, row.Nome, row.Descricao));
        resolve(racas);
      });
    });
  }

  async findOne(id: number): Promise<Raca | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Racas WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new Raca(row.ID, row.Nome, row.Descricao));
      });
    });
  }

  async update(id: number, dto: UpdateRacaDto): Promise<Raca> {
    const racaExists = await this.findOne(id);
    if (!racaExists) {
      throw new NotFoundException(`Raça com ID ${id} não encontrada para atualização.`);
    }

    const fields = Object.keys(dto);
    if (fields.length === 0) return racaExists;
    
    const values = Object.values(dto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Racas SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedRaca = await this.findOne(id);
    if (!updatedRaca) {
      throw new NotFoundException(`Raça com ID ${id} não encontrada após a atualização.`);
    }
    return updatedRaca;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Racas WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 