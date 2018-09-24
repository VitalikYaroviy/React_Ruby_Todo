class UserMailer < ActionMailer::Base
  default :from => "noreply@mydomin.com"
  def registration_confirmation(user)
    @user = user
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Please confirm your registration")
  end
end
