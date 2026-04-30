# Monitor de Indicadores API

API desenvolvida em NestJS para gerenciar usuários, municípios e relatórios de indicadores municipais.

O sistema utiliza autenticação JWT, controle de acesso por perfis e banco de dados SQLite com TypeORM.

## Justificativa do domínio

O domínio escolhido foi o de monitoramento de indicadores municipais, pois representa um cenário comum em sistemas públicos, com usuários de diferentes níveis de acesso e relatórios vinculados a municípios.

A aplicação permite que administradores criem usuários e relatórios, enquanto outros perfis possuem permissões mais restritas de consulta e atualização.

## Tecnologias utilizadas

- NestJS
- TypeScript
- SQLite
- TypeORM
- JWT
- Passport
- bcrypt
- class-validator
- Swagger

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
DATABASE_PATH=database.sqlite
JWT_SECRET=segredo_da_atividade
JWT_EXPIRES_IN=1d
```

## Execução

```bash
npm run start:dev
```

A documentação Swagger fica disponível em:

```txt
http://localhost:3000/api/docs
```

## Usuário inicial

Ao iniciar a aplicação, é criado automaticamente um usuário master:

```json
{
  "email": "master@sistema.com",
  "senha": "master123"
}
```

## Perfis de acesso

O sistema possui três perfis:

- `ROLE_MASTER`
- `ROLE_ADMIN_PUBLICO`
- `ROLE_AUDITOR`

## Matriz de permissões

| Rota | Método | Acesso |
|---|---|---|
| `/help` | GET | Público |
| `/auth/login` | POST | Público |
| `/usuarios` | GET | ROLE_MASTER |
| `/usuarios` | POST | ROLE_MASTER |
| `/usuarios/:id` | DELETE | ROLE_MASTER |
| `/municipios` | GET | ROLE_MASTER, ROLE_ADMIN_PUBLICO, ROLE_AUDITOR |
| `/relatorios` | POST | ROLE_MASTER |
| `/relatorios/municipio/:municipioId` | GET | ROLE_MASTER, ROLE_ADMIN_PUBLICO |
| `/relatorios/:id` | PATCH | ROLE_MASTER, ROLE_ADMIN_PUBLICO |
| `/relatorios/:id` | DELETE | ROLE_MASTER |

## Exemplos de uso

### Login

Requisição:

```json
{
  "email": "master@sistema.com",
  "senha": "master123"
}
```

Resposta:

```json
{
  "accessToken": "token_jwt",
  "user": {
    "id": 1,
    "nome": "Master",
    "email": "master@sistema.com",
    "role": "ROLE_MASTER"
  }
}
```

### Criar usuário

Requisição:

```json
{
  "nome": "Administrador Público de Natal",
  "email": "admin.natal@sistema.com",
  "senha": "admin123",
  "role": "ROLE_ADMIN_PUBLICO",
  "municipioId": 1
}
```

Resposta:

```json
{
  "id": 2,
  "nome": "Administrador Público de Natal",
  "email": "admin.natal@sistema.com",
  "role": "ROLE_ADMIN_PUBLICO",
  "municipio": {
    "id": 1,
    "nome": "Natal",
    "uf": "RN"
  }
}
```

A senha é enviada na requisição, mas não é retornada na resposta.

### Criar relatório

Requisição:

```json
{
  "titulo": "Relatório de Mortalidade Infantil",
  "descricao": "Indicador municipal de mortalidade infantil para acompanhamento anual.",
  "ano": 2024,
  "nomeIndicador": "Taxa de mortalidade infantil",
  "valorIndicador": 12.5,
  "municipioId": 1
}
```

Resposta:

```json
{
  "id": 1,
  "titulo": "Relatório de Mortalidade Infantil",
  "descricao": "Indicador municipal de mortalidade infantil para acompanhamento anual.",
  "ano": 2024,
  "nomeIndicador": "Taxa de mortalidade infantil",
  "valorIndicador": 12.5,
  "municipio": {
    "id": 1,
    "nome": "Natal",
    "uf": "RN"
  },
  "createdAt": "2026-04-30T00:00:00.000Z",
  "updatedAt": "2026-04-30T00:00:00.000Z"
}
```

## Status HTTP utilizados

- `200 OK` para consultas bem-sucedidas.
- `201 Created` para criações.
- `204 No Content` para exclusões.
- `401 Unauthorized` para login inválido ou ausência de token.
- `403 Forbidden` para acesso sem permissão.
- `404 Not Found` para recurso inexistente.

## Collection

A collection do Postman ou Insomnia está incluída no projeto para teste das rotas principais.

## Observação

O banco SQLite é criado automaticamente ao executar a aplicação.
