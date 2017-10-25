class ReviewsController < ApplicationController
  def create
    binding.pry
    @restaurant = Restaurant.find_by(id: params[:review][:restaurant_id])
    #@restaurant.reviews.build(review_params)
    @review = Review.create(review_params)

    @review.save
    @restaurant.reviews << @review
    @restaurant.save
    # @review = Review.create(review_params)
    redirect_to root_path
  end

  def review_params
    params.require(:review).permit(:taste_rating, :health_rating, :cleanliness_rating, :description, :date, :status, :restaurant_id, :user_id)
  end
end
