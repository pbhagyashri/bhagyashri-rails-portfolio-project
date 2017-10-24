module RestaurantHelper
  def has_reviews(restaurant)
    !restaurant.reviews.empty? ? true : false
  end

  def restaurant_with_true_status
    Restaurant.where(status: true)
  end

  def selected_restaurant(restaurant)
    restaurant_with_true_status.find_by(name: restaurant.name)
  end

end
