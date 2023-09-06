# Documentação da API Adonis.js

Esta documentação fornece instruções passo a passo sobre como configurar e executar a API do teste tecnico, incluindo a criação de migrações e seeds.

## Pré-requisitos

Antes de começar, certifique-se de que você tenha o seguinte instalado no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) (Versão recomendada: LTS)

## Passos para Configuração

### 1. Configure o Banco de Dados (PostgreSQL)

Edite o arquivo `.env` na raiz do seu projeto para configurar as informações do banco de dados PostgreSQL, como o host, nome do banco de dados, usuário e senha.

Exemplo de configuração para PostgreSQL:

```plaintext
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=db_teste_enliv
```

Certifique-se de substituir `seu_usuario`, `sua_senha` e `nome_do_banco` pelas informações corretas do seu ambiente PostgreSQL.

### 2. Criando o banco de dados PostgreSQL

```bash
CREATE DATABASE  db_teste_enliv
```

### 3. Execute as migration

Execute as migration para criar as tabelas no banco de dados:

```bash
node ace migration:run 
```

Isso aplicará todas as migration pendentes.

### 4. Execute Seeds

Execute as seeds para inserir dados no banco de dados:

```bash
node ace db:seed
```

Isso executará todas as seeds definidas no seu projeto.

## Executando o Projeto

Após configurar seu projeto Adonis.js e aplicar migrações e seeds (se necessário), você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor na porta padrão `3333`. Você pode acessar a API em `http://localhost:3333`.

## Conclusão

Agora você tem uma API Adonis.js configurada e em execução, com migrações e seeds aplicadas conforme necessário. Você pode começar a desenvolver seus endpoints e lógica de negócios.

Lembre-se de consultar a [documentação oficial do Adonis.js](https://adonisjs.com/docs) para obter mais informações sobre como usar o framework.
