class Restaurant < ApplicationRecord

  has_many :reviews
  has_many :users, through: :reviews

  def reviews_attributes=(reviews_attributes)
    reviews_attributes.each do |i, review_attributes|
      self.reviews.build(review_attributes)
    end
  end

end
