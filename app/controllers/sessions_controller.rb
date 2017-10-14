class SessionsController < ApplicationController
  def new

  end

  def create
    @user = User.find_by(email: params[:email])
    return head(:forbidden) unless @user.authenticate(params[:password])
    session[:user_id] = @user.id
  end

  def destroy
    session.clear
    redirect_to root_path
  end
end
