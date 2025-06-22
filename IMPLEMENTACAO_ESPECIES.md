# 🐄 Implementação do Controle de Espécies

## 📋 Resumo das Alterações

Adicionamos o controle de **espécies** ao sistema de gerenciamento de fazenda, complementando o controle de raças já existente. Isso permite uma classificação mais precisa dos animais.

## 🗄️ Alterações no Banco de Dados

### 1. Nova Tabela: `Especies`
```sql
CREATE TABLE Especies (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Nome_Cientifico TEXT,
    Descricao TEXT,
    Tipo_Animal TEXT,
    Expectativa_Vida INTEGER,
    Peso_Adulto_Min DECIMAL(5,2),
    Peso_Adulto_Max DECIMAL(5,2)
);
```

### 2. Alterações na Tabela: `Animais`
```sql
-- Adicionadas as colunas:
ALTER TABLE Animais ADD COLUMN Especie_ID INTEGER;
ALTER TABLE Animais ADD COLUMN Raca_ID INTEGER;
```

### 3. Dados Iniciais
- **10 espécies** comuns em fazendas brasileiras
- **10 raças** populares
- Informações completas incluindo nomes científicos e características

## 🔧 Alterações no Backend

### 1. Novo Módulo: `EspeciesModule`
- **Serviço**: `EspeciesService` - CRUD completo
- **Controlador**: `EspeciesController` - Endpoints REST
- **DTOs**: `CreateEspecieDto` e `UpdateEspecieDto`

### 2. Endpoints Disponíveis
```
GET    /especies           - Listar todas as espécies
GET    /especies/:id       - Buscar espécie por ID
GET    /especies/tipo/:tipo - Buscar por tipo de animal
POST   /especies           - Criar nova espécie
PATCH  /especies/:id       - Atualizar espécie
DELETE /especies/:id       - Excluir espécie
```

### 3. Atualizações nos Serviços Existentes
- **AnimaisService**: Inclui espécie e raça nas consultas
- **AnimaisUnificadoService**: Suporte a espécie e raça no cadastro

## 🎨 Alterações no Frontend

### 1. Página de Cadastro Unificado
- **Seleção de Espécie**: Dropdown com espécies disponíveis
- **Seleção de Raça**: Dropdown com raças disponíveis
- **Carregamento Assíncrono**: Dados carregados em paralelo
- **Validação**: Campos opcionais mas com validação

### 2. Página Inicial
- **Cards Atualizados**: Mostram espécie e raça dos animais
- **Busca Melhorada**: Inclui busca por espécie e raça
- **Interface Responsiva**: Layout adaptado para novos campos

### 3. Componentes
- **Loading States**: Indicadores de carregamento
- **Error Handling**: Tratamento de erros
- **Toast Notifications**: Feedback para o usuário

## 🚀 Como Implementar

### 1. Executar Migrações do Banco
```bash
# No diretório do projeto
sqlite3 database.sqlite < setup_database.sql
```

### 2. Reiniciar o Backend
```bash
cd backend
npm run start:dev
```

### 3. Reiniciar o Frontend
```bash
cd frontend
npm run dev
```

### 4. Testar as Funcionalidades
1. Acesse `http://localhost:3001`
2. Clique em "Cadastrar Animal Completo"
3. Verifique os campos de espécie e raça
4. Teste a busca por espécie/raça na página inicial

## 📊 Espécies Incluídas

| Espécie | Nome Científico | Tipo | Expectativa de Vida |
|---------|----------------|------|-------------------|
| Bovino | Bos taurus | Gado | 20 anos |
| Ovino | Ovis aries | Ovelha | 12 anos |
| Caprino | Capra hircus | Cabra | 15 anos |
| Suíno | Sus scrofa domesticus | Porco | 15 anos |
| Equino | Equus caballus | Cavalo | 25 anos |
| Asinino | Equus asinus | Burro | 30 anos |
| Aves | Gallus gallus domesticus | Ave | 8 anos |
| Peru | Meleagris gallopavo | Ave | 10 anos |
| Pato | Anas platyrhynchos domesticus | Ave | 10 anos |
| Coelho | Oryctolagus cuniculus | Roedor | 8 anos |

## 🎯 Benefícios da Implementação

### 1. **Classificação Precisa**
- Distinção clara entre espécies e raças
- Informações científicas incluídas
- Características específicas por espécie

### 2. **Melhor Gestão**
- Controle de expectativa de vida
- Faixas de peso por espécie
- Planejamento de manejo específico

### 3. **Relatórios Aprimorados**
- Estatísticas por espécie
- Análises de produtividade
- Controle de saúde por tipo

### 4. **Experiência do Usuário**
- Interface intuitiva
- Busca inteligente
- Feedback visual claro

## 🔍 Funcionalidades de Busca

A busca agora inclui:
- ✅ Nome do animal
- ✅ Cor
- ✅ **Espécie** (novo)
- ✅ **Raça** (novo)

## 📱 Responsividade

- **Mobile**: Layout adaptado para telas pequenas
- **Tablet**: Grid responsivo
- **Desktop**: Interface completa

## 🛠️ Próximos Passos

1. **Validação de Compatibilidade**: Verificar se raça é compatível com espécie
2. **Relatórios por Espécie**: Estatísticas específicas
3. **Calendário de Vacinas**: Por espécie
4. **Alimentação**: Recomendações por espécie
5. **Reprodução**: Controle específico por espécie

## 🐛 Solução de Problemas

### Erro: "Tabela Especies não existe"
```bash
# Execute o script de setup
sqlite3 database.sqlite < setup_database.sql
```

### Erro: "Coluna Especie_ID não existe"
```bash
# Adicione as colunas manualmente
sqlite3 database.sqlite
ALTER TABLE Animais ADD COLUMN Especie_ID INTEGER;
ALTER TABLE Animais ADD COLUMN Raca_ID INTEGER;
```

### Erro: "Módulo EspeciesModule não encontrado"
```bash
# Verifique se o módulo foi importado no app.module.ts
# Reinicie o backend
npm run start:dev
```

---

**Implementação concluída com sucesso! 🎉**

O sistema agora oferece controle completo de espécies e raças, proporcionando uma gestão mais precisa e profissional da fazenda. 