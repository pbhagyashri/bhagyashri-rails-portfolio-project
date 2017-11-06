module RestaurantHelper
  def has_reviews(restaurant)
    !restaurant.reviews.empty? ? true : false
  end

  def restuarant_owner(restaurant)
    owner = restaurant.users.where(admin: true).first
    owner == current_user ? true : false
  end

  def add_date_to_review(restaurant)
    first_review = restaurant.reviews.first
    first_review.date = Date.today
    first_review.save
  end

end
