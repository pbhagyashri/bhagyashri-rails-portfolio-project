class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :cuisine
  
  has_many :users, serializer: ReviewSerializer
end
