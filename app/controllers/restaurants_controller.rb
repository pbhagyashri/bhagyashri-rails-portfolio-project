class RestaurantsController < ApplicationController

  before_action :set_restaurant, only: [:edit, :show, :destroy, :update]

  def index
    @restaurants = Restaurant.all
  end

  def new
    @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.save
    redirect_to restaurants_path
  end

  def edit

  end

  def update
    @restaurant.update(restaurant_params)
    redirect_to restaurant_path(@restaurant)
  end

  def destroy

  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :location, :cuisine)
  end

  def set_restaurant
    @restaurant = Restaurant.find_by(id: params[:id])
  end

end
