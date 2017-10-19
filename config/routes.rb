Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  #resources :users, only: [:new, :create]
  resources :restaurants
  delete 'restaurant/:id', to: 'restaurant#destroy'
  resources :reviews

  get 'signup' => 'users#new', as: :signup
  post 'users' => 'users#create', as: :users

  get '/auth/facebook/callback' => 'sessions#create'

  get 'login' => 'sessions#new', as: :login
  post 'sessions' => 'sessions#create', as: :sessions
  get 'logout' => 'sessions#destroy'


end
