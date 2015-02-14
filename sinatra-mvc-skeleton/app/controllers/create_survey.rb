require 'json'

get '/surveys/new' do
  erb :survey_new
end

post '/surveys/new.json' do
  p params

  args = JSON.parse(params["survey"]);
  survey = createFromJson(args);
  p survey
  {survey_id:survey.id}.to_json
end

