Relationships between Models :

User has many Restaurants and has many reviews through Restaurants

Restaurant has many Reviews and has many Users through Reviews.

Review - Belongs to Restaurant and User

__________________________________________________________________________________________________________

Schema :

Restaurant has a Name, Rating, Location, Cuisine

User has - Username, Email, and Password.

Review has Date, health_rating, taste_rating, cleanliness_rating, description, restaurant_id and user_id

__________________________________________________________________________________________________________

Task List :

Genrate Models, Migrations, for, Restaurant, Review and User. -- Done

Genrate Controllers, and Views for, Restaurant, Review and User.

Generate Routes for, Restaurant, Review and User.

Genrate forms for, Restaurant, Review and User.

User Partials

User can create, edit and delete his or her own Reviews and Restaurants. User can not edit or delete other users Reviews or Restaurants.  -- Done

Setup Omniauth with Facebook

User should be able to post restaurants and reviews to root page of the app. where other users can see them.

create nested resources for reviews - user should be able to see all the reviews associated with a restaurant from root page. restaurant/1/reviews

Create 2 class methods on Restaurant class, that will query all restaurant with 5 ranking for taste and healthy.



Restaurant has nested_attributes for reviews. called restaurant_attributes.

_________________________________________________________________________________________________________

Migrations

rails g model User username:string email:string password_digest:string --no-test-framework

rails generate migration add_uid_to_users uid:string --no-test-framework
rails generate migration add_admin_to_users admin:boolean --no-test-framework
rails g migration remove_status_from_restaurants status:boolean --no-test-framework

rails generate migration add_status_to_restaurants status:boolean --no-test-framework

rails g model Restaurant name:string rating:integer location:string cuisine:string --no-test-framework

rails g model Review taste_rating:integer health_rating:integer cleanliness_rating:integer description:text date:date restaurant_id:integer user_id:integer --no-test-framework

___________________________________________________________________________________________

Project Requirements -

- Must render atleast one index page with a list of things. (Restaurants, User's Restaurants).
- Must render atleast one show page with one specific thing. (Resaturant show page - Next Button).
- Atleast 1 has-many relationship. (Restaurant Reviews on show page).
- Must use rails API and a form to create a resource and render ther resonse without a page refresh. Append it to page.(form to add review on restaurant's show page).
- Must translate the JSON response into Javascript Model Object. The Model Object must have atleast one method on the prototype.

___________________________________________________________________________________________

New TASKS - 


_________________________________________________________________________________________