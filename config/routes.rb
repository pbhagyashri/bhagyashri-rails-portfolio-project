Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'restaurants#index'
  #resources :users, only: [:new, :create]
  resources :restaurants, only: [:show, :new, :create, :edit, :update]
  # delete 'restaurant/:id', to: 'restaurant#destroy'
  resources :reviews

  get 'signup' => 'users#new', as: :signup
  post 'users' => 'users#create', as: :users

  get '/auth/facebook/callback' => 'sessions#create'

  get 'login' => 'sessions#new', as: :login
  post 'sessions' => 'sessions#create', as: :sessions
  get 'logout' => 'sessions#destroy'

  resources :restaurants, only: [:show] do
    resources :reviews, only: [:index, :show]
  end

  resources :users do
    resources :restaurants
  end

end
