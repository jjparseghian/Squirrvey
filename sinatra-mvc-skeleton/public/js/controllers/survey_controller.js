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

  var getQuestionPanelId = function(id){
    var panel_id = "#question-panel-"+id;
    return panel_id;
  }

  var addAnswerByQuestionId = function(id){
    var question = survey.getQuestionById(id);
      if(question.isQuestionLimitReached()){
        alert("We support only 4 answers now.")
        return;
      }
      var answer = question.addNewAnswer();

      $.tmpl( $("#template-answer"),  getReplaceData(question,answer) )
          .appendTo( getQuestionPanelId(question.id));
  }

  var addAnswer = function(e){
      //add to question-panel-seq
      var id  = getAttributeInt(this,"data-question-id");
      addAnswerByQuestionId(id);
  };

  var removeQuestion = function(){
    var id  = getAttributeInt(this,"data-question-id");
    survey.deleteQuestion(id);
    var panelId = "#single-question-panel-"+id;
    var answerId = "#question-panel-"+id;
    $(panelId).remove();
    $(answerId).remove();
  }

  var removeAnswer = function(){
    var id  = getAttributeInt(this,"data-question-id");
    var answerId  = getAttributeInt(this,"data-answer-id");
    var answerPanelId = "answer-panel-"+answerId;
     $(answerPanelId).remove();
  }

  var getReplaceData = function(question, answer){
       var data = {
        questionNumber: question.sequence,
        answerLetter: answer.letter,
        questionId: question.id,
        answerId: answer.id
    };
    return data;
  }

  var addQuestion = function(){
    var question = survey.addNewQuestion();
    var answer = question.addNewAnswer();



      // Render the template with the movies data and insert
      // the rendered HTML under the "movieList" element
      $.tmpl( $("#template-question"), getReplaceData(question,answer) )
          .appendTo( "#questions-panel" );

      $.tmpl( $("#template-answer"),  getReplaceData(question,answer) )
          .appendTo( getQuestionPanelId(question.id));

      $('#add-answer-button-'+question.id).on('click', addAnswer);
      $('#delete-answer-button-'+answer.id).on('click', removeAnswer);
      $('#delete-question-button-'+question.id).on('click', removeQuestion);

  }



  return {
    setup: setup,
  }
}();
