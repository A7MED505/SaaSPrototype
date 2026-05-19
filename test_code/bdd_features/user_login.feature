Feature: User Authentication
  As a user
  I want to register and login to the application
  So that I can access the e-commerce platform

  Scenario: User registration with valid credentials
    Given I have valid user credentials
    When I submit the registration form
    Then I should see a success message
    And I should be able to login

  Scenario: User login with correct credentials
    Given I have an existing user account
    When I enter my email and password
    Then I should be logged in
    And I should see the dashboard

  Scenario: User login with incorrect password
    Given I have an existing user account
    When I enter my email with wrong password
    Then I should see an error message
    And I should not be logged in
