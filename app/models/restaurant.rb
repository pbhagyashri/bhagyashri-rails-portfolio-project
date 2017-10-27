class Restaurant < ApplicationRecord

  has_many :reviews
  has_many :users, through: :reviews

  validates :name, :presence => true
  validates :location, :presence => true
  validates :cuisine, :presence => true

  def reviews_attributes=(reviews_attributes)
    reviews_attributes.each do |i, review_attributes|
      self.reviews.build(review_attributes)
    end
  end

  def self.tastiest_restuarants
    self.all.select do |restaurant|
      restaurant.name if restaurant.reviews.any?{|review| review.taste_rating == 5}
    end
  end

  def self.healthies_restuarants
    self.all.select do |restaurant|
      restaurant if restaurant.reviews.any?{|review| review.health_rating >= 4}
    end
  end

end
