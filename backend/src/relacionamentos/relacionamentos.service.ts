import { Inject, Injectable } from '@nestjs/common';
import { CreateRelacionamentoDto } from './dto/create-relacionamento.dto';
import { UpdateRelacionamentoDto } from './dto/update-relacionamento.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class RelacionamentosService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createRelacionamentoDto: CreateRelacionamentoDto) {
    const { Animal_Pai_ID, Animal_Mae_ID, Filhote_ID, Tipo_Relacao } =
      createRelacionamentoDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Relacionamentos (Animal_Pai_ID, Animal_Mae_ID, Filhote_ID, Tipo_Relacao) VALUES (?, ?, ?, ?)',
        [Animal_Pai_ID, Animal_Mae_ID, Filhote_ID, Tipo_Relacao],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createRelacionamentoDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Relacionamentos', (err, rows) => {
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
        'SELECT * FROM Relacionamentos WHERE ID = ?',
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

  update(id: number, updateRelacionamentoDto: UpdateRelacionamentoDto) {
    const fields = Object.keys(updateRelacionamentoDto);
    const values = Object.values(updateRelacionamentoDto);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Relacionamentos SET ${setClause} WHERE ID = ?`,
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
        'DELETE FROM Relacionamentos WHERE ID = ?',
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
