FactoryBot.define do
  factory :task do |f|
    f.title { Faker::Name.name }
    f.body { Faker::Name.name }
    f.priority { Faker::Number.between(1, 5) }
    f.date_task { Faker::Time.forward(23, :all) }
    f.user factory: :user
  end
  factory :invalid_task, parent: :task do |f|
    f.title { nil }
  end
end
