class TasksController < ApplicationController
  # before_action :doorkeeper_authorize!
  before_action :set_task, only: [:show, :edit]
  skip_before_action :verify_authenticity_token

  def index
    @tasks = current_user.tasks
    render json: @tasks, status: :ok
  end

  def show; end

  def new
    @task = Task.new
  end

  def edit; end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    if @task.destroy
      head :no_content, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @task = current_user.tasks.find(params[:id])
    @task.update(task_params)
    render json: @task, status: :ok
  end

  def destroy_multiple
    Task.destroy(params[:ids])
    render json: current_user.tasks, status: :ok
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
