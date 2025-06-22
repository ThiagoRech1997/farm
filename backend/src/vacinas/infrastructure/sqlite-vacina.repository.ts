import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { VacinaRepository } from '../domain/vacina.repository';
import { CreateVacinaDto } from '../dto/create-vacina.dto';
import { UpdateVacinaDto } from '../dto/update-vacina.dto';
import { Vacina } from '../domain/vacina.entity';

@Injectable()
export class SqliteVacinaRepository implements VacinaRepository {
  constructor(private readonly db: Database) {}

  async create(createVacinaDto: CreateVacinaDto): Promise<Vacina> {
    const { Animal_ID, Nome_Vacina, Data_Aplicacao, Proxima_Aplicacao, Veterinario } = createVacinaDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Vacinas (Animal_ID, Nome_Vacina, Data_Aplicacao, Proxima_Aplicacao, Veterinario) VALUES (?, ?, ?, ?, ?)',
        [Animal_ID, Nome_Vacina, Data_Aplicacao, Proxima_Aplicacao, Veterinario],
        function (err) {
          if (err) return reject(err);
          resolve(new Vacina(this.lastID, Animal_ID, Nome_Vacina, Data_Aplicacao, Proxima_Aplicacao, Veterinario));
        },
      );
    });
  }

  async findAll(): Promise<Vacina[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Vacinas', (err, rows: any[]) => {
        if (err) return reject(err);
        const vacinas = rows.map(row => new Vacina(row.ID, row.Animal_ID, row.Nome_Vacina, row.Data_Aplicacao, row.Proxima_Aplicacao, row.Veterinario));
        resolve(vacinas);
      });
    });
  }

  async findOne(id: number): Promise<Vacina | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Vacinas WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const vacina = new Vacina(row.ID, row.Animal_ID, row.Nome_Vacina, row.Data_Aplicacao, row.Proxima_Aplicacao, row.Veterinario);
        resolve(vacina);
      });
    });
  }

  async update(id: number, updateVacinaDto: UpdateVacinaDto): Promise<Vacina> {
    const vacinaExists = await this.findOne(id);
    if (!vacinaExists) {
      throw new NotFoundException(`Vacina com ID ${id} não encontrada para atualização.`);
    }

    const fields = Object.keys(updateVacinaDto);
    if (fields.length === 0) {
      return vacinaExists;
    }
    
    const values = Object.values(updateVacinaDto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Vacinas SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedVacina = await this.findOne(id);
    if (!updatedVacina) {
      // This case should ideally not be reached if the DB is consistent
      throw new NotFoundException(`Vacina com ID ${id} não encontrada após a atualização.`);
    }
    return updatedVacina;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Vacinas WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 