import { AnimalUnificadoRepository } from '../domain/animal-unificado.repository';
import { CreateAnimalUnificadoDto } from '../dto/create-animal-unificado.dto';
import { BadRequestException } from '@nestjs/common';

export class SqliteAnimalUnificadoRepository implements AnimalUnificadoRepository {
  constructor(private readonly db: any) {}

  async createAnimalUnificado(dto: CreateAnimalUnificadoDto): Promise<any> {
    const {
      Nome,
      Cor,
      Sexo,
      Data_Nascimento,
      Observacoes,
      Especie_ID,
      Raca_ID,
      PesoInicial,
      DataPesagem,
      Animal_Pai_ID,
      Animal_Mae_ID
    } = dto;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');
        let animalId: number;
        const insertAnimal = this.db.prepare(
          'INSERT INTO Animais (Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        insertAnimal.run([Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID], (err) => {
          if (err) {
            this.db.run('ROLLBACK');
            return reject(new BadRequestException('Erro ao criar animal: ' + err.message));
          }
          animalId = (insertAnimal as any).lastID;
          const dataPesagem = DataPesagem || new Date().toISOString().split('T')[0];
          const insertPesagem = this.db.prepare(
            'INSERT INTO Pesagens (Animal_ID, Data_Pesagem, Peso) VALUES (?, ?, ?)'
          );
          insertPesagem.run([animalId, dataPesagem, PesoInicial], (err) => {
            if (err) {
              this.db.run('ROLLBACK');
              return reject(new BadRequestException('Erro ao registrar peso inicial: ' + err.message));
            }
            const relacionamentosPromises: Promise<any>[] = [];
            if (Animal_Pai_ID) {
              relacionamentosPromises.push(
                new Promise((resolveRel, rejectRel) => {
                  const insertRelPai = this.db.prepare(
                    'INSERT INTO Relacionamentos (Animal_Pai_ID, Animal_Mae_ID, Filhote_ID, Tipo_Relacao) VALUES (?, ?, ?, ?)'
                  );
                  insertRelPai.run([Animal_Pai_ID, Animal_Mae_ID || null, animalId, 'Pai-Filho'], (err) => {
                    if (err) {
                      rejectRel(err);
                    } else {
                      resolveRel(true);
                    }
                  });
                })
              );
            }
            if (Animal_Mae_ID) {
              relacionamentosPromises.push(
                new Promise((resolveRel, rejectRel) => {
                  const insertRelMae = this.db.prepare(
                    'INSERT INTO Relacionamentos (Animal_Pai_ID, Animal_Mae_ID, Filhote_ID, Tipo_Relacao) VALUES (?, ?, ?, ?)'
                  );
                  insertRelMae.run([Animal_Pai_ID || null, Animal_Mae_ID, animalId, 'Mãe-Filho'], (err) => {
                    if (err) {
                      rejectRel(err);
                    } else {
                      resolveRel(true);
                    }
                  });
                })
              );
            }
            Promise.all(relacionamentosPromises)
              .then(() => {
                this.db.run('COMMIT');
                resolve({
                  success: true,
                  animalId,
                  message: 'Animal cadastrado com sucesso com peso inicial e relacionamentos'
                });
              })
              .catch((error) => {
                this.db.run('ROLLBACK');
                reject(new BadRequestException('Erro ao criar relacionamentos: ' + error.message));
              });
          });
        });
        insertAnimal.finalize();
      });
    });
  }

  async findAnimaisParaPais(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          a.ID,
          a.Nome,
          a.Sexo,
          a.Data_Nascimento,
          e.Nome as Especie_Nome,
          r.Nome as Raca_Nome
        FROM Animais a
        LEFT JOIN Especies e ON a.Especie_ID = e.ID
        LEFT JOIN Racas r ON a.Raca_ID = r.ID
        WHERE a.Sexo IN ('M', 'F', 'Macho', 'Femea')
        ORDER BY a.Nome
      `, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async findAnimalCompleto(id: number): Promise<any> {
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
} 