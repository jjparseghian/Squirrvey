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

#submit answers to survey
post '/surveys/:id' do |id|
  user_answer = UserAnswers.create(params[:userAnswers])
  p "*" * 40
    p params
  p "*" * 40

end
