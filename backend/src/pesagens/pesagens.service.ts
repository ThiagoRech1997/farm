import { Inject, Injectable } from '@nestjs/common';
import { CreatePesagemDto } from './dto/create-pesagem.dto';
import { UpdatePesagemDto } from './dto/update-pesagem.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class PesagensService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  create(createPesagemDto: CreatePesagemDto) {
    const { Animal_ID, Data_Pesagem, Peso } = createPesagemDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Pesagens (Animal_ID, Data_Pesagem, Peso) VALUES (?, ?, ?)',
        [Animal_ID, Data_Pesagem, Peso],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createPesagemDto });
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

  findAllWithAnimalNames() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          p.ID, 
          p.Animal_ID, 
          p.Data_Pesagem, 
          p.Peso, 
          a.Nome as Animal_Nome
        FROM Pesagens p
        LEFT JOIN Animais a ON p.Animal_ID = a.ID
        ORDER BY p.Data_Pesagem DESC
      `;
      this.db.all(sql, (err, rows) => {
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

  update(id: number, updatePesagemDto: UpdatePesagemDto) {
    const fields = Object.keys(updatePesagemDto);
    const values = Object.values(updatePesagemDto);

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
