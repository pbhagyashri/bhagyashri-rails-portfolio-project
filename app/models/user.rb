class User < ApplicationRecord

  has_many :reviews
  has_many :restaurants, through: :reviews

  validates :email, :presence => true
  validates :email, :uniqueness => true
  validates :username, :presence => true
  # validates :username, :uniqueness => true

  has_secure_password

end
