class RestaurantsController < ApplicationController

  before_action :set_restaurant, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required

  include RestaurantHelper


  def index
    @restaurants = Restaurant.all
  end

  def new
    @restaurant = Restaurant.new
    @review = @restaurant.reviews.build
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.status = true if params[:restaurant][:status] = "true"
    if @restaurant.save
      redirect_to restaurants_path
    else
      render :new
    end
  end

  def show
    @review = Review.new
  end

  def edit
    if has_reviews(@restaurant)
      @review = Review.find_by(restaurant_id: @restaurant.id)
    else
      @review = @restaurant.reviews.build
    end
  end


  def update

    @restaurant.reviews.destroy_all
    @restaurant.update(restaurant_params)
    @restaurant.status = true if params[:restaurant][:status] = "true"
    @restaurant.save

    redirect_to restaurant_path(@restaurant)
  end

  def destroy
    @restaurant.destroy
    redirect_to restaurants_path
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :location, :cuisine, :reviews_attributes => [:taste_rating, :health_rating, :cleanliness_rating, :description, :date, :status, :user_id, :restaurant_id])
  end

  def set_restaurant
    @restaurant = Restaurant.find_by(id: params[:id])
  end

end
