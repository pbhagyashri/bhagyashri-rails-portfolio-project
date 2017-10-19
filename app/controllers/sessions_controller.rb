class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    if !!auth
      @user = User.find_or_create_by(uid: auth['uid']) do |u|
        u.email = auth['info']['email']
        u.password = SecureRandom.hex
      end
      session[:user_id] = @user.id
      render 'welcome/index'
    else
      @user = User.find_by(email: params[:email])

      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        flash[:message] = "You are logged in successfully"
        redirect_to root_path
      else
        flash[:message] = "Invalid Email or Password."
        render :new
      end

    end

  end

  def destroy
    session.clear
    redirect_to root_path
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
