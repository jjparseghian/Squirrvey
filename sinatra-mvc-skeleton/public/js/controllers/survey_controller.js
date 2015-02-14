var surveyController = function(){

  var survey = null;
  var addQuestionButton = null;
  var submtButtonArg = null;
  var view = viewer;

   var setupView = function(){
    addQuestionButton = $('#add-question-button');
    submtButton = $('#button-survey-submit');

    addQuestionButton.on('click', addQuestion);
    submtButton.on('click', submit);

    $("#survey-title").change( function(){
      survey.title = this.value;
    });
  }

  var setup = function(survey_id){
    if(survey_id==null){
      survey = new Survey();
    }
    setupView();
    addQuestion();
  }

  var onSubmitSuccess = function(response){
    survey.id = response.survey_id;
    alert('Your survey has been saved');
  }

  var onSubmitError = function(response){
    console.log(response);
    alert('Your survey HAS NOT been saved');
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
      url: '/survey/new.json',
      type: "POST",
      dataType: "text",
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
      attachListeners(question,answer);
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
      attachListeners(question,answer);

  }


  var attachListeners = function(question,answer){

      $('#add-answer-button-'+question.id).on('click', addAnswer);
      $('#delete-answer-button-'+answer.id).on('click', removeAnswer);
      $('#delete-question-button-'+question.id).on('click', removeQuestion);
      $("#question-"+question.id).change( function(){
        question.text = this.value;
        });
      attachAnswerListener(answer);
  }
  var attachAnswerListener = function(answer){
    $("#answer-"+answer.id).change(function(){
          answer.text = this.value;
      });
  }






  return {
    setup: setup,
  }
}();
