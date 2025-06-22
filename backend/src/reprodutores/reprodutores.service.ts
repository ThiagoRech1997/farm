import { Inject, Injectable } from '@nestjs/common';
import { CreateReprodutoreDto } from './dto/create-reprodutore.dto';
import { UpdateReprodutoreDto } from './dto/update-reprodutore.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class ReprodutoresService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createReprodutoreDto: CreateReprodutoreDto) {
    const {
      Nome,
      Matriz_ID,
      Data_Concepcao,
      Data_Nascimento,
      Ninhada_Descricao,
      Perdas,
    } = createReprodutoreDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Reprodutores (Nome, Matriz_ID, Data_Concepcao, Data_Nascimento, Ninhada_Descricao, Perdas) VALUES (?, ?, ?, ?, ?, ?)',
        [
          Nome,
          Matriz_ID,
          Data_Concepcao,
          Data_Nascimento,
          Ninhada_Descricao,
          Perdas,
        ],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createReprodutoreDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Reprodutores', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Reprodutores WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateReprodutoreDto: UpdateReprodutoreDto) {
    const fields = Object.keys(updateReprodutoreDto);
    const values = Object.values(updateReprodutoreDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Reprodutores SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Reprodutores WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
