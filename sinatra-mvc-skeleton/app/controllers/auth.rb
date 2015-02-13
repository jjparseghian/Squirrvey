get '/signup' do
  erb :"user_auth/signup"
end

post '/signup' do
  @new_user = User.new(params[:user])
  if @new_user.save
    session[:user_id] = @new_user.id
    redirect '/'
  else
    erb :"user_auth/not_authorized"
  end
end

get '/login' do
  erb :"user_auth/login"
end

post '/login' do
  p params
 @user = User.find_by(name: params[:user][:name])
 if @user.try(:authenticate, params[:user][:password])
  session[:user_id] = @user.id
  erb :'user_auth/logged_in'
 else
  erb :"user_auth/not_authorized"
 end
end

delete '/logout' do
  session.clear
  redirect '/'
end
