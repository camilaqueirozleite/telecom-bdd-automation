Feature: Bank Transfers Web UI

  Scenario: Login successfully on the web app
    Given the bank web app is open
    When I log in on the web app with valid credentials
    Then the transfer form should be displayed
    And the bank accounts should be available in the transfer form

  Scenario: Reject login with invalid credentials on the web app
    Given the bank web app is open
    When I log in on the web app with invalid credentials
    Then the web app should show a login error

  Scenario: Create a transfer through the web app
    Given I am logged in on the bank web app
    When I submit a transfer through the web app
    Then the web app should show transfer success
    And the transfer list should show the submitted transfer
