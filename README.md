# 🌾 Farm Management System

Sistema completo para gerenciamento de fazenda, incluindo controle de animais, ninhadas, pesagens, vacinas, espécies e raças. Projeto fullstack com backend em **NestJS** e frontend em **Next.js**.

---

## 🚀 Funcionalidades

- **Cadastro e listagem de animais** (com espécie e raça)
- **Controle de ninhadas** (filhotes, pais, datas)
- **Registros de pesagem** (histórico por animal)
- **Gestão de vacinas** (aplicação, próxima dose, veterinário)
- **Busca inteligente** (nome, cor, espécie, raça, ID)
- **Dashboard moderno** com estatísticas animadas
- **Notificações toast** e feedback visual
- **Modais de confirmação** para ações críticas
- **Responsividade total** (desktop, tablet, mobile)
- **Design system** com glassmorphism, animações e micro-interações

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/) + [SQLite](https://www.sqlite.org/)
- **Frontend:** [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Testes:** Jest, Supertest (e2e)
- **Outros:** React Hooks, CSS Animations, Toasts, Modais

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo-fazenda.git
cd seu-repo-fazenda
```

### 2. Instale as dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configure o banco de dados

No diretório raiz, execute:

```bash
sqlite3 farm.db < setup_database.sql
```

Ou rode o script de migração (se existir):

```bash
cd backend
node migrate.js
```

### 4. Execute o backend

```bash
cd backend
npm run start:dev
```

### 5. Execute o frontend

```bash
cd ../frontend
npm run dev
```

Acesse em: [http://localhost:3001](http://localhost:3001)

---

## 🧪 Testes

### Backend

```bash
cd backend
npm test
```

- Testes e2e para rotas principais (animais, pesagens, reprodutores, etc.)

---

## 📁 Estrutura do Projeto

```
/backend
  ├── src/
  ├── test/
  ├── setup_database.sql
  └── ...
/frontend
  ├── src/
  ├── public/
  └── ...
```

---

## 📱 Funcionalidades do Frontend

- **Dashboard:** Estatísticas, busca, cards de animais, tabs para ninhadas, pesagens e vacinas.
- **Cadastro Unificado:** Formulário completo com seleção de espécie, raça, pais, pesagem inicial.
- **Listagens Dinâmicas:** Ninhadas, pesagens e vacinas exibidas em tempo real.
- **Feedback Visual:** Toasts, skeletons, modais, animações e micro-interações.

---

## 🎨 Design & UX

- Glassmorphism, gradientes e sombras modernas
- Animações suaves e micro-interações
- Hierarquia visual clara nos botões
- Layout responsivo e acessível

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para agricultores brasileiros** 