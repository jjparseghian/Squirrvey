var surveyController = function(){

  var survey = null;
  var addQuestionButton = null;
  var submtButtonArg = null;

   var setupView = function(){
    addQuestionButton = $('#add-question-button');
    submtButton = $('#button-survey-submit');

    addQuestionButton.on('click', addQuestion);
    submtButton.on('click', submit);
    $("#template").template("template-name");
  }

  var setup = function(survey_id){
    if(survey_id==null){
      survey = new Survey();
    }
    setupView();
  }

  var onSubmitSuccess = function(response){
    survey.id = response.survey_id;
    alert('Your survey has been saved');
  }

  var onSubmitError = function(respone){
    console.log(response);
    alert('Your HAS NOT been saved');
  }

  var getAttributeInt = function(html,attrName){
    var value = html.getAttribute(attrName);
    if( value != null){
      return parseInt(value);
    }else{
      return -1;
    }
  }

  var submit = function(){
    dataOut = JSON.stringify(survey);
    $.ajax({
      url: '/',
      type: "POST",
      dataType: "json",
      data: dataOut,
      success: onSubmitSuccess,
      error: onSubmitError

    });
  }
  var addAnswer = function(e){
      //add to question-panel-seq
      var id  = getAttributeInt(this,"data-question-id");
      var question = survey.getQuestionById(id);
      if(question.isQuestionLimitReached()){
        alert("We support only 4 answers now.")
        return;
      }
      var answer = question.addNewAnswer();
      var panel_id = "#question-panel-"+id;
     var data = {
        questionNumber: question.sequence,
        answerLetter: answer.letter,
        questionId: question.id
    };

      $.tmpl( $("#template-answer"), data )
          .appendTo( panel_id);
  };

  var addQuestion = function(){
    var question = survey.addNewQuestion();
    var answer = question.addNewAnswer();

    var data = {
        questionNumber: question.sequence,
        answerLetter: answer.letter,
        questionId: question.id
    };

      // Render the template with the movies data and insert
      // the rendered HTML under the "movieList" element
      $.tmpl( $("#template-question"), data )
          .appendTo( "#questions-panel" );

      $.tmpl( $("#template-answer"), data )
          .appendTo( "#question-panel-"+question.id );

      $('#add-answer-button-'+question.id).on('click', addAnswer);

  }



  return {
    setup: setup,
  }
}();
