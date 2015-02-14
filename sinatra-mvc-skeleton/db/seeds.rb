james = User.create(name: "james", password: 123, password_confirmation: 123, email: "james@dbc.com")
vivek = User.create(name: "vivek", password: 123, password_confirmation: 123, email: "vivek@dbc.com")

test_survey = Survey.create(title: "Some Survey", user_id: james.id)

test_question = Question.create(text: "Questions?", survey_id: test_survey.id)

test_answer = Answer.create(text: "Some answer text", question_id: test_question.id)

UserAnswers.create(user_id: vivek.id, answer_id: test_answer.id)


