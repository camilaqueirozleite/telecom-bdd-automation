# Telecom BDD Automation

Projeto de automacao BDD para validar o fluxo de ativacao de um SIM card em uma API de telecomunicacoes.

O projeto usa Cucumber.js para descrever os cenarios em linguagem Gherkin e Chai para validar os resultados esperados.

## Objetivo

Automatizar testes de comportamento para o processo de ativacao de SIM card, garantindo que:

- A API de telecom esteja disponivel.
- A ativacao seja realizada com dados validos do cliente.
- A API retorne o status esperado.
- A mensagem de sucesso seja exibida corretamente.
- Dados invalidos sejam rejeitados com status e mensagem de erro esperados.

## Tecnologias

- Node.js
- npm
- Cucumber.js
- Chai

## Estrutura do projeto

```text
telecom-bdd-automation/
+-- features/
|   +-- sim-card-activation.feature
|   +-- step_definitions/
|   |   +-- simCardSteps.js
|   +-- support/
|       +-- telecomApiClient.js
+-- package.json
+-- package-lock.json
+-- README.md
```

## Cenarios automatizados

O projeto valida os fluxos de sucesso e erro na ativacao de um SIM card:

```gherkin
Feature: SIM Card Activation

  Scenario: Activate a SIM card successfully
    Given the telecom API is available
    When I activate a SIM card with valid customer data
    Then the activation should be completed successfully
    And the API should return status 201
    And the activation message should be displayed

  Scenario: Reject SIM card activation with invalid customer data
    Given the telecom API is available
    When I activate a SIM card with invalid customer data
    Then the activation should fail
    And the API should return status 400
    And the error message should be displayed
```

## Requisitos

- Node.js instalado
- npm instalado

## Como instalar

```bash
npm install
```

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

Por padrao, o projeto usa uma resposta simulada para manter os testes executaveis localmente.

Para apontar para uma API real, informe a variavel `API_BASE_URL`. O client fara uma chamada `POST` para `/sim-cards/activation`.

Exemplo no PowerShell:

```powershell
$env:API_BASE_URL="https://api.exemplo.com"
npm.cmd test
```

## Resultado esperado

Ao executar os testes, o resultado esperado e:

```text
2 scenarios (2 passed)
10 steps (10 passed)
```

## Proximos passos sugeridos

- Criar mais cenarios de validacao de dados obrigatorios.
- Adicionar testes para falhas internas da API.
- Publicar relatorios como artefato em uma pipeline de CI.
- Configurar GitHub Actions para executar os testes automaticamente.
