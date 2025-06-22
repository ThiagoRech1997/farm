-- Script para configurar o banco de dados com espécies
-- Execute este script no SQLite para adicionar as novas funcionalidades

-- 1. Criar tabela de espécies
CREATE TABLE IF NOT EXISTS Especies (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Nome_Cientifico TEXT,
    Descricao TEXT,
    Tipo_Animal TEXT,
    Expectativa_Vida INTEGER,
    Peso_Adulto_Min DECIMAL(5,2),
    Peso_Adulto_Max DECIMAL(5,2)
);

-- 2. Adicionar colunas de espécie e raça na tabela Animais (se não existirem)
ALTER TABLE Animais ADD COLUMN Especie_ID INTEGER;
ALTER TABLE Animais ADD COLUMN Raca_ID INTEGER;

-- 3. Adicionar foreign keys (se não existirem)
-- Nota: SQLite não suporta ADD FOREIGN KEY, então as constraints devem ser definidas na criação da tabela

-- 4. Inserir espécies comuns em fazendas brasileiras
INSERT OR IGNORE INTO Especies (Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max) VALUES
('Bovino', 'Bos taurus', 'Gado bovino para produção de carne e leite', 'Gado', 20, 400.00, 1200.00),
('Ovino', 'Ovis aries', 'Ovelhas para produção de lã e carne', 'Ovelha', 12, 45.00, 100.00),
('Caprino', 'Capra hircus', 'Cabras para produção de leite e carne', 'Cabra', 15, 25.00, 80.00),
('Suíno', 'Sus scrofa domesticus', 'Porcos para produção de carne', 'Porco', 15, 100.00, 350.00),
('Equino', 'Equus caballus', 'Cavalos para trabalho e esporte', 'Cavalo', 25, 300.00, 1000.00),
('Asinino', 'Equus asinus', 'Burros e jumentos para trabalho', 'Burro', 30, 200.00, 400.00),
('Aves', 'Gallus gallus domesticus', 'Galinhas para produção de ovos e carne', 'Ave', 8, 1.50, 4.00),
('Peru', 'Meleagris gallopavo', 'Perus para produção de carne', 'Ave', 10, 8.00, 20.00),
('Pato', 'Anas platyrhynchos domesticus', 'Patos para produção de carne e ovos', 'Ave', 10, 2.00, 4.00),
('Coelho', 'Oryctolagus cuniculus', 'Coelhos para produção de carne e pele', 'Roedor', 8, 1.00, 6.00);

-- 5. Inserir algumas raças comuns (se a tabela Racas não existir)
CREATE TABLE IF NOT EXISTS Racas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Descricao TEXT
);

INSERT OR IGNORE INTO Racas (Nome, Descricao) VALUES
('Nelore', 'Raça bovina zebuína, muito resistente ao calor e parasitas'),
('Gir', 'Raça bovina zebuína, excelente produtora de leite'),
('Holandês', 'Raça bovina taurina, alta produção de leite'),
('Angus', 'Raça bovina taurina, excelente qualidade de carne'),
('Dorper', 'Raça ovina, boa para produção de carne'),
('Saanen', 'Raça caprina, alta produção de leite'),
('Boer', 'Raça caprina, excelente para produção de carne'),
('Landrace', 'Raça suína, boa produtora de carne magra'),
('Mangalarga', 'Raça equina, muito versátil'),
('Leghorn', 'Raça avícola, excelente produtora de ovos');

-- 6. Verificar se as tabelas foram criadas corretamente
SELECT 'Especies' as Tabela, COUNT(*) as Registros FROM Especies
UNION ALL
SELECT 'Racas' as Tabela, COUNT(*) as Registros FROM Racas
UNION ALL
SELECT 'Animais' as Tabela, COUNT(*) as Registros FROM Animais; 