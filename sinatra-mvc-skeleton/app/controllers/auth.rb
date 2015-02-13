get '/signup' do
  erb :"user_auth/signup"
end

post '/signup' do
  p params
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
 p params
 @user = User.find_by(params[:id])
 if @user
  session[:user_id] = @user.id
  redirect '/'
 else
  puts "This is an error message"
 end
end
