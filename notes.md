Relationships between Models :

User has many reviews and has many Restaurants through Reviews

Restaurant has many Reviews and has many Users through Reviews.

Review - Belongs to Restaurant and User

__________________________________________________________________________________________________________

Schema :

Restaurant has a Name, Rating, Location, Cuisine

User has - Username, Email, and Password.

Review has Date, health_rating, taste_rating, cleanliness_rating, description, restaurant_id and user_id

__________________________________________________________________________________________________________

Task List :

Genrate Models, Migrations, Controllers, and Views for, Restaurant, Review and User.

User can create, edit and delete his or her own Reviews and Restaurants. User can not edit or delete other users Reviews or Restaurants.

Restaurant has nested_attributes for reviews. called restaurant_attributes.

_________________________________________________________________________________________________________

Migrations

rails g model User username:string email:string password_digest:string --no-test-framework

rails g model Restaurant name:string rating:integer location:string cuisine:string --no-test-framework

rails g model Review taste_rating:integer health_rating:integer cleanliness_rating:integer description:text date:date restaurant_id:integer user_id:integer --no-test-framework
