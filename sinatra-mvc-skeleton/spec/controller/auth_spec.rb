require 'spec_helper'

describe "Auth Controller" do
let(:user) {User.create(name: "Bill Clinton", email: "billclinton@email.com", password: "politics")}

before do
  user
end

  describe "GET /signup" do
    it "loads the signup page" do
      get '/signup'
      expect(last_response).to be_ok
    end
  end

  describe "GET /login" do
    it "loads the login page" do
      get '/login'
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

  describe "POST /signup" do
    it "should successfully redirect after user created" do
      post '/signup'
      expect(last_response).to be_redirect
      follow_redirect!
      last_request.path.should == '/'
  end
 end
end
