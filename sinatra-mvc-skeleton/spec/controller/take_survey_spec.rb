require 'spec_helper'

describe "Take_survey Controller" do
let(:test_user){User.first}
p "#{User.first}"
let(:user) {User.create(name: "Bill Clinton", email: "bclinton@email.com", password: "politics")}

before do
  user
end

  describe "GET /surveys/all" do
    it "loads the surveys page" do
      get '/surveys/all'
      expect(last_response).to be_ok
    end
  end

  describe "GET /surveys/:id" do
    it "loads the individual survey page" do
      get '/surveys/:id'
      expect(last_response).to be_ok
    end
  end

  describe "GET /logout"  do
    it "logs out the user and clear the session" do
      get '/logout'
      expect(last_response.redirect?).to be_true
      follow_redirect!
      last_request.path.should == '/'
    end
  end

  describe "POST /surveys/:id" do
    it "should successfully redirect after user created" do
      post '/surveys/:id'
      expect(last_response).to be_redirect
      follow_redirect!
      last_request.path.should == '/surveys/all'
  end
 end
end