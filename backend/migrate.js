const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o banco de dados
const dbPath = path.join(__dirname, '..', 'farm.db');

console.log('Conectando ao banco de dados:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados SQLite.');
});

// Função para executar queries
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        console.error('Erro na query:', err.message);
        reject(err);
      } else {
        console.log('Query executada com sucesso');
        resolve(this);
      }
    });
  });
}

// Função para executar queries de seleção
function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Erro na query:', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function migrate() {
  try {
    console.log('Iniciando migração...');

    // 1. Criar tabela de espécies
    console.log('1. Criando tabela Especies...');
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Especies (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Nome TEXT NOT NULL,
        Nome_Cientifico TEXT,
        Descricao TEXT,
        Tipo_Animal TEXT,
        Expectativa_Vida INTEGER,
        Peso_Adulto_Min DECIMAL(5,2),
        Peso_Adulto_Max DECIMAL(5,2)
      )
    `);

    // 2. Verificar se as colunas existem na tabela Animais
    console.log('2. Verificando estrutura da tabela Animais...');
    const tableInfo = await getQuery("PRAGMA table_info(Animais)");
    const columns = tableInfo.map(col => col.name);
    
    if (!columns.includes('Especie_ID')) {
      console.log('Adicionando coluna Especie_ID...');
      await runQuery('ALTER TABLE Animais ADD COLUMN Especie_ID INTEGER');
    }
    
    if (!columns.includes('Raca_ID')) {
      console.log('Adicionando coluna Raca_ID...');
      await runQuery('ALTER TABLE Animais ADD COLUMN Raca_ID INTEGER');
    }

    // 3. Inserir espécies
    console.log('3. Inserindo espécies...');
    const especies = [
      ['Bovino', 'Bos taurus', 'Gado bovino para produção de carne e leite', 'Gado', 20, 400.00, 1200.00],
      ['Ovino', 'Ovis aries', 'Ovelhas para produção de lã e carne', 'Ovelha', 12, 45.00, 100.00],
      ['Caprino', 'Capra hircus', 'Cabras para produção de leite e carne', 'Cabra', 15, 25.00, 80.00],
      ['Suíno', 'Sus scrofa domesticus', 'Porcos para produção de carne', 'Porco', 15, 100.00, 350.00],
      ['Equino', 'Equus caballus', 'Cavalos para trabalho e esporte', 'Cavalo', 25, 300.00, 1000.00],
      ['Asinino', 'Equus asinus', 'Burros e jumentos para trabalho', 'Burro', 30, 200.00, 400.00],
      ['Aves', 'Gallus gallus domesticus', 'Galinhas para produção de ovos e carne', 'Ave', 8, 1.50, 4.00],
      ['Peru', 'Meleagris gallopavo', 'Perus para produção de carne', 'Ave', 10, 8.00, 20.00],
      ['Pato', 'Anas platyrhynchos domesticus', 'Patos para produção de carne e ovos', 'Ave', 10, 2.00, 4.00],
      ['Coelho', 'Oryctolagus cuniculus', 'Coelhos para produção de carne e pele', 'Roedor', 8, 1.00, 6.00]
    ];

    for (const especie of especies) {
      await runQuery(`
        INSERT OR IGNORE INTO Especies (Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, especie);
    }

    // 4. Verificar se a tabela Racas existe
    console.log('4. Verificando tabela Racas...');
    const racasTable = await getQuery("SELECT name FROM sqlite_master WHERE type='table' AND name='Racas'");
    
    if (racasTable.length === 0) {
      console.log('Criando tabela Racas...');
      await runQuery(`
        CREATE TABLE Racas (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Nome TEXT NOT NULL,
          Descricao TEXT
        )
      `);
    }

    // 5. Inserir raças
    console.log('5. Inserindo raças...');
    const racas = [
      ['Nelore', 'Raça bovina zebuína, muito resistente ao calor e parasitas'],
      ['Gir', 'Raça bovina zebuína, excelente produtora de leite'],
      ['Holandês', 'Raça bovina taurina, alta produção de leite'],
      ['Angus', 'Raça bovina taurina, excelente qualidade de carne'],
      ['Dorper', 'Raça ovina, boa para produção de carne'],
      ['Saanen', 'Raça caprina, alta produção de leite'],
      ['Boer', 'Raça caprina, excelente para produção de carne'],
      ['Landrace', 'Raça suína, boa produtora de carne magra'],
      ['Mangalarga', 'Raça equina, muito versátil'],
      ['Leghorn', 'Raça avícola, excelente produtora de ovos']
    ];

    for (const raca of racas) {
      await runQuery(`
        INSERT OR IGNORE INTO Racas (Nome, Descricao) 
        VALUES (?, ?)
      `, raca);
    }

    // 6. Verificar resultados
    console.log('6. Verificando resultados...');
    const especiesCount = await getQuery('SELECT COUNT(*) as count FROM Especies');
    const racasCount = await getQuery('SELECT COUNT(*) as count FROM Racas');
    const animaisCount = await getQuery('SELECT COUNT(*) as count FROM Animais');

    console.log('✅ Migração concluída com sucesso!');
    console.log(`📊 Estatísticas:`);
    console.log(`   - Espécies: ${especiesCount[0].count}`);
    console.log(`   - Raças: ${racasCount[0].count}`);
    console.log(`   - Animais: ${animaisCount[0].count}`);

    // 7. Mostrar algumas espécies inseridas
    console.log('\n📋 Espécies inseridas:');
    const especiesInseridas = await getQuery('SELECT Nome, Nome_Cientifico FROM Especies LIMIT 5');
    especiesInseridas.forEach(esp => {
      console.log(`   - ${esp.Nome} (${esp.Nome_Cientifico})`);
    });

  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco:', err.message);
      } else {
        console.log('Banco de dados fechado.');
      }
    });
  }
}

migrate(); 