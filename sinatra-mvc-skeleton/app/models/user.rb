class User < ActiveRecord::Base
  has_secure_password

  has_many :surveys
  has_many :user_answers
  has_many :answers, through: :user_answers

  validates :email, {:uniqueness => true};
end
