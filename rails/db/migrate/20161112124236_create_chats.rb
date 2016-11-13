class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats do |t|
      t.integer :user_1
      t.integer :user_2

      t.timestamps
    end
  end
end
