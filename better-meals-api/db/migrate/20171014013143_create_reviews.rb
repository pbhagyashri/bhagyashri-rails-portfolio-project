class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.integer :taste_rating
      t.integer :health_rating
      t.integer :cleanliness_rating
      t.text :description
      t.date :date
      t.integer :restaurant_id
      t.integer :user_id

      t.timestamps
    end
  end
end
