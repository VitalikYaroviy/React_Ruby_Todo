module AccessTokenHelper
  APP_NAME = "app name".freeze
  REDIRECT_URL =  "https://localhost:3000/oauth/callback".freeze

  def token_scopes(scopes)
    app = Doorkeeper::Application.create!(:name => "MyApp", :redirect_uri => REDIRECT_URL)
    user = create(:user)
    Doorkeeper::AccessToken.create!(:application_id => app.id, :resource_owner_id => user.id, scopes: scopes)
  end
end
