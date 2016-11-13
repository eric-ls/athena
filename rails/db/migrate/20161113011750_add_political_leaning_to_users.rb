class AddPoliticalLeaningToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :political_leaning, :float
  end
end
