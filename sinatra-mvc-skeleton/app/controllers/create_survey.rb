require 'json'

get '/surveys/new' do
  erb :survey_new
end

post '/surveys/new.json' do
  if current_user == nil
    return 403 #not authorized
  end
  p params
  args = JSON.parse(params["survey"]);
  survey = createFromJson(args);
  p survey
  if survey
    {survey_id:survey.id}.to_json
  end
    {error: 'not saved'}.to_json

end

