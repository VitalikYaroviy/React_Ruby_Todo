class User < ApplicationRecord
  has_many :oauth_applications, class_name: 'Doorkeeper::Application', as: :owner
  has_secure_password
  validates :email, presence: true
  has_many :access_grants, class_name: "Doorkeeper::AccessGrant",
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks

  has_many :access_tokens, class_name: "Doorkeeper::AccessToken",
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks
  has_many :tasks
end
