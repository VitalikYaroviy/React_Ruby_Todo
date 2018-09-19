class TasksController < ApplicationController

  # before_action :doorkeeper_authorize!
  before_action :set_task, only: [:show, :edit]
  skip_before_action :verify_authenticity_token

  def index
    @tasks = User.find(doorkeeper_token[:resource_owner_id]).tasks
    # @task = Task.new
    render json: @tasks
  end

  def show;
  end

  def new
    @task = Task.new
  end

  def edit;
  end

  def create
    @task = User.find(doorkeeper_token[:resource_owner_id]).tasks.create(task_params)
    respond_to do |format|
      format.html {redirect_to tasks_path}
      format.json {render :show, status: :created, location: @task}
    end
  end

  def destroy
    @tasks = User.find(doorkeeper_token[:resource_owner_id]).tasks
    @task = User.find(doorkeeper_token[:resource_owner_id]).tasks.find(params[:id])
    @task.destroy
    render json: @tasks
  end

  def update
    @post = User.find(doorkeeper_token[:resource_owner_id]).tasks.find(params[:id])
    @posts = User.find(doorkeeper_token[:resource_owner_id]).tasks
    @post.update(task_params)
    render json: @posts
  end

  def destroy_multiple
    Task.destroy(params[:ids])
    render json: User.find(doorkeeper_token[:resource_owner_id]).tasks
  end

  def task_params
    data = JSON.parse(request.body.read)
    params = ActionController::Parameters.new(task: data)
    params.require(:task).permit(:title, :body, :priority, :date_task)
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

end
