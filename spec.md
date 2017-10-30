# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project

- [X] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) User has many   Restaurants

- [X] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) - Review Belongs to User and Restaurant.

- [X] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) - User has many Restaurants through Review

- [X] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) - review.taste_rating, review.health_rating

- [X] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)

- [X] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) - Restaurant.tastiest_restuarants, Restaurant.healthies_restuarants

- [X] Include a nested form writing to an associated model using a custom attribute writer (form URL, model name e.g. /recipe/new, Item) - nested for reviews in restaurant/new form.

- [X] Include signup (how e.g. Devise)
- [X] Include login (how e.g. Devise)
- [X] Include logout (how e.g. Devise)
- [X] Include third party signup/login (how e.g. Devise/OmniAuth)
- [X] Include nested resource show or index (URL e.g. users/2/recipes) - user/:id/restaurants
- [X] Include nested resource "new" form (URL e.g. recipes/1/ingredients) - user/:id/restaurants/new
- [X] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [X] The application is pretty DRY
- [X] Limited logic in controllers
- [X] Views use helper methods if appropriate
- [X] Views use partials if appropriate
