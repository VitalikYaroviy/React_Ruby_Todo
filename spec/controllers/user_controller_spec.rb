require 'rails_helper'

RSpec.describe UserController, type: :controller do
  let(:user) { build(:user) }
  describe '#create' do
    it {expect {post :create, params: { name: user.name, last_name: user.last_name, email: user.email, password: user.password_digest }, as: :json }.to change(User, :count).by(1) }
  end
end
