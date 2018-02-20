class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin
  
  has_many :reviews
  has_many :restaurants, through: :reviews
  
end
