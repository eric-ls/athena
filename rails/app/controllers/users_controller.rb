require 'json'
class UsersController < ApplicationController
  def show
    @user = User.find_or_create_by(user_params)
    respond_to do |format|
      format.json { render json: @user }
    end
  end

  def create
    @user = User.find_or_create_by(user_params)
    respond_to do |format|
      format.json { render json: @user }
    end
  end

  def set_political_leaning
    @user = User.find(set_political_params[:id])
    @user.update(set_political_params) # may need to change political_leaning back to floating point value
  end

  def set_interested_topics
    @user = User.find(params[:id])
    @interested_topics = params[:topics]
    @user.topics = Topic.where(name: @interested_topics)
    @user.save
    respond_to do |format|
      format.json { render json: get_match(@user) }
    end
  end

  # TODO: shuffle and choose random person
  def get_match(curr_user)
    political_diff = 0
    chosen_user = nil
    topic_chosen = nil
    data = {}
    curr_user.topics.each do |topic|
      topic.users.each do |user|
        curr_political_diff = (curr_user.political_leaning - user.political_leaning).abs
        if chosen_user.nil?
          chosen_user = user
          political_diff = curr_political_diff
          topic_chosen = topic
        elsif curr_political_diff > political_diff
          chosen_user = user
          political_diff = curr_political_diff
          topic_chosen = topic
        end
      end
    end
    data[:match] = chosen_user
    data[:topic_chosen] = topic_chosen
    return data
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :img_path, :token, :facebook_id, :political_leaning)
  end

  def set_political_params
    params.require(:user).permit(:id, :political_leaning)
  end
end
