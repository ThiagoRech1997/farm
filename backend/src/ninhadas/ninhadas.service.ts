import { Inject, Injectable } from '@nestjs/common';
import { CreateNinhadaDto } from './dto/create-ninhada.dto';
import { UpdateNinhadaDto } from './dto/update-ninhada.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class NinhadasService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createNinhadaDto: CreateNinhadaDto) {
    const {
      Matriz_ID,
      Reprodutor_ID,
      Data_Concepcao,
      Data_Nascimento,
      Descricao,
      Perdas,
    } = createNinhadaDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Ninhadas (Matriz_ID, Reprodutor_ID, Data_Concepcao, Data_Nascimento, Descricao, Perdas) VALUES (?, ?, ?, ?, ?, ?)',
        [
          Matriz_ID,
          Reprodutor_ID,
          Data_Concepcao,
          Data_Nascimento,
          Descricao,
          Perdas,
        ],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createNinhadaDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Ninhadas', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Ninhadas WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateNinhadaDto: UpdateNinhadaDto) {
    const fields = Object.keys(updateNinhadaDto);
    const values = Object.values(updateNinhadaDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Ninhadas SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Ninhadas WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
