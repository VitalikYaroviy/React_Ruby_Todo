class User < ApplicationRecord
  has_many :oauth_applications, class_name: 'Doorkeeper::Application', as: :owner
  has_secure_password
  before_create :confirmation_token
  validates :email, presence: true
  has_many :access_grants, class_name: "Doorkeeper::AccessGrant", foreign_key: :resource_owner_id, dependent: :delete_all

  has_many :access_tokens, class_name: "Doorkeeper::AccessToken", foreign_key: :resource_owner_id, dependent: :delete_all
  has_many :tasks
  after_create :send_token_email

  def email_activate
    self.email_confirmed = true
    self.confirm_token = nil
    save!(:validate => false)
  end

  private

  def confirmation_token
    self.confirm_token = SecureRandom.base64.to_s if self.confirm_token.blank?
  end

  def send_token_email
    UserMailer.registration_confirmation(self, HOST).deliver
  end

end
