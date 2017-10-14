# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

    Restaurant.create([
      {name: "Rat's", location: "Hamilton Township, NJ", cuisine: "French Cuisine"},
      {name: "Marhaba", location: " Lambertville, NJ", cuisine: "classic Middle Eastern"},
      {name: "Panera Bread", location: " Newtown, Pa", cuisine: "French"},
      {name: "Taco Bell", location: "NJ", cuisine: "Mexican"},
      {name: "Chipotle", location: "PA", cuisine: "Mexican Grill"}
      ])

      Review.create([
        {taste_rating: 5, health_rating: 3, cleanliness_rating: 5, description: "Amazingly tasty food with a great outdoor view", date: Date.today, restaurant_id: 1, user_id: 1},
        {taste_rating: 5, health_rating: 4, cleanliness_rating: 3, description: "Authentic and great tasting Middle Eastern Food", date: Date.today, restaurant_id: 2, user_id: 1},
        {taste_rating: 5, health_rating: 4, cleanliness_rating: 5, description: "French food at it's best, if you want it fast!!", date: Date.today, restaurant_id: 3, user_id: 2},
        {taste_rating: 2, health_rating: 1, cleanliness_rating: 2, description: "Worst Mexican Food in the world", date: Date.today, restaurant_id: 4, user_id: 2},
        {taste_rating: 4, health_rating: 1, cleanliness_rating: 2, description: "Nice food but, eat at your own risk", date: Date.today, restaurant_id: 5, user_id: 2}
        ])

      User.create([
        {username: "Micky Mouse", email: "micky@disney.com", password: "cheese"},
        {username: "Minney Mouse", email: "minney@disney.com", password: "polkadots"}
        ])
