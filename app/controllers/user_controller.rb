class UserController < ApplicationController

  skip_before_action :doorkeeper_authorize!, [:new, :create], :raise => false

  def index
    user = current_user
    user ||= User.find(doorkeeper_token[:resource_owner_id]) if doorkeeper_token
  end

  def new
    @user = User.new
  end

  def show
    render json: current_resource_owner.as_json
  end

  def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.registration_confirmation(@user).deliver
      if @user.email_confirmed
        session[:user_id] = @user.id
        render json: @user,
               status: :ok
      end
    else
      render json: {errors: @user.errors.full_messages},
             status: :unprocessed_entity
    end
  end

  def confirm_email
    user = User.find_by_confirm_token(params[:id])
    if user.confirm_token
      user.email_activate
    end
  end

  private

  def current_resource_owner
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  def user_params
    params = ActionController::Parameters.new(user: JSON.parse(request.body.read || '{}'))
    params.require(:user).permit(:name, :last_name, :email, :password)
  end

end
