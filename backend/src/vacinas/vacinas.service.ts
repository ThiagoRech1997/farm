import { Inject, Injectable } from '@nestjs/common';
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { UpdateVacinaDto } from './dto/update-vacina.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class VacinasService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createVacinaDto: CreateVacinaDto) {
    const {
      Animal_ID,
      Nome_Vacina,
      Data_Aplicacao,
      Proxima_Aplicacao,
      Veterinario,
    } = createVacinaDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Vacinas (Animal_ID, Nome_Vacina, Data_Aplicacao, Proxima_Aplicacao, Veterinario) VALUES (?, ?, ?, ?, ?)',
        [
          Animal_ID,
          Nome_Vacina,
          Data_Aplicacao,
          Proxima_Aplicacao,
          Veterinario,
        ],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createVacinaDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Vacinas', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Vacinas WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateVacinaDto: UpdateVacinaDto) {
    const fields = Object.keys(updateVacinaDto);
    const values = Object.values(updateVacinaDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Vacinas SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Vacinas WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
