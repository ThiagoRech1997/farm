import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { Nome_Usuario, Email, Senha, Nivel_Acesso } = createUsuarioDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Senha, salt);

    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Usuarios (Nome_Usuario, Email, Senha, Nivel_Acesso) VALUES (?, ?, ?, ?)',
        [Nome_Usuario, Email, hashedPassword, Nivel_Acesso],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({
            id: this.lastID,
            Nome_Usuario,
            Email,
            Nivel_Acesso,
          });
        },
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT ID, Nome_Usuario, Email, Nivel_Acesso FROM Usuarios',
        (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        },
      );
    });
  }

  async findOne(id: number) {
    const user = await new Promise((resolve, reject) => {
      this.db.get(
        'SELECT ID, Nome_Usuario, Email, Nivel_Acesso FROM Usuarios WHERE ID = ?',
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        },
      );
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { Senha, ...otherFields } = updateUsuarioDto;
    
    if (Senha) {
      const salt = await bcrypt.genSalt();
      otherFields['Senha'] = await bcrypt.hash(Senha, salt);
    }

    const fields = Object.keys(otherFields);
    const values = Object.values(otherFields);

    if (fields.length === 0) {
      return this.findOne(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE Usuarios SET ${setClause} WHERE ID = ?`,
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
      this.db.run('DELETE FROM Usuarios WHERE ID = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ deleted: this.changes > 0, id });
      });
    });
  }
}
