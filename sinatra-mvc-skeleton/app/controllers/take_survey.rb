#list all surveys
get '/surveys/all' do
  @surveys = Survey.all
  # if current_user
    erb :'survey/all'
  # else
    # redirect '/login'
  # end
end

#show single survey
get '/surveys/:id' do |id|
  @survey = Survey.find(id)
  # if current_user
    erb :'survey/show'
  # else
    # redirect '/login'
  # end

end

post '/surveys/:id' do |id|
  (auth: :user)

  params.each do |key,value|
    if key.include? 'answer_id'
      user_answer_map = {user_id: current_user.id, answer_id: value}
      user_answer = UserAnswers.create(user_answer_map)
    end
   end
  redirect "/surveys/all"
end
