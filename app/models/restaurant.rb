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

  def self.top_five_restaurants

  end

end
