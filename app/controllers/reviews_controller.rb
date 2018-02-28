class ReviewsController < ApplicationController

  before_action :set_review, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required, only: [:new, :create, :destroy, :update, :edit]

  include ReviewHelper

  def create
   
    @restaurant = Restaurant.find_by(id: params[:review][:restaurant_id])
    @review = @restaurant.reviews.build(review_params)
    @review.date = Date.today
    @restaurant.save
  
    render json: @review
  end

  def edit
    
  end

  def update
    
    if !valid_user?(@review)
      flash[:message] = "Sorry, You can only edit your own review"
      render :edit
    else
      if @review.update(review_params)
        redirect_to root_path
      else
        render :edit
      end
    end
  end

  def destroy
    if valid_user?(@review)
      @review.destroy
      redirect_to root_path
    end
  end

  private

  def review_params
    params.require(:review).permit(:taste_rating, :health_rating, :cleanliness_rating, :description, :date, :status, :restaurant_id, :user_id, :fullname)
  end

  def set_review
    @review = Review.find_by(id: params[:id])
  end


end
