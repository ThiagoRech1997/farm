import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../domain/usuario.repository';
import { Usuario } from '../domain/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class SqliteUsuarioRepository implements UsuarioRepository {
  constructor(private readonly db: Database) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { Nome_Usuario, Email, Senha, Nivel_Acesso } = createUsuarioDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Senha, salt);

    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Usuarios (Nome_Usuario, Email, Senha, Nivel_Acesso) VALUES (?, ?, ?, ?)',
        [Nome_Usuario, Email, hashedPassword, Nivel_Acesso],
        function (err) {
          if (err) return reject(err);
          resolve(new Usuario(this.lastID, Nome_Usuario, Email, Nivel_Acesso));
        },
      );
    });
  }

  async findAll(): Promise<Usuario[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT ID, Nome_Usuario, Email, Nivel_Acesso FROM Usuarios', (err, rows: any[]) => {
        if (err) return reject(err);
        const usuarios = rows.map(row => new Usuario(row.ID, row.Nome_Usuario, row.Email, row.Nivel_Acesso));
        resolve(usuarios);
      });
    });
  }

  async findOne(id: number): Promise<Usuario | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT ID, Nome_Usuario, Email, Nivel_Acesso FROM Usuarios WHERE ID = ?', [id], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const usuario = new Usuario(row.ID, row.Nome_Usuario, row.Email, row.Nivel_Acesso);
        resolve(usuario);
      });
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT ID, Nome_Usuario, Email, Nivel_Acesso FROM Usuarios WHERE Email = ?', [email], (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const usuario = new Usuario(row.ID, row.Nome_Usuario, row.Email, row.Nivel_Acesso);
        resolve(usuario);
      });
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioExists = await this.findOne(id);
    if (!usuarioExists) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    const { Senha, ...otherFields } = updateUsuarioDto;
    const fieldsToUpdate: any = { ...otherFields };

    if (Senha) {
      const salt = await bcrypt.genSalt();
      fieldsToUpdate.Senha = await bcrypt.hash(Senha, salt);
    }
    
    const fields = Object.keys(fieldsToUpdate);
    if (fields.length === 0) {
      return usuarioExists;
    }
    
    const values = Object.values(fieldsToUpdate);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    await new Promise<void>((resolve, reject) => {
      this.db.run(`UPDATE Usuarios SET ${setClause} WHERE ID = ?`, [...values, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado após a atualização.`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Usuarios WHERE ID = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
} 