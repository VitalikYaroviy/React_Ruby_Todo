require 'rails_helper'
require 'spec_helper'

RSpec.describe TasksController, type: :controller do

  let(:user) { create(:user) }
  before do
    login_user(user)
  end

  include_context :doorkeeper_app_with_token

  let(:request_params) { { access_token: access_token.token } }

  context 'action index' do
    it 'returns tasks []' do
      get :index, params: request_params
      expect(response).to render_template(nil)
    end

    it 'ok' do
      get :index, params: request_params
      expect(response.status).to eq(200)
    end
  end

  context 'action create' do

    it { expect { post :create, params: { task: create(:task) }, as: :json }.to change(Task, :count).by(1) }

    it 'create ok' do
      post :create, params: { task: create(:task) }, as: :json
      expect(response.status).to eq(201)
    end

    it { expect { post :create, params: { task: { title: nil } }, as: :json }.to_not change(Task, :count) }
  end

  let!(:task) { create(:task, title: 'title1', user_id: user.id) }

  context 'action destroy' do
    it 'removes task' do
      expect { delete :destroy, params: { id: task.id }, as: :json }.to change(Task, :count).by(-1)
    end

    it 'delete ok' do
      delete :destroy, params: { id: task.id }, as: :json
      expect(response.status).to eq(200)
    end
  end

  context 'action update' do

    it 'changes task new title' do
      put :update, params: { id: task, title: 'title2' }, as: :json
      task.reload
      expect(task.title).to eq('title2')
    end
  end

  context do
    it 'method destroy_multiple' do
      task = create(:task, user_id: user.id)
      expect { delete :destroy_multiple, params: { ids: task.id }, as: :json }.to change(Task, :count).by(-1)
    end
  end
end
