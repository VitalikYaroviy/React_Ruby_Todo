class UserController < ApplicationController
  skip_before_action :doorkeeper_authorize!, [:new, :create], :raise => false

  def create
    @user = User.new(user_params)
    if @user.save
      @origin = request.headers['host']
      UserMailer.registration_confirmation(@user, @origin).deliver
      if @user.email_confirmed
        session[:user_id] = @user.id
        render json: @user, status: :ok
      end
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessed_entity
    end
  end

  def confirm_email
    user = User.find(params[:id])
    user.email_activate if user.confirm_token
    render status: :ok
  end

  private

  def user_params
    params = ActionController::Parameters.new(user: JSON.parse(request.body.read || '{}'))
    params.require(:user).permit(:name, :last_name, :email, :password)
  end
end
