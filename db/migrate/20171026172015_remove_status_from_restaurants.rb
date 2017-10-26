class RemoveStatusFromRestaurants < ActiveRecord::Migration[5.0]
  def change
    remove_column :restaurants, :status, :boolean
  end
end
