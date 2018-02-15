class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :admin, :uid
  has_many :restaurants, serializer: ReviewSerializer
end
