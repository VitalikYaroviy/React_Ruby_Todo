class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::MimeResponds

  protect_from_forgery except: :create

  helper_method :current_user

  def current_user
    @current_user ||= User.find(doorkeeper_token[:resource_owner_id])
  end

  def doorkeeper_unauthorized_render_options(error: nil)
    { json: { error: "Not authorized" } }
  end
end
