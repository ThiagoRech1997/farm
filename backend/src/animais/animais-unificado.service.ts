import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';
import { CreateAnimalUnificadoDto } from './dto/create-animal-unificado.dto';

@Injectable()
export class AnimaisUnificadoService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
  ) {}

  async createAnimalUnificado(createAnimalUnificadoDto: CreateAnimalUnificadoDto) {
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
    } = createAnimalUnificadoDto;

    return new Promise((resolve, reject) => {
      // Inicia uma transação
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');

        let animalId: number;

        // 1. Cria o registro na tabela Animais
        const insertAnimal = this.db.prepare(
          'INSERT INTO Animais (Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        
        insertAnimal.run([Nome, Cor, Sexo, Data_Nascimento, Observacoes, Especie_ID, Raca_ID], (err) => {
          if (err) {
            this.db.run('ROLLBACK');
            return reject(new BadRequestException('Erro ao criar animal: ' + err.message));
          }
          
          animalId = (insertAnimal as any).lastID;

          // 2. Cria o registro de peso inicial
          const dataPesagem = DataPesagem || new Date().toISOString().split('T')[0];
          const insertPesagem = this.db.prepare(
            'INSERT INTO Pesagens (Animal_ID, Data_Pesagem, Peso) VALUES (?, ?, ?)'
          );

          insertPesagem.run([animalId, dataPesagem, PesoInicial], (err) => {
            if (err) {
              this.db.run('ROLLBACK');
              return reject(new BadRequestException('Erro ao registrar peso inicial: ' + err.message));
            }

            // 3. Cria os relacionamentos se os pais foram especificados
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

            // Aguarda todos os relacionamentos serem criados
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

  // Método para buscar animais para seleção como pais
  async findAnimaisParaPais() {
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

  // Método para buscar um animal com todas as suas informações relacionadas
  async findAnimalCompleto(id: number) {
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