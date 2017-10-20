module RestaurantHelper
  def has_reviews(restaurant)
    !restaurant.reviews.empty? ? true : false
  end

  def restaurant_with_true_status
    Restaurant.all.select{ |restaurant| restaurant if restaurant.status == true}
  end


  # def find_by_restaurant_name(array, name)
  #   array.find{ |restaurant| restaurant if restaurant.name == name }
  # end

  # def final_list
  #   all_restaurants = []
  #
  #   restaurant_with_true_status.each do |restaurant|
  #
  #     existing_restaurant = find_by_restaurant_name(all_restaurants, restaurant)
  #
  #     if existing_restaurant.nil? && !all_restaurants.include?(existing_restaurant)
  #       all_restaurants << restaurant
  #     else
  #       existing_restaurant.reviews << restaurant.reviews
  #       existing_restaurant.save
  #       restaurant.destroy
  #     end
  #
  #   end
  #
  #   all_restaurants
  #
  # end

end
