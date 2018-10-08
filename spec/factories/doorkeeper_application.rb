require 'doorkeeper/orm/active_record/application'
FactoryBot.define do
  factory :doorkeeper_application, class: Doorkeeper::Application do
    name         { Faker::App.name }
    redirect_uri { 'https://application.com' }
  end
end
