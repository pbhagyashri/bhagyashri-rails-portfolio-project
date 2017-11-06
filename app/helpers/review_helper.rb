module ReviewHelper

  def valid_user?(review)
    review.user_id == current_user.id ? true : false
  end

end
