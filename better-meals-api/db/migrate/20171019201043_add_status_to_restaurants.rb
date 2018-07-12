class AddStatusToRestaurants < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurants, :status, :boolean, :default => false
  end
end
