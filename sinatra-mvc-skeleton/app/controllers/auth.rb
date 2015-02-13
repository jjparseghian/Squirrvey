get '/signup' do
  erb :"user_auth/signup"
end

post '/signup' do
  @new_user = User.new(params[:user])
  if @new_user.save
    session[:user_id] = @new_user.id
    redirect '/'
  else
    puts "This is an error message"
  end
end

get '/login' do
  erb :"user_auth/login"
end

post '/login' do
 @user = User.find_by(params[:id])
 if @user
  session[:user_id] = @user.id
  erb :'user_auth/logged_in'
 else
  puts "This is an error message"
 end
end

delete '/logout' do
  session.clear
  redirect '/'
end
