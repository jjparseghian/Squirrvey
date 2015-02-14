class User < ActiveRecord::Base
  has_secure_password
  # Remember to create a migration!
  has_many :surveys
  has_many :user_answers
  has_many :answers, through: :user_answers
end
