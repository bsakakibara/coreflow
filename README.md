# CoreFlow

> Sistema web full-stack para gestão de clientes, produtos, pedidos e usuários, desenvolvido com foco em arquitetura organizada, segurança, regras de negócio, controle de estoque e experiência do usuário.

![Status](https://img.shields.io/badge/status-concluído-success)
![Frontend](https://img.shields.io/badge/frontend-React%2019-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6)
![Database](https://img.shields.io/badge/database-PostgreSQL-4169E1)

---

## Sobre o projeto

O **CoreFlow** é uma aplicação full-stack desenvolvida para simular um sistema de gestão empresarial, permitindo centralizar operações relacionadas a clientes, produtos, pedidos e usuários.

O projeto foi desenvolvido buscando representar um cenário próximo ao de uma aplicação utilizada em ambiente profissional, com separação entre frontend e backend, autenticação, autorização por perfil, validação de dados, persistência relacional, controle de estoque e tratamento de regras de negócio.

Mais do que implementar operações de cadastro, o objetivo foi construir uma aplicação com **responsabilidades bem definidas, segurança, consistência dos dados e uma interface moderna e responsiva**.

---

## Principais funcionalidades

### Dashboard

- Visão geral dos principais indicadores do sistema
- Total de usuários, clientes, produtos e pedidos
- Indicadores de pedidos e vendas do mês
- Gráfico de vendas por período
- Distribuição de pedidos por status
- Dados obtidos diretamente da API
- Interface responsiva
- Suporte a tema claro e escuro

### Clientes

- Cadastro de clientes
- Edição de clientes
- Consulta de clientes
- Exclusão de clientes
- Validação de dados
- Prevenção de documentos e e-mails duplicados
- Tratamento de clientes vinculados a pedidos

### Produtos

- Cadastro de produtos
- Edição de produtos
- Consulta de produtos
- Exclusão de produtos
- Controle de estoque
- SKU único
- Controle de preço
- Validação de dados

### Pedidos

- Criação de pedidos
- Associação com clientes
- Inclusão de produtos e quantidades
- Cálculo do valor total
- Controle automático de estoque
- Edição de itens enquanto o pedido está pendente
- Alteração de status
- Cancelamento com devolução automática do estoque
- Proteção contra devolução duplicada de estoque
- Validação de quantidade
- Bloqueio de operações inválidas

### Usuários

- Cadastro de usuários
- Edição de usuários
- Controle de perfis
- Autenticação através de JWT
- Autorização baseada em roles
- Gerenciamento restrito a administradores

---

# Regras de negócio

Uma das principais preocupações do projeto foi garantir que as operações não fossem apenas tecnicamente possíveis, mas também respeitassem regras de negócio.

### Controle de estoque

Ao criar um pedido:

```text
Pedido criado
     ↓
Validação dos produtos
     ↓
Verificação do estoque
     ↓
Baixa do estoque
     ↓
Pedido PENDENTE
````

Ao concluir:

```text
Pedido PENDENTE
     ↓
Pedido CONCLUIDO
     ↓
Estoque permanece reservado
```

Ao cancelar:

```text
Pedido PENDENTE
     ↓
Pedido CANCELADO
     ↓
Estoque devolvido
     ↓
stockReleased = true
```

O sistema utiliza a propriedade `stockReleased` para impedir que o estoque seja devolvido mais de uma vez.

### Status dos pedidos

O fluxo de status implementado é:

```text
PENDENTE
   ├──→ CONCLUIDO
   └──→ CANCELADO
```

Pedidos cancelados não podem voltar para o estado concluído.

Também existem proteções para impedir operações inválidas, como:

* Criar pedido sem itens
* Utilizar quantidade menor que 1
* Utilizar produto inexistente
* Utilizar cliente inexistente
* Cancelar e devolver estoque mais de uma vez
* Editar itens de pedidos que não estão pendentes
* Concluir pedidos cancelados

---

# Segurança

A aplicação possui autenticação e autorização implementadas no backend.

## Autenticação

O usuário realiza login e recebe um token JWT.

As requisições protegidas utilizam:

```http
Authorization: Bearer <token>
```

O middleware de autenticação:

* Verifica a existência do token
* Valida o JWT
* Recupera as informações do usuário
* Disponibiliza o usuário autenticado para as próximas camadas
* Bloqueia requisições sem autenticação

## Autorização

O sistema utiliza diferentes perfis:

```text
ADMIN
MANAGER
EMPLOYEE
```

As permissões são controladas através de middleware.

Exemplo:

```text
Usuário autenticado
        ↓
Verificação da role
        ↓
Permissão concedida
        ↓
Controller
```

Operações administrativas, como exclusão de registros e gerenciamento de usuários, possuem controle de acesso específico.

---

# Arquitetura

O projeto foi estruturado separando responsabilidades entre as diferentes camadas da aplicação.

## Backend

```text
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── clients/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── dashboard/
│   │   └── status/
│   │
│   ├── middlewares/
│   ├── database/
│   ├── generated/
│   └── ...
│
├── prisma/
└── ...
```

A organização por módulos facilita a manutenção e permite que cada domínio tenha suas próprias responsabilidades.

### Fluxo das requisições

```text
HTTP Request
     ↓
Route
     ↓
Middleware
     ↓
Validation
     ↓
Controller
     ↓
Service
     ↓
Prisma
     ↓
PostgreSQL
```

Essa separação evita concentrar regras de negócio nos controllers e facilita a evolução da aplicação.

---

# Frontend

O frontend foi desenvolvido utilizando React + TypeScript e organizado em componentes reutilizáveis.

Principais áreas:

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── layouts/
│   ├── routes/
│   └── theme/
│
└── ...
```

A comunicação com o backend é realizada através de uma camada de serviços utilizando Axios.

O estado das operações assíncronas é tratado através de hooks, incluindo estados de:

* carregamento
* sucesso
* erro
* atualização dos dados

---

# Stack tecnológica

## Frontend

| Tecnologia          | Utilização                             |
| ------------------- | -------------------------------------- |
| React 19            | Construção da interface                |
| TypeScript          | Tipagem estática                       |
| Vite                | Build e desenvolvimento                |
| Material UI         | Componentes e interface                |
| Emotion             | Estilização utilizada pelo MUI         |
| React Router        | Roteamento                             |
| Axios               | Comunicação com API REST               |
| React Hook Form     | Gerenciamento de formulários           |
| Zod                 | Validação de dados                     |
| @hookform/resolvers | Integração entre React Hook Form e Zod |
| Recharts            | Gráficos do dashboard                  |
| Notistack           | Feedbacks e notificações               |
| React Number Format | Formatação de valores numéricos        |
| Roboto              | Tipografia                             |
| ESLint              | Análise e padronização do código       |

## Backend

| Tecnologia | Utilização                  |
| ---------- | --------------------------- |
| Node.js    | Runtime                     |
| Express    | API REST                    |
| TypeScript | Tipagem estática            |
| Prisma ORM | Acesso e modelagem do banco |
| PostgreSQL | Banco de dados relacional   |
| JWT        | Autenticação                |
| bcrypt     | Hash de senhas              |
| dotenv     | Variáveis de ambiente       |

## Ferramentas

| Ferramenta | Utilização                   |
| ---------- | ---------------------------- |
| Git        | Controle de versão           |
| GitHub     | Versionamento e publicação   |
| Postman    | Testes da API                |
| Prisma     | Migrations e acesso ao banco |
| PostgreSQL | Persistência dos dados       |

---

# Banco de dados

O projeto utiliza **PostgreSQL** como banco de dados relacional e **Prisma ORM** para comunicação com a aplicação.

Principais entidades:

```text
User
 │
 └── controle de acesso

Client
 │
 └── Order
      │
      └── OrderItem
           │
           └── Product
```

### Principais relacionamentos

* Um cliente pode possuir vários pedidos
* Um pedido pertence a um cliente
* Um pedido possui vários itens
* Um item pertence a um produto
* Um produto pode estar presente em vários pedidos
* Usuários possuem diferentes níveis de acesso

O banco também utiliza:

* Chaves primárias
* Chaves estrangeiras
* Campos únicos
* Enums
* Timestamps
* Integridade referencial
* Cascade em itens de pedidos

---

# API REST

A aplicação possui uma API REST responsável pela comunicação entre frontend e backend.

Principais recursos:

```text
POST   /login

GET    /users
POST   /users
PUT    /users/:id
DELETE /users/:id

GET    /clients
POST   /clients
PUT    /clients/:id
DELETE /clients/:id

GET    /products
POST   /products
PUT    /products/:id
DELETE /products/:id

GET    /orders
GET    /orders/:id
POST   /orders
PUT    /orders/:id
DELETE /orders/:id

GET    /dashboard

GET    /status
```

As rotas protegidas utilizam autenticação JWT e, quando necessário, autorização baseada em perfil.

---

# Validação

As entradas da API são validadas antes de chegar às regras de negócio.

Entre os cenários tratados estão:

* Campos obrigatórios
* IDs inválidos
* Quantidades menores que 1
* Pedidos sem itens
* Produtos inexistentes
* Clientes inexistentes
* Status inválidos
* E-mails duplicados
* Documentos duplicados
* SKUs duplicados

Exemplo de validação de quantidade:

```text
quantity >= 1
```

Isso evita que valores inválidos cheguem à camada de serviço.

---

# Tratamento de erros

O sistema possui tratamento para diferentes situações de erro, retornando respostas HTTP apropriadas.

Exemplos:

```text
400 Bad Request
→ Dados inválidos

401 Unauthorized
→ Usuário não autenticado

403 Forbidden
→ Usuário sem permissão

404 Not Found
→ Recurso inexistente

409 Conflict
→ Conflito de dados, como duplicidade

500 Internal Server Error
→ Erro inesperado no servidor
```

As mensagens retornadas pela API também são utilizadas pelo frontend para fornecer feedback ao usuário.

---

# Interface

A interface foi desenvolvida com foco em:

* Responsividade
* Usabilidade
* Componentização
* Consistência visual
* Feedback ao usuário
* Tema claro e escuro
* Adaptação para diferentes tamanhos de tela

O Material UI foi utilizado como base para os componentes visuais.

O dashboard utiliza gráficos para transformar os dados da API em informações mais fáceis de interpretar.

---

# Testes funcionais realizados

Durante o desenvolvimento foram realizados testes diretamente na API e na aplicação.

### Pedidos

* [x] Criação de pedido válido
* [x] Baixa automática de estoque
* [x] Bloqueio por estoque insuficiente
* [x] Bloqueio de produto inexistente
* [x] Bloqueio de quantidade igual a zero
* [x] Bloqueio de quantidade negativa
* [x] Bloqueio de pedido sem itens
* [x] Cancelamento de pedido
* [x] Devolução do estoque após cancelamento
* [x] Proteção contra devolução duplicada
* [x] Conclusão de pedido
* [x] Bloqueio de pedido cancelado → concluído

### Segurança

* [x] Requisição sem JWT
* [x] Validação de token
* [x] Controle de acesso por role
* [x] Restrição de operações administrativas
* [x] Restrição de gerenciamento de usuários

### Clientes e produtos

* [x] Cadastro
* [x] Edição
* [x] Exclusão
* [x] Validação de duplicidade
* [x] Validação de dados
* [x] Tratamento de relacionamento com pedidos

### Frontend

* [x] Responsividade
* [x] Tema claro
* [x] Tema escuro
* [x] Consumo da API
* [x] Estados de carregamento
* [x] Tratamento de erros
* [x] Dashboard com dados reais

---

# Como executar o projeto

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Node.js
* npm
* PostgreSQL
* Git

---

## 1. Clone o repositório

```bash
git clone https://github.com/bsakakibara/coreflow.git
```

Entre na pasta do projeto:

```bash
cd CoreFlow
```

---

# Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/coreflow"
JWT_SECRET="sua_chave_secreta"
```

Execute as migrations:

```bash
npx prisma migrate deploy
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3333
```

---

# Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente.

---

# Scripts do frontend

```bash
npm run dev
```

Executa o ambiente de desenvolvimento.

```bash
npm run build
```

Realiza a compilação e build de produção.

```bash
npm run lint
```

Executa a análise estática do código utilizando ESLint.

```bash
npm run preview
```

Executa uma prévia do build de produção.

---

# Variáveis de ambiente

As informações sensíveis não devem ser versionadas no Git.

Exemplo:

```env
DATABASE_URL="..."
JWT_SECRET="..."
```

O arquivo `.env` deve permanecer no `.gitignore`.

Para disponibilizar o projeto publicamente, utilize um arquivo de exemplo:

```text
.env.example
```

Exemplo:

```env
DATABASE_URL=
JWT_SECRET=
```

---

# Objetivos técnicos

O desenvolvimento do CoreFlow teve como principais objetivos:

* Aplicar TypeScript no frontend e backend
* Desenvolver uma API REST estruturada
* Utilizar arquitetura modular
* Implementar autenticação JWT
* Implementar autorização baseada em roles
* Trabalhar com PostgreSQL
* Utilizar Prisma ORM
* Implementar validações
* Aplicar regras de negócio reais
* Controlar estoque de forma consistente
* Desenvolver uma interface responsiva
* Criar componentes reutilizáveis
* Trabalhar com gráficos e indicadores
* Separar responsabilidades entre camadas
* Garantir tratamento adequado de erros

---

# Possíveis evoluções

A arquitetura do projeto permite futuras evoluções, como:

* Paginação server-side
* Filtros avançados
* Relatórios avançados
* Exportação de dados
* Auditoria de operações
* Testes automatizados de integração
* Testes E2E
* Docker e Docker Compose
* CI/CD
* Controle de permissões ainda mais granular
* Histórico de alterações dos pedidos

Essas funcionalidades não fazem parte do escopo atual, mas podem ser incorporadas sem necessidade de reestruturar completamente a aplicação.

---

# Autor

**Bruno Borges Sakakibara Galdino**

Desenvolvedor Front-End / Full Stack

Tecnologias de interesse:

`React` · `TypeScript` · `JavaScript` · `Node.js` · `PHP` · `SQL Server` · `PostgreSQL` · `APIs REST`

---

## Projeto

**CoreFlow — Sistema de Gestão Full Stack**

Projeto desenvolvido para demonstrar na prática conhecimentos de desenvolvimento frontend e backend, integração com API REST, banco de dados relacional, autenticação, autorização, regras de negócio, controle de estoque e construção de interfaces modernas.

