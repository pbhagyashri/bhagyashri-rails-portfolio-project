class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :admin, :uid
  
  has_many :reviews
  has_many :restaurants, through: :reviews
  
end
