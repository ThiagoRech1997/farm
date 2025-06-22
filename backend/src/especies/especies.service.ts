import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Injectable()
export class EspeciesService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
  ) {}

  create(createEspecieDto: any) {
    const { Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max } = createEspecieDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Especies (Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...createEspecieDto });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Especies ORDER BY Nome', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Especies WHERE ID = ?', [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  update(id: number, updateEspecieDto: any) {
    const { Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max } = updateEspecieDto;
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE Especies SET Nome = ?, Nome_Cientifico = ?, Descricao = ?, Tipo_Animal = ?, Expectativa_Vida = ?, Peso_Adulto_Min = ?, Peso_Adulto_Max = ? WHERE ID = ?',
        [Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max, id],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id, ...updateEspecieDto });
        },
      );
    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Especies WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deletedRows: this.changes });
      });
    });
  }

  findByTipo(tipo: string) {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Especies WHERE Tipo_Animal = ? ORDER BY Nome', [tipo], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
} 