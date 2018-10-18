class TasksController < ApplicationController
  # before_action :doorkeeper_authorize!
  before_action :set_task, only: [:show, :edit]
  skip_before_action :verify_authenticity_token

  def index
    @tasks = current_user.tasks
    # @task = Task.new
    render json: @tasks
  end

  def show; end

  def new
    @task = Task.new
  end

  def edit; end

  def create
    @task = current_user.tasks.create(task_params)
    respond_to do |format|
      format.html {redirect_to tasks_path}
      format.json {render :show, status: :created, location: @task}
    end
  end

  def destroy
    @tasks = current_user.tasks
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    render json: @tasks
  end

  def update
    @task = current_user.tasks.find(params[:id])
    @task.update(task_params)
    render json: @task, status: :ok
  end

  def destroy_multiple
    Task.destroy(params[:ids])
    render json: current_user.tasks
  end

  def task_params
    data = JSON.parse(request.body.read)
    params = ActionController::Parameters.new(task: data)
    params.require(:task).permit(:title, :body, :priority, :date_task, :status)
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end
end
