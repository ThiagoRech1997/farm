import { Inject, Injectable } from '@nestjs/common';
import { CreatePesagenDto } from './dto/create-pesagen.dto';
import { UpdatePesagenDto } from './dto/update-pesagen.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class PesagensService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createPesagenDto: CreatePesagenDto) {
    const { Animal_ID, Data_Pesagem, Peso } = createPesagenDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Pesagens (Animal_ID, Data_Pesagem, Peso) VALUES (?, ?, ?)',
        [Animal_ID, Data_Pesagem, Peso],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createPesagenDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Pesagens', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Pesagens WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updatePesagenDto: UpdatePesagenDto) {
    const fields = Object.keys(updatePesagenDto);
    const values = Object.values(updatePesagenDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Pesagens SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Pesagens WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
