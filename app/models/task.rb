class Task < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: { minimum: 1 }
end
