CREATE TABLE Animais (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Cor TEXT,
    Sexo TEXT,
    Data_Nascimento DATE,
    Observacoes TEXT
);

CREATE TABLE Reprodutores (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Matriz_ID INTEGER,
    Data_Concepcao DATE,
    Data_Nascimento DATE,
    Ninhada_Descricao TEXT,
    Perdas TEXT,
    FOREIGN KEY (Matriz_ID) REFERENCES Animais(ID)
);

CREATE TABLE Ninhadas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Matriz_ID INTEGER,
    Reprodutor_ID INTEGER,
    Data_Concepcao DATE,
    Data_Nascimento DATE,
    Descricao TEXT,
    Perdas TEXT,
    FOREIGN KEY (Matriz_ID) REFERENCES Animais(ID),
    FOREIGN KEY (Reprodutor_ID) REFERENCES Animais(ID)
);

CREATE TABLE Relacionamentos (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Animal_Pai_ID INTEGER,
    Animal_Mae_ID INTEGER,
    Filhote_ID INTEGER,
    Tipo_Relacao TEXT,
    FOREIGN KEY (Animal_Pai_ID) REFERENCES Animais(ID),
    FOREIGN KEY (Animal_Mae_ID) REFERENCES Animais(ID),
    FOREIGN KEY (Filhote_ID) REFERENCES Animais(ID)
);

CREATE TABLE Racas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Descricao TEXT
);

CREATE TABLE Vacinas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Animal_ID INTEGER,
    Nome_Vacina TEXT NOT NULL,
    Data_Aplicacao DATE,
    Proxima_Aplicacao DATE,
    Veterinario TEXT,
    FOREIGN KEY (Animal_ID) REFERENCES Animais(ID)
);

CREATE TABLE Pesagens (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Animal_ID INTEGER,
    Data_Pesagem DATE,
    Peso DECIMAL(5,2),
    FOREIGN KEY (Animal_ID) REFERENCES Animais(ID)
);

CREATE TABLE Historico_Saude (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Animal_ID INTEGER,
    Data_Evento DATE,
    Descricao TEXT,
    Tratamento TEXT,
    Veterinario TEXT,
    FOREIGN KEY (Animal_ID) REFERENCES Animais(ID)
);

CREATE TABLE Usuarios (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome_Usuario TEXT NOT NULL,
    Email TEXT NOT NULL,
    Senha TEXT NOT NULL,
    Nivel_Acesso TEXT NOT NULL
); 