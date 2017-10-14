Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  #resources :users, only: [:new, :create]
  resources :restaurants
  resources :reviews

  get 'signup' => 'users#new', as: :register
  post 'users/create' => 'users#create', as: :users

  get 'signin' => 'sessions#new', as: :login
  post 'sessions/create' => 'sessions#create', as: :sessions

end
