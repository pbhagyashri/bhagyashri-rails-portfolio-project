class AddFullnameToReviews < ActiveRecord::Migration[5.0]
  def change
    add_column :reviews, :fullname, :string
  end
end
