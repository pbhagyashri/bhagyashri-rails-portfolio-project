module RestaurantHelper
  def has_reviews(restaurant)
    !restaurant.reviews.empty? ? true : false
  end

  def status_true
    Restaurant.select{|restaurant| restaurant if restaurant.status == true}
  end
end
