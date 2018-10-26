require 'rails_helper'
require 'spec_helper'

RSpec.describe TasksController, type: :controller do

  include_context :doorkeeper_app_with_token

  let(:user) { create(:user) }
  before do
    login_user(user)
  end

  let(:task) { create(:task, user: user) }

  let(:request_params) { { access_token: access_token.token } }

  describe 'GET /api/tasks' do
    include_context :doorkeeper_app_with_token
    let!(:task_1) { create(:task, user: user) }

    before do
      get :index, params: { access_token: access_token.token }
    end

    it 'retrives all tasks' do
      expect(JSON.parse(response.body)).to eq([{'id' => task_1.id, 'title' => task_1.title, 'body' => task_1.body, 'priority' => task_1.priority, 'status' => task_1.status, 'date_task' => task_1.date_task.strftime("%Y-%m-%d"), 'created_at' => task_1.created_at.as_json, 'updated_at' => task_1.updated_at.as_json, 'user_id' => task_1.user_id}])
    end

  end

  describe 'POST /api/tasks' do
    include_context :doorkeeper_app_with_token
    let(:date_task) { Date.tomorrow.to_s }
    let(:request_params) {
      {
          access_token: access_token.token,
          task: {
              title: 'Title',
              body: 'Description',
              priority: 5,
              date_task: date_task
          }
      }
    }

    before do
      post :create, params: request_params
    end

    it {
      task = user.tasks.last
      expect(JSON.parse(response.body)).to eq({'id' => task.id, 'title' => 'Title', 'body' => 'Description', 'priority' => 5, 'status' => 0, 'date_task' => Date.parse(date_task).strftime("%Y-%m-%d"), 'created_at' => task.created_at.as_json, 'updated_at' => task.updated_at.as_json, 'user_id' => task.user_id})
    }
  end

  describe 'PATCH /api/tasks/:id' do
    include_context :doorkeeper_app_with_token
    let(:task) { create(:task, user: user) }
    let(:request_params) {
      {
          access_token: access_token.token,
          task: {title: 'title'},
          id: task.id
      }
    }

    before do
      put :update, params: request_params
      task.reload
    end

    it { expect(task.title).to eq('title') }
  end

  describe 'DELETE /api/tasks/:id' do
    include_context :doorkeeper_app_with_token
    let!(:task) { create(:task, user: user) }
    let(:request_params) {
      {
          access_token: access_token.token,
          id: task.id
      }
    }

    it {expect {delete :destroy, params: request_params}.to change{ user.tasks.count }.from(1).to(0)}
  end

  context do
    it 'method destroy_multiple' do
      task = create(:task, user_id: user.id)
      expect { delete :destroy_multiple, params: { ids: task.id, access_token: access_token.token }}.to change(Task, :count).by(-1)
    end
  end
end
