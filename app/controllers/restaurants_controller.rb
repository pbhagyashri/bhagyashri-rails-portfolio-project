class RestaurantsController < ApplicationController

  before_action :set_restaurant, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required, only: [:new, :show, :create, :destroy, :update, :edit]

  include RestaurantHelper


  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @restaurants = @user.restaurants
    else
      @restaurants = Restaurant.all
    end
  end

  def new
    @restaurant = Restaurant.new
    @review = @restaurant.reviews.build
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      redirect_to root_path
    end
  end

  def show
    @review = Review.new
  end

  def edit
    if current_user
      if has_reviews(@restaurant)
        @review = Review.find_by(restaurant_id: @restaurant.id)
      else
        @review = @restaurant.reviews.build
      end
    else
      flash[:message] = "You can only edit restaurants that you have created"
    end

  end


  def update
    @restaurant.reviews.destroy_all

    if @restaurant.update(restaurant_params)
      redirect_to restaurant_path(@restaurant)
    else
      render :new
    end

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
    @restaurant = Restaurant.all.find_by(id: params[:id])
  end

end
