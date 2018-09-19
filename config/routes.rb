Rails.application.routes.draw do
  # use_doorkeeper do
  #   controllers :applications => 'oauth/applications'
  # end
  scope '/api' do
    use_doorkeeper
    resources :user
    resources :tasks
    get 'user', to: 'user#show'
    delete 'destroy_multiple' => 'tasks#destroy_multiple', :as => 'destroy_multiple'
  end

  scope 'auth' do
    use_doorkeeper scope: 'endpoint' do
      # Customize controllers
      controllers authorizations: 'custom_authorizations',
                  tokens: 'custom_authorizations',
                  applications: 'custom_authorizations',
                  token_info: 'custom_authorizations'

      as authorizations: 'custom_auth',
         tokens: 'custom_token',
         token_info: 'custom_token_info'
    end
  end
end
