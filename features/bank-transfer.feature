Feature: Bank Transfers API

  Scenario: Login successfully
    Given the banking API is available
    When I log in with valid credentials
    Then the API should return status 200
    And a JWT token should be returned

  Scenario: Reject login with invalid credentials
    Given the banking API is available
    When I log in with invalid credentials
    Then the API should return status 401

  Scenario: List bank accounts with authentication
    Given the banking API is available
    And I am authenticated
    When I request the bank accounts
    Then the API should return status 200
    And the accounts list should be returned

  Scenario: Create a bank transfer successfully
    Given the banking API is available
    And I am authenticated
    When I create a bank transfer with valid data
    Then the API should return status 201
    And the transfer success message should be returned

  Scenario: Reject bank transfer without authentication
    Given the banking API is available
    When I create a bank transfer without authentication
    Then the API should return status 401

  Scenario: Reject bank transfer with invalid amount
    Given the banking API is available
    And I am authenticated
    When I create a bank transfer with invalid amount
    Then the API should return status 422
