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
    const { Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID } = createAnimaiDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Animais (Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID],
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
      this.db.all(`
        SELECT 
          a.*,
          e.Nome as Especie_Nome,
          e.Nome_Cientifico as Especie_Cientifico,
          r.Nome as Raca_Nome
        FROM Animais a
        LEFT JOIN Especies e ON a.Especie_ID = e.ID
        LEFT JOIN Racas r ON a.Raca_ID = r.ID
        ORDER BY a.Nome
      `, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get(`
        SELECT 
          a.*,
          e.Nome as Especie_Nome,
          e.Nome_Cientifico as Especie_Cientifico,
          e.Descricao as Especie_Descricao,
          r.Nome as Raca_Nome,
          r.Descricao as Raca_Descricao
        FROM Animais a
        LEFT JOIN Especies e ON a.Especie_ID = e.ID
        LEFT JOIN Racas r ON a.Raca_ID = r.ID
        WHERE a.ID = ?
      `, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateAnimaiDto: UpdateAnimaiDto) {
    const { Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID } = updateAnimaiDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE Animais SET Nome = ?, Cor = ?, Sexo = ?, Data_Nascimento = ?, Observacoes = ?, Especie_ID = ?, Raca_ID = ? WHERE ID = ?',
        [Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID, id],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id, ...updateAnimaiDto });
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
        resolve({ deletedRows: this.changes });
      });
    });
  }
}
