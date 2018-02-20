class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :taste_rating, :health_rating, :cleanliness_rating, :description, :date, :user_id, :restaurant_id
  
  belongs_to :restaurant
  belongs_to :user, serializer: UserLessdetailedSerializer

end
