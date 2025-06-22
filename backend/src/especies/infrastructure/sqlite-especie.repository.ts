import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { EspecieRepository } from '../domain/especie.repository';
import { Especie } from '../domain/especie.entity';
import { CreateEspecieDto } from '../dto/create-especie.dto';
import { UpdateEspecieDto } from '../dto/update-especie.dto';

@Injectable()
export class SqliteEspecieRepository implements EspecieRepository {
  constructor(private readonly db: Database) {}

  async create(dto: CreateEspecieDto): Promise<Especie> {
    const { Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max } = dto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Especies (Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max],
        function (err) {
          if (err) return reject(err);
          resolve(new Especie(this.lastID, Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max));
        },
      );
    });
  }

  async findAll(): Promise<Especie[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Especies ORDER BY Nome', (err, rows: any[]) => {
        if (err) return reject(err);
        const especies = rows.map(row => new Especie(row.ID, row.Nome, row.Nome_Cientifico, row.Descricao, row.Tipo_Animal, row.Expectativa_Vida, row.Peso_Adulto_Min, row.Peso_Adulto_Max));
        resolve(especies);
      });
    });
  }

  async findOne(id: number): Promise<Especie | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Especies WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new Especie(row.ID, row.Nome, row.Nome_Cientifico, row.Descricao, row.Tipo_Animal, row.Expectativa_Vida, row.Peso_Adulto_Min, row.Peso_Adulto_Max));
      });
    });
  }

  async findByTipo(tipo: string): Promise<Especie[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Especies WHERE Tipo_Animal = ? ORDER BY Nome', [tipo], (err, rows: any[]) => {
        if (err) return reject(err);
        const especies = rows.map(row => new Especie(row.ID, row.Nome, row.Nome_Cientifico, row.Descricao, row.Tipo_Animal, row.Expectativa_Vida, row.Peso_Adulto_Min, row.Peso_Adulto_Max));
        resolve(especies);
      });
    });
  }

  async update(id: number, dto: UpdateEspecieDto): Promise<Especie> {
    const especieExists = await this.findOne(id);
    if (!especieExists) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada para atualização.`);
    }

    const fields = Object.keys(dto);
    if (fields.length === 0) return especieExists;
    
    const values = Object.values(dto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Especies SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedEspecie = await this.findOne(id);
    if (!updatedEspecie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada após a atualização.`);
    }
    return updatedEspecie;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Especies WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 