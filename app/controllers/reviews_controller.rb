class ReviewsController < ApplicationController

  before_action :set_review, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required, only: [:new, :create, :destroy, :update, :edit]

  def create
    if !is_admin?
      @restaurant = Restaurant.find_by(id: params[:review][:restaurant_id])
      @review = @restaurant.reviews.build(review_params)
      @review.date = Date.today
      @restaurant.save
      redirect_to root_path
    end
  end

  def edit

  end

  def update
    if @review.user_id == current_user.id
      if @review.update(review_params)
        redirect_to root_path
      else
        render :edit
      end
    end
  end

  def destroy
    if !is_admin?
      @review.destroy
      redirect_to root_path
    end
  end

  private

  def review_params
    params.require(:review).permit(:taste_rating, :health_rating, :cleanliness_rating, :description, :date, :status, :restaurant_id, :user_id)
  end

  def set_review
    @review = Review.find_by(id: params[:id])
  end


end
