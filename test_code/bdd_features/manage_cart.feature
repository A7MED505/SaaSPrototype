Feature: Shopping Cart
  As a user
  I want to manage my shopping cart
  So that I can purchase items

  Scenario: User can add item to cart
    Given I am viewing a product
    When I click add to cart
    Then the item should be added to my cart
    And cart count should increase

  Scenario: User can view cart contents
    Given I have items in my cart
    When I navigate to the cart page
    Then I should see all items in the cart
    And I should see the total price

  Scenario: User can remove item from cart
    Given I have items in my cart
    When I click remove on an item
    Then the item should be removed
    And the total price should update
