require 'json'
class ChatsController < ApplicationController

  # get all messages affilitated with this chat
  def show
  end

  def new_messages
    @chat = Chat.find(params[:id])
    requester_id = params[:user_id].to_i
    user_1 = @chat.user_1
    user_2 = @chat.user_2
    if requester_id == user_1
      sender_id = user_2
    else
      sender_id = user_1
    end

    puts @chat
    puts sender_id

    @messages = @chat.messages.where(sender: sender_id).where('created_at > :now', now: env[:timestamp] - 5.seconds)

    @full_message_metadata = Array.new()
    @messages.each do |message|
      puts "======="
      print message.inspect
      @user = User.find(message.sender)
      metadata = Hash.new
      metadata['_id'] = message.id
      metadata['text'] = message.message
      metadata['created_at'] = message.created_at
      metadata['user'] =  {
        "_id" => message.sender,
        name: @user.first_name,
        avatar: @user.img_path
      }
      @full_message_metadata.push(metadata)
    end


    render json: { messages: @full_message_metadata }
  end


  def create
    @chat = Chat.where(user_1: chat_params[:user_1], user_2: chat_params[:user_2])
    unless @chat.size > 0
      @chat = Chat.where(user_1: chat_params[:user_2], user_2: chat_params[:user_1])
    end
    @chat = @chat.first
    if @chat
      @messages = @chat.messages.order('created_at DESC')
      @full_message_metadata = Array.new()
      @messages.each do |message|
        @user = User.find(message.sender)
        metadata = Hash.new
        metadata['_id'] = message.id
        metadata['text'] = message.message
        metadata['created_at'] = message.created_at
        metadata['user'] =  {
          "_id" => message.sender,
          name: @user.first_name,
          avatar: @user.img_path
        }
        @full_message_metadata.push(metadata)
      end
      render json: {'messages': @full_message_metadata, 'chat_id': @chat.id}
    else
      @chat = create_chat_from_id(chat_params[:user_1], chat_params[:user_2])
      render json: {'messages': 'None', 'chat_id': @chat.id}
    end
  end

  # save new messages to under this chat
  def update
    Message.create(sender: save_message_params[:user], message: save_message_params[:message],
      chat_id: save_message_params[:chat])
  end

  private
  def create_chat_from_id(user1, user2)
    Chat.create(user_1: user1, user_2: user2)
  end
  def chat_params
    params.require(:chat).permit(:user_1, :user_2)
  end

  def save_message_params
    params.require(:chat, :message, :user)
  end
end
