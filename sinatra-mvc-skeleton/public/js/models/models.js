var findIndexById = function(array,id){
  var index = -1;
   array.forEach(function(value,ix){
    if(value.id === id){
      index = ix;
      return false;
    }
  });
  return index;
}

var deleteFromArrayById = function(array, id){
 var index = -1;
  array.forEach(function(value,ix){
    if(value.id === id){
      index = ix;
      return false;
    }
  });
  if(index>-1){
    array.splice(index,1);
  }
}

var lettersForIndex = function(index){
  if(index <0){
    return "z";
  }
  return ['a','b','c','d'][index];
}


var Answer = function(id,text,letter){
  this.id = id || Date.now();
  this.text = text;
  this.letter = letter;
};

var Question = function(id, text, answers, sequence){
  this.id = id || Date.now();
  this.text = text;
  this.answers = answers || [];
  this.sequence = sequence;

}

Question.prototype.getAnswerLetter = function(answer){
  var index = findIndexById(this.answers, answer);

  return lettersForIndex(index);
}

Question.prototype.isQuestionLimitReached = function(answer){
  return this.answers.length == 4;
}



Question.prototype.addNewAnswer = function(){
  var answer = new Answer();
  this.answers.push(answer);
  answer.letter = lettersForIndex(this.answers.length-1);
  return answer;
}

Question.prototype.setSequence = function(sequence){
  this.sequence = sequence;

}


Question.prototype.deleteAnswer = function(answer_id){
  deleteFromArrayById(questions,answer_id);
  //TODO reassign letters

}



var Survey = function(id, title, questions){
  this.id = id;
  this.title = title;
  this.questions = questions || [];
}

Survey.prototype.addNewQuestion = function(){
  var question = new Question();
  this.questions.push(question);
  question.setSequence (this.questions.length);
  return question;
}

Survey.prototype.deleteQuestion = function(question_id){
  deleteFromArrayById(this.questions,question_id);
}

Survey.prototype.getQuestionById = function(id){
  var index = findIndexById(this.questions,id);
  if(index>-1){
    return this.questions[index]
  }else{
    return null;
  }
}


