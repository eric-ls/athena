class RenameUsersTopics < ActiveRecord::Migration[5.0]
  def self.up
    rename_table :users_topics, :topics_users
  end

  def self.down
    rename_table :topics_users, :users_topics
  end
end
