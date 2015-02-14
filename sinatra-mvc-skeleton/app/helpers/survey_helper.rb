def createFromJson(args)
  #TODO use actual logged in user
  survey = Survey.create({:title=>args["title"], user_id: 1})
  args["questions"].each do |question|
    questionRecord = Question.create({text: question["text"], survey_id: survey.id});
    question["answers"].each do |answer|
      answerRecord = Answer.create({text: answer["text"], question_id: questionRecord.id});
    end
  end
  survey
end
