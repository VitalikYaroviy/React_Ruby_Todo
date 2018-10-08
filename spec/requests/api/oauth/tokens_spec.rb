require 'spec_helper'

describe 'POST /api/oauth/token' do
  include_context :doorkeeper_app_with_token

  context 'returns access token' do
    let(:password) { 'password' }
    let(:user) { create(:user, password: password) }
    let(:request_params) {
      {
          grant_type: 'password',
          username: user.email,
          password: password
      }
    }

    before do
      post '/api/oauth/token', params: request_params
    end

    it { expect(JSON.parse(response.body)['access_token']).to be }
    it { expect(JSON.parse(response.body)['token_type']).to eq 'Bearer' }
  end
end
