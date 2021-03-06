class RestaurantsController < ApplicationController

  before_action :set_restaurant, only: [:edit, :show, :destroy, :update, :next]
  before_action :authentication_required, only: [:new, :show, :create, :destroy, :update, :edit]

  include RestaurantHelper

  def index
     
    if params[:user_id]
      user = User.find(params[:user_id])
      @restaurants = user.restaurants
      @is_admin = is_admin?.to_s
      render json: @restaurants
    else
      @restaurants = Restaurant.all
      @is_admin = is_admin?.to_s
      respond_to do |f|
        f.html
        f.json {render json: @restaurants}
      end
    end
    
  end

  def new
    @restaurant = Restaurant.new
    @review = @restaurant.reviews.build
    respond_to do |f|
      f.json {render json: @review}
      f.html
    end
  end

  def create
    if is_admin?
      @restaurant = Restaurant.find_by(name: params[:restaurant][:name], location: params[:restaurant][:location])

      if !!@restaurant
        flash[:message] = "Sorry Restaurant already exists"
      else
        @restaurant = Restaurant.create(restaurant_params)
        add_date_to_review(@restaurant)
        @restaurant.save
      end
    else
      flash[:message] = "Sorry you need an admin account to add a Restaurant"
    end
    redirect_to root_path
  end

  def show
    @review = Review.new

    respond_to do |f|
      f.json {render json: @restaurant}
      f.html
    end
  end

  def edit

  end

  def update

    if is_admin? && restuarant_owner(@restaurant)
      if @restaurant.update(restaurant_params)
        redirect_to restaurant_path(@restaurant)
      else
        render :new
      end
    end

  end

  def destroy
  
    if is_admin? && restuarant_owner(@restaurant)
      @restaurant.destroy
      redirect_to root_path
    end
  end
  
  def next
    @next_restaurant = @restaurant.next
    render json: @next_restaurant
  end
  
  protected

  def restaurant_params
    params.require(:restaurant).permit(:name, :location, :cuisine, :reviews_attributes => [:taste_rating, :health_rating, :cleanliness_rating, :description, :date, :status, :user_id, :restaurant_id, :fullname])
  end

  def set_restaurant
    @restaurant = Restaurant.all.find_by(id: params[:id])
  end

end
