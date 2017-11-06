module RestaurantHelper
  def has_reviews(restaurant)
    !restaurant.reviews.empty? ? true : false
  end

  def restuarant_owner(restaurant)
    owner = restaurant.users.where(admin: true).first
    owner == current_user ? true : false
  end

end
