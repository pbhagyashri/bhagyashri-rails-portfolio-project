class ReviewsController < ApplicationController
  def create
      if !is_admin? and logged_in?
      @restaurant = Restaurant.find_by(id: params[:review][:restaurant_id])
      @review = @restaurant.reviews.build(review_params)
      @review.date = Date.today
      @restaurant.save
      redirect_to root_path
    end
  end

  def edit
    @review = Review.find_by(id: params[:id])
  end

  def update
    @review = Review.find_by(id: params[:id])
    if @review.update(review_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def review_params
    params.require(:review).permit(:taste_rating, :health_rating, :cleanliness_rating, :description, :date, :status, :restaurant_id, :user_id)
  end
end
