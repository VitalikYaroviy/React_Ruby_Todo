Rails.application.routes.draw do
  use_doorkeeper do
    controllers :applications => 'oauth/applications'
  end
  scope '/api' do
    resources :user
    get 'user', to: 'user#show'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
