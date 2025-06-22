-- Adiciona a coluna Ativo à tabela Animais, se não existir
ALTER TABLE Animais ADD COLUMN Ativo BOOLEAN DEFAULT 1; 