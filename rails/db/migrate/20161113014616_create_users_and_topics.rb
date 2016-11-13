class CreateUsersAndTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :users_topics, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :topic, index: true
    end
  end
end
