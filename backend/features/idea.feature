Feature: Manage Ideas
  As a user
  I want to create, update, and delete ideas
  So that I can manage my project ideas

  Scenario: Create a new idea
    Given I have a valid idea payload
    When I send a POST request to "/ideas"
    Then the response status should be 201
    And the response should contain the new idea id
