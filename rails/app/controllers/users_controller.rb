class UsersController < ApplicationController
  def show
    @user = User.find_or_create_by(user_params)
    render json: @user.to_json
  end

  def create
    @user = User.find_or_create_by(user_params)
    respond_to do |format|
      format.json { render json: @user }
    end
  end


  private
  def user_params
    params.require(:user).permit(:fist_name, :last_name, :email, :img_path, :token, :facebook_id)
  end
end
