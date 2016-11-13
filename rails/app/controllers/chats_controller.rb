class ChatsController < ApplicationController

  # get all messages affilitated with this chat
  def show
    @chat = Chat.where(user_1: chat_params[:user_1], user_2: chat_params[:user_2])
    unless @chat
      @chat = Chat.where(user_1: chat_params[:user_2], user_2: chat_params[:user_1])
    end
    if @chat
      @messages = @chat.messages.sort_by(&:created_at)
      @full_message_metadata = Array.new()
      @messages.each do |message|
        metadata = Hash.new
        metadata['message'] = message.message
        metadata['sender'] = message.sender
        metadata['timestamp'] = message.created_at
        @full_message_metadata.push(metadata)
      end
      render json: {
        data: @full_message_metadata
      }.to_json
    else
      render json: {
        error: "Chat does not exist"
      }.to_json
    end
  end

  def new_messages
    @chat = Chat.find(params[:id])
    requester_id = params[:user_id]
    user_1 = @chat.user_1
    user_2 = @chat.user_2
    if requester_id == user_1
      sender_id = user_2
    else
      sender_id = user_1
    end

    @new_messages = @chat.messages.where(sender: sender_id).where('created_at > :now', now: env[:timestamp] - 5.seconds)
    # @new_messages = @chat.messages.where(now: env[:timestamp] - 5.seconds)
    # @new_messages = @chat.messages.where('created_at > :now', now: Time.now)
    if @new_messages.length > 0
      puts @new_messages.first
    end
    render json: { messages: @new_messages }
  end

  def create
    # TODO: Add matching
    @chat = Chat.find_or_create_by(user_1: 1, user_2: 2)
    @chat.save!
    render json: @chat
  end

  # save new messages to under this chat
  def update
    Message.create(sender: save_message_params[:user], message: save_message_params[:message],
      chat_id: save_message_params[:chat])
  end

  private
  def chat_params
    params.require(:chat).permit(:user_1, :user_2)
  end

  def save_message_params
    params.require(:chat, :message, :user)
  end
end
