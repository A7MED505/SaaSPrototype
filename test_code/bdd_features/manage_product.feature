Feature: Product Management
  As a user
  I want to browse and manage products
  So that I can find and purchase items

  Scenario: User can view product catalog
    Given I am on the products page
    When I load the page
    Then I should see a list of products
    And each product should have name, price, and description

  Scenario: User can filter products
    Given I am viewing the product list
    When I filter by price range
    Then I should see only products within that range

  Scenario: User can view product details
    Given I am viewing the product list
    When I click on a product
    Then I should see detailed information about the product
    And I should be able to add it to cart
