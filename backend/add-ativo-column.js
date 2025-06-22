const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../farm.db');
const db = new sqlite3.Database(dbPath);

console.log('Conectando ao banco:', dbPath);

db.serialize(() => {
  db.all("PRAGMA table_info(Animais);", (err, columns) => {
    if (err) {
      console.error('Erro ao consultar estrutura da tabela:', err.message);
      db.close();
      return;
    }
    const existeAtivo = columns.some(col => col.name.toLowerCase() === 'ativo');
    if (existeAtivo) {
      console.log('A coluna Ativo já existe na tabela Animais. Nada a fazer.');
      db.close();
      return;
    }
    db.run("ALTER TABLE Animais ADD COLUMN Ativo BOOLEAN DEFAULT 1;", (err2) => {
      if (err2) {
        console.error('Erro ao adicionar coluna Ativo:', err2.message);
      } else {
        console.log('Coluna Ativo adicionada com sucesso!');
      }
      db.close();
    });
  });
}); 