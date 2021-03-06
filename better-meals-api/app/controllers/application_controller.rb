class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :authentication_required, :is_admin?

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def is_admin?
    current_user.admin == true ? true : false if current_user
  end

  def logged_in?
    !!session[:user_id]
  end

  def authentication_required
    if !logged_in?
      redirect_to login_path
    end
  end
end
