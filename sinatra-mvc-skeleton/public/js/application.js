$(document).ready(function() {
  if ($('#button-survey-submit').length>0){
    var controller = surveyController;
    controller.setup();
  }

 if( $('#forms_submit_button').length>0){
    $('#forms_submit_button').click(function(){
    $('form').each(function(){
        $(this).submit();
    });
  });
 }


});

