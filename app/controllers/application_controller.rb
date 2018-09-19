class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::MimeResponds
  protect_from_forgery except: :create

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  helper_method :current_user

  def doorkeeper_unauthorized_render_options(error: nil)
    { json: { error: "Not authorized" } }
  end
end
