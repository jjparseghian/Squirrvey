require_relative '../spec_helper'

class CreateSurveySpec
  describe 'Create New Surveys' do
    string = '{"title":"survye_title","questions":[{"id":1423953668452,"text":"question1","answers":[{"id":1423953668452,"text":"answer1","letter":"a"}],"sequence":1}]}'
    let(:new_survey_json) {
      #start test json map
      return '{"title":"survye_title","questions":[{"id":1423953668452,"text":"question1","answers":[{"id":1423953668452,"text":"answer1","letter":"a"}],"sequence":1}]}'
      #end test json map
    }


      it 'should respond to /new with html form' do
        get "/surveys/new", params={}
        expect(last_response).to be_ok
        expect(last_response.body).to include 'Add Question'
        expect(last_response.body).to include 'Enter Survey Title Here'

        #expect(last_response).to be_redirect
    end

    it 'should respond to post /surveys/new.json' do
      #post "/surveys/new", params={'survey' => :new_survey_json , 'rack.session' =>  { :user_id => 1 }}
      p "testing post"
      fields = {
        'survey' => string
      }
      p fields
      post '/surveys/new.json', fields, {"HTTP_X_REQUESTED_WITH" => "XMLHttpRequest"}

      p last_response
       last_response.must_be :ok?
      # expect(last_response.body).to include 'survey_id'

      # expect(Survey.exists?(last_response.body['survey_id'])).to eq(true);
    end
  end
end
