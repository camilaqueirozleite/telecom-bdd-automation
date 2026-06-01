# Bank Transfer BDD Automation

Projeto de automacao BDD para validar uma API de transferencias bancarias e sua interface web.

O projeto usa Cucumber.js para descrever os cenarios em linguagem Gherkin, Chai para validar os resultados da API e Playwright para automatizar a interface.

## Objetivo

Automatizar testes de comportamento para os fluxos principais da API bancaria, garantindo que:

- A API esteja disponivel.
- O login gere um token JWT para credenciais validas.
- Credenciais invalidas sejam rejeitadas.
- Contas bancarias sejam listadas com autenticacao.
- Transferencias sejam criadas com dados validos.
- Requisicoes sem autenticacao ou com dados invalidos sejam bloqueadas.
- A interface web permita login, carregue as contas e realize transferencia.

## Tecnologias

- Node.js
- npm
- Cucumber.js
- Chai
- Playwright

## Estrutura do projeto

```text
bank-transfer-bdd-automation/
+-- .env.example
+-- features/
|   +-- bank-transfer.feature
|   +-- bank-transfer-ui.feature
|   +-- step_definitions/
|   |   +-- bankTransferSteps.js
|   |   +-- bankTransferUiSteps.js
|   +-- support/
|       +-- bankApiClient.js
+-- package.json
+-- package-lock.json
+-- README.md
```

## Cenarios automatizados

O projeto valida login, listagem de contas, transferencias via API e fluxos principais da interface web:

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

```gherkin
Feature: Bank Transfers Web UI

  Scenario: Login successfully on the web app
    Given the bank web app is open
    When I log in on the web app with valid credentials
    Then the transfer form should be displayed
    And the bank accounts should be available in the transfer form

  Scenario: Create a transfer through the web app
    Given I am logged in on the bank web app
    When I submit a transfer through the web app
    Then the web app should show transfer success
    And the transfer list should show the submitted transfer
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
$env:WEB_BASE_URL="http://localhost:4000"
$env:BANK_API_USERNAME="seu-usuario"
$env:BANK_API_PASSWORD="sua-senha"
$env:BANK_SOURCE_ACCOUNT_ID="1"
$env:BANK_TARGET_ACCOUNT_ID="2"
$env:BANK_TRANSFER_AMOUNT="100"
$env:BANK_UI_TRANSFER_AMOUNT="123.45"
```

O arquivo `.env` nao deve ser enviado ao GitHub.

## Como executar os testes

Executar todos os cenarios:

```bash
npm test
```

Executar somente API:

```bash
npm run test:api
```

Executar somente interface web:

```bash
npm run test:ui
```

No PowerShell, se a politica de execucao bloquear `npm.ps1`, use:

```powershell
npm.cmd test
```

Para os testes de interface, mantenha a API em `localhost:3000` e o frontend em `localhost:4000`.

Se o Playwright nao encontrar um navegador local, execute:

```bash
npx playwright install chromium
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

## Uso com interface web

Por padrao, o projeto aponta para `http://localhost:4000`.

Fluxos cobertos:

- Login com credenciais validas.
- Login com credenciais invalidas.
- Carregamento de contas no formulario de transferencia.
- Criacao de transferencia pela tela.

Observacao: ao testar transferencia invalida pela UI, foi identificado que o frontend nao exibe toast quando o BFF retorna erro com corpo vazio. Esse caso ficou como melhoria futura para a aplicacao.

## Resultado esperado

Ao executar os testes, o resultado esperado e:

```text
9 scenarios (9 passed)
35 steps (35 passed)
```

## Proximos passos sugeridos

- Adicionar cenarios para consulta de transferencia por ID.
- Adicionar cenarios para saldo insuficiente e conta inativa.
- Adicionar tratamento de erro vazio no frontend para transferencias invalidas.
- Publicar relatorios como artefato em uma pipeline de CI.
- Configurar GitHub Actions para executar os testes automaticamente.
