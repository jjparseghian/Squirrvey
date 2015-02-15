def createFromJson(args)
  # if current_user == nil
  #   return nil
  # end
  #TODO use actual logged in user
  user_id = current_user.id
  survey = Survey.create({:title=>args["title"], user_id: user_id})
  args["questions"].each do |question|
    questionRecord = Question.create({text: question["text"], survey_id: survey.id});
    question["answers"].each do |answer|
      answerRecord = Answer.create({text: answer["text"], question_id: questionRecord.id});
    end
  end
  survey
end
