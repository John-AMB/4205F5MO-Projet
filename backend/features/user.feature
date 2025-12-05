Feature: Manage Users
  As an admin
  I want to create and retrieve users
  So that I can manage the user base

  Scenario: Create a new user
    Given I have a valid user payload
    When I send a POST request to "/users"
    Then the response status for user should be 201
    And the response should contain the new user id

  Scenario: Retrieve the created user
    When I send a GET request to "/users/{userId}"
    Then the response should contain the user data
