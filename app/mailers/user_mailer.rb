class UserMailer < ActionMailer::Base
  default :from => "noreply@mydomin.com"
  def registration_confirmation(user, origin)
    @user = user
    @origin = origin
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Please confirm your registration")
  end
end
