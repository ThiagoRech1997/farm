import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class AnimaisService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
  ) {}

  create(createAnimaiDto: CreateAnimaiDto) {
    const { Nome, Cor, Sexo, Data_Nascimento, Observacoes } = createAnimaiDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Animais (Nome, Cor, Sexo, Data_Nascimento, Observacoes) VALUES (?, ?, ?, ?, ?)',
        [Nome, Cor, Sexo, Data_Nascimento, Observacoes],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createAnimaiDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Animais', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Animais WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateAnimaiDto: UpdateAnimaiDto) {
    const fields = Object.keys(updateAnimaiDto);
    const values = Object.values(updateAnimaiDto);
    
    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Animais SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Animais WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
