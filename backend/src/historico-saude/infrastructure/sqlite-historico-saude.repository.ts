import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { HistoricoSaudeRepository } from '../domain/historico-saude.repository';
import { CreateHistoricoSaudeDto } from '../dto/create-historico-saude.dto';
import { UpdateHistoricoSaudeDto } from '../dto/update-historico-saude.dto';
import { HistoricoSaude } from '../domain/historico-saude.entity';

@Injectable()
export class SqliteHistoricoSaudeRepository implements HistoricoSaudeRepository {
  constructor(private readonly db: Database) {}

  async create(createDto: CreateHistoricoSaudeDto): Promise<HistoricoSaude> {
    const { Animal_ID, Data_Evento, Descricao, Tratamento, Veterinario } = createDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Historico_Saude (Animal_ID, Data_Evento, Descricao, Tratamento, Veterinario) VALUES (?, ?, ?, ?, ?)',
        [Animal_ID, Data_Evento, Descricao, Tratamento, Veterinario],
        function (err) {
          if (err) return reject(err);
          resolve(new HistoricoSaude(this.lastID, Animal_ID, Descricao, Data_Evento, Tratamento, Veterinario));
        },
      );
    });
  }

  async findAll(): Promise<HistoricoSaude[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Historico_Saude', (err, rows: any[]) => {
        if (err) return reject(err);
        const historicos = rows.map(row => new HistoricoSaude(row.ID, row.Animal_ID, row.Descricao, row.Data_Evento, row.Tratamento, row.Veterinario));
        resolve(historicos);
      });
    });
  }

  async findOne(id: number): Promise<HistoricoSaude | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Historico_Saude WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const historico = new HistoricoSaude(row.ID, row.Animal_ID, row.Descricao, row.Data_Evento, row.Tratamento, row.Veterinario);
        resolve(historico);
      });
    });
  }

  async update(id: number, updateDto: UpdateHistoricoSaudeDto): Promise<HistoricoSaude> {
    const historicoExists = await this.findOne(id);
    if (!historicoExists) {
      throw new NotFoundException(`Registro de histórico com ID ${id} não encontrado para atualização.`);
    }

    const fields = Object.keys(updateDto);
    if (fields.length === 0) {
      return historicoExists;
    }
    
    const values = Object.values(updateDto);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    
    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Historico_Saude SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const updatedHistorico = await this.findOne(id);
    if (!updatedHistorico) {
      throw new NotFoundException(`Registro de histórico com ID ${id} não encontrado após a atualização.`);
    }
    return updatedHistorico;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Historico_Saude WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 