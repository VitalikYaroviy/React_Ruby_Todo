FactoryBot.define do
  factory :user do
    name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    email_confirmed { true }
    password_digest { 'example' }
  end
  factory :authenticated_user, parent: :user do
    access_token factory: :access_token
  end
end
