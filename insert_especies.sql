-- Inserindo espécies comuns em fazendas brasileiras
INSERT INTO Especies (Nome, Nome_Cientifico, Descricao, Tipo_Animal, Expectativa_Vida, Peso_Adulto_Min, Peso_Adulto_Max) VALUES
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

-- Inserindo algumas raças comuns
INSERT INTO Racas (Nome, Descricao) VALUES
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