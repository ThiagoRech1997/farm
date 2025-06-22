import { Inject, Injectable } from '@nestjs/common';
import { CreateRacaDto } from './dto/create-raca.dto';
import { UpdateRacaDto } from './dto/update-raca.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class RacasService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createRacaDto: CreateRacaDto) {
    const { Nome, Descricao } = createRacaDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Racas (Nome, Descricao) VALUES (?, ?)',
        [Nome, Descricao],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createRacaDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Racas', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Racas WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateRacaDto: UpdateRacaDto) {
    const fields = Object.keys(updateRacaDto);
    const values = Object.values(updateRacaDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Racas SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Racas WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
