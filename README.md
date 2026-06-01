# Telecom BDD Automation

Projeto de automacao BDD para validar o fluxo de ativacao de um SIM card em uma API de telecomunicacoes.

O projeto usa Cucumber.js para descrever os cenarios em linguagem Gherkin e Chai para validar os resultados esperados.

## Objetivo

Automatizar testes de comportamento para o processo de ativacao de SIM card, garantindo que:

- A API de telecom esteja disponivel.
- A ativacao seja realizada com dados validos do cliente.
- A API retorne o status esperado.
- A mensagem de sucesso seja exibida corretamente.

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
|       +-- simCardSteps.js
+-- package.json
+-- package-lock.json
+-- README.md
```

## Cenario automatizado

O cenario atual valida a ativacao bem-sucedida de um SIM card:

```gherkin
Feature: SIM Card Activation

  Scenario: Activate a SIM card successfully
    Given the telecom API is available
    When I activate a SIM card with valid customer data
    Then the activation should be completed successfully
    And the API should return status 201
    And the activation message should be displayed
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

## Resultado esperado

Ao executar os testes, o resultado esperado e:

```text
1 scenario (1 passed)
5 steps (5 passed)
```

## Proximos passos sugeridos

- Substituir a resposta simulada por uma chamada real para a API.
- Adicionar cenarios para dados invalidos.
- Validar mensagens de erro da API.
- Incluir relatorios de execucao dos testes.
