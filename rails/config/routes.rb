Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :messages
  resources :chats

  resources :users do
    resources :chats do
      member do
        get 'new_messages'
      end
    end
  end
  resources :users

  post '/users/set_political_leaning', to: 'users#set_political_leaning'
  post '/users/set_topic_and_get_match', to: 'users#set_topic_and_get_match'
end
