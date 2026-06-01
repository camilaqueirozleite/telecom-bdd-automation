Feature: SIM Card Activation

  Scenario: Activate a SIM card successfully
    Given the telecom API is available
    When I activate a SIM card with valid customer data
    Then the activation should be completed successfully
    And the API should return status 201
    And the activation message should be displayed
