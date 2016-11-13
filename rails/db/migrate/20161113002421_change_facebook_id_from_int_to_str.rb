class ChangeFacebookIdFromIntToStr < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :facebook_id, :integer
    add_column :users, :facebook_id, :string
  end
end
