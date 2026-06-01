# Bank Transfer BDD Automation

Projeto de automacao BDD para validar uma API de transferencias bancarias.

O projeto usa Cucumber.js para descrever os cenarios em linguagem Gherkin e Chai para validar os resultados esperados da API.

## Objetivo

Automatizar testes de comportamento para os fluxos principais da API bancaria, garantindo que:

- A API esteja disponivel.
- O login gere um token JWT para credenciais validas.
- Credenciais invalidas sejam rejeitadas.
- Contas bancarias sejam listadas com autenticacao.
- Transferencias sejam criadas com dados validos.
- Requisicoes sem autenticacao ou com dados invalidos sejam bloqueadas.

## Tecnologias

- Node.js
- npm
- Cucumber.js
- Chai

## Estrutura do projeto

```text
bank-transfer-bdd-automation/
+-- .env.example
+-- features/
|   +-- bank-transfer.feature
|   +-- step_definitions/
|   |   +-- bankTransferSteps.js
|   +-- support/
|       +-- bankApiClient.js
+-- package.json
+-- package-lock.json
+-- README.md
```

## Cenarios automatizados

O projeto valida login, listagem de contas e transferencias:

```gherkin
Feature: Bank Transfers API

  Scenario: Login successfully
    Given the banking API is available
    When I log in with valid credentials
    Then the API should return status 200
    And a JWT token should be returned

  Scenario: Create a bank transfer successfully
    Given the banking API is available
    And I am authenticated
    When I create a bank transfer with valid data
    Then the API should return status 201
    And the transfer success message should be returned
```

## Requisitos

- Node.js instalado
- npm instalado

## Como instalar

```bash
npm install
```

## Como configurar

Crie um arquivo `.env` local com base no `.env.example`, ou defina as variaveis de ambiente manualmente.

Exemplo no PowerShell:

```powershell
$env:API_BASE_URL="http://localhost:3000"
$env:BANK_API_USERNAME="seu-usuario"
$env:BANK_API_PASSWORD="sua-senha"
$env:BANK_SOURCE_ACCOUNT_ID="1"
$env:BANK_TARGET_ACCOUNT_ID="2"
$env:BANK_TRANSFER_AMOUNT="100"
```

O arquivo `.env` nao deve ser enviado ao GitHub.

## Como executar os testes

```bash
npm test
```

No PowerShell, se a politica de execucao bloquear `npm.ps1`, use:

```powershell
npm.cmd test
```

## Como gerar relatorio HTML

```bash
npm run test:report
```

O relatorio sera gerado em:

```text
reports/cucumber-report.html
```

## Uso com API real

Por padrao, o projeto aponta para `http://localhost:3000`.

Endpoints usados:

- `POST /login`
- `GET /contas`
- `POST /transferencias`

As rotas protegidas usam o header `Authorization: Bearer <token>`.

Importante: o cenario de transferencia com sucesso cria uma transferencia real na API local e altera os saldos das contas envolvidas.

## Resultado esperado

Ao executar os testes, o resultado esperado e:

```text
6 scenarios (6 passed)
24 steps (24 passed)
```

## Proximos passos sugeridos

- Adicionar cenarios para consulta de transferencia por ID.
- Adicionar cenarios para saldo insuficiente e conta inativa.
- Publicar relatorios como artefato em uma pipeline de CI.
- Configurar GitHub Actions para executar os testes automaticamente.
