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
