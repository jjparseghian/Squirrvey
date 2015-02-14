require 'json'

get '/survey/new' do
  erb :survey_new
end

post '/survey/new.json' do
  p params

  args = JSON.parse(params);
  p args
end

