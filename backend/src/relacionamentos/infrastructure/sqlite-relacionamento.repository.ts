import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { Relacionamento } from '../domain/relacionamento.entity';
import {
  CreateRelacionamentoDto,
  RelacionamentoRepository,
  UpdateRelacionamentoDto,
} from '../domain/relacionamento.repository';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class SqliteRelacionamentoRepository
  implements RelacionamentoRepository
{
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  private toEntity(row: any): Relacionamento {
    return new Relacionamento(
      row.ID,
      row.Animal_Pai_ID,
      row.Animal_Mae_ID,
      row.Filhote_ID,
      row.Tipo_Relacao,
    );
  }

  create(data: CreateRelacionamentoDto): Promise<Relacionamento> {
    const { animalPaiId, animalMaeId, filhoteId, tipoRelacao } = data;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Relacionamentos (Animal_Pai_ID, Animal_Mae_ID, Filhote_ID, Tipo_Relacao) VALUES (?, ?, ?, ?)',
        [animalPaiId, animalMaeId, filhoteId, tipoRelacao],
        (err) => {
          if (err) {
            return reject(err);
          }
          // Como o 'run' não retorna o objeto criado, buscamos pelo último ID inserido
          this.db.get(
            'SELECT * FROM Relacionamentos WHERE ID = last_insert_rowid()',
            (err, row) => {
              if (err) {
                return reject(err);
              }
              resolve(this.toEntity(row));
            },
          );
        },
      );
    });
  }

  findAll(): Promise<Relacionamento[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Relacionamentos', (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows.map(this.toEntity));
      });
    });
  }

  findById(id: number): Promise<Relacionamento | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM Relacionamentos WHERE ID = ?',
        [id],
        (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row ? this.toEntity(row) : null);
        },
      );
    });
  }

  async update(
    id: number,
    data: UpdateRelacionamentoDto,
  ): Promise<Relacionamento | null> {
    const fields = Object.entries(data)
      .filter(([, value]) => value !== undefined)
      .map(([key]) => {
        // Mapeia camelCase para as colunas do banco
        if (key === 'animalPaiId') return 'Animal_Pai_ID';
        if (key === 'animalMaeId') return 'Animal_Mae_ID';
        if (key === 'filhoteId') return 'Filhote_ID';
        if (key === 'tipoRelacao') return 'Tipo_Relacao';
        return key;
      });

    const values = Object.values(data).filter((value) => value !== undefined);

    if (fields.length === 0) {
      return this.findById(id);
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
          resolve(this.findById(id));
        },
      );
    });
  }

  remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Relacionamentos WHERE ID = ?', [id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
} 