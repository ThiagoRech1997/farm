import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoricoSaudeDto } from './dto/create-historico-saude.dto';
import { UpdateHistoricoSaudeDto } from './dto/update-historico-saude.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class HistoricoSaudeService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createHistoricoSaudeDto: CreateHistoricoSaudeDto) {
    const { Animal_ID, Data_Evento, Descricao, Tratamento, Veterinario } =
      createHistoricoSaudeDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Historico_Saude (Animal_ID, Data_Evento, Descricao, Tratamento, Veterinario) VALUES (?, ?, ?, ?, ?)',
        [Animal_ID, Data_Evento, Descricao, Tratamento, Veterinario],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createHistoricoSaudeDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Historico_Saude', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM Historico_Saude WHERE ID = ?',
        [id],
        (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row);
        },
      );
    });
  }

  update(id: number, updateHistoricoSaudeDto: UpdateHistoricoSaudeDto) {
    const fields = Object.keys(updateHistoricoSaudeDto);
    const values = Object.values(updateHistoricoSaudeDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Historico_Saude SET ${setClause} WHERE ID = ?`,
        [...values, id],
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve(this.findOne(id));
        },
      );
    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'DELETE FROM Historico_Saude WHERE ID = ?',
        [id],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ deleted: this.changes > 0, id });
        },
      );
    });
  }
}
