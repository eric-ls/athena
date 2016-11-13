# may not need this class.
class MessagesController < ApplicationController

  def show
    @message = Message.find(params)
  end

  def create
    @message = Message.new(message_params)
    @message.save!
    render json: @message
  end

  private
  def message_params
    params.require(:message).permit(:sender, :message, :chat_id)
  end
end
