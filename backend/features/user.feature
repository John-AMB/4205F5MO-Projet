Feature: Manage Users
  As an admin
  I want to create and view users
  So that I can manage accounts

  Scenario: Create a new user
    Given I have a valid user payload
    When I create a new user with a POST request to "/users"
    Then the response status for creating user should be 201
    And the response should contain the new user id

  Scenario: Retrieve the created user
    Given I have a valid user payload
    And I create a new user with a POST request to "/users"
    When I send a GET request to "/users/{id}"
    Then the response should contain the user data
