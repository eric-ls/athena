class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user.to_json
  end

  def create
    @user = User.new(user_params)
    @user.save
  end

  private
  def user_params
    params.require(:user).permit(:fist_name, :last_name, :email, :img_path, :token)
  end
end
