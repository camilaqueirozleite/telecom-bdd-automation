[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Cucumber.js](https://img.shields.io/badge/Cucumber.js-BDD-green?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Playwright](https://img.shields.io/badge/Playwright-Test%20Automation-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Chai](https://img.shields.io/badge/Chai-Assertions-A40802?logo=chai&logoColor=white)](https://www.chaijs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-83%25-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Gherkin](https://img.shields.io/badge/Gherkin-17%25-60c659?logo=cucumber&logoColor=white)](https://cucumber.io/docs/gherkin/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-d24939?logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

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
- Jenkins

## Competencias demonstradas

Este projeto foi estruturado para demonstrar habilidades praticas importantes para vagas de Testes de Software / QA:

- Escrita de cenarios BDD em Gherkin.
- Automacao de testes de API.
- Automacao de testes Web UI.
- Validacao de fluxos positivos e negativos.
- Uso de massa de teste via variaveis de ambiente.
- Separacao entre testes de API e testes de interface.
- Geracao de relatorio HTML de execucao.
- Pipeline Jenkins para execucao da regressao automatizada.
- Documentacao de plano de testes.
- Registro formal de bug encontrado durante os testes.
- Boas praticas para proteger dados sensiveis com `.env.example`.

## Aderencia a vaga de Tester / QA Automation

Este projeto foi ajustado para evidenciar competencias pedidas em vagas com foco em automacao de testes:

| Requisito da vaga | Como o projeto demonstra |
| --- | --- |
| Automacao de testes | Suite automatizada cobrindo API e Web UI |
| Cucumber obrigatorio | Cenarios BDD escritos em Gherkin e executados com Cucumber.js |
| Traduzir cenarios em linguagem tecnica | Features descrevem regras de negocio em passos tecnicos automatizados |
| Controlo de regressoes | Scripts `npm test`, `npm run test:api`, `npm run test:ui` e `npm run test:report` |
| Validacao de novas funcionalidades | Fluxos de login, contas e transferencias cobertos por testes positivos e negativos |
| Jenkins valorizado | `Jenkinsfile` com pipeline de instalacao, execucao e publicacao de relatorio |
| Jira valorizado | `BUG_REPORT.md` documenta defeito em formato proximo ao usado em ferramentas de gestao |
| Ingles tecnico basico | Steps, features e nomes tecnicos do projeto estao em ingles |

## Estrutura do projeto

```text
bank-transfer-bdd-automation/
+-- .env.example
+-- BUG_REPORT.md
+-- Jenkinsfile
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
+-- TEST_PLAN.md
```

## Documentacao complementar

- [TEST_PLAN.md](TEST_PLAN.md): plano de testes com escopo, tipos de teste, massa, criterios e comandos de execucao.
- [BUG_REPORT.md](BUG_REPORT.md): bug report do problema encontrado na UI ao tratar erro vazio do BFF.
- [Jenkinsfile](Jenkinsfile): exemplo de pipeline Jenkins para instalar dependencias, executar regressao e arquivar relatorio HTML.

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
- API bancaria da mentoria em execucao local
- Frontend bancario da mentoria em execucao local

## Aplicacao da mentoria

Este projeto automatiza uma aplicacao externa usada na mentoria. Por isso, antes de executar os testes, mantenha os dois servicos abaixo rodando na sua maquina:

```text
API / Swagger: http://localhost:3000/api-docs/
Frontend:      http://localhost:4000/
```

Os testes de API usam `http://localhost:3000` como base.

Os testes de interface usam `http://localhost:4000` como base.

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

Para os testes de interface, mantenha a API em `http://localhost:3000` e o frontend em `http://localhost:4000`.

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

## Jenkins

O reposititorio possui um `Jenkinsfile` com uma pipeline declarativa para executar a regressao automatizada.

A pipeline faz:

- Validacao dos parametros obrigatorios.
- Instalacao das dependencias com `npm ci`.
- Instalacao do navegador Chromium usado pelo Playwright.
- Execucao da suite com relatorio HTML.
- Arquivamento do relatorio em `reports/cucumber-report.html`.

Como a API e o frontend da mentoria rodam localmente, o agente Jenkins tambem precisa ter acesso aos servicos:

```text
http://localhost:3000
http://localhost:4000
```

Parametros esperados no Jenkins:

```text
API_BASE_URL
WEB_BASE_URL
BANK_API_USERNAME
BANK_API_PASSWORD
BANK_SOURCE_ACCOUNT_ID
BANK_TARGET_ACCOUNT_ID
BANK_TRANSFER_AMOUNT
BANK_UI_TRANSFER_AMOUNT
```

Use o campo de senha do Jenkins para `BANK_API_PASSWORD` e evite expor credenciais no repositorio.

## Uso com API real

Por padrao, o projeto aponta para `http://localhost:3000`.

A documentacao Swagger da API fica em:

```text
http://localhost:3000/api-docs/
```

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
- Integrar evidencias de teste em uma ferramenta como Jira ou Xray.
- Evoluir a pipeline Jenkins para iniciar automaticamente API e frontend, caso o codigo da aplicacao esteja disponivel.
