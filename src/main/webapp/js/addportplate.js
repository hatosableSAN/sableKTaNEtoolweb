
$(document).on("click", ".add", function() {

  const cloneport= $(this).parents(".original").clone(false).removeClass('original').addClass('clone');
  const originalport=$(this).parents("#portplate-contents").addClass('original');
  cloneport.insertAfter(originalport);
  //ポートボックスの複製
  $(this).parent().next().find('input[name="port"]').prop('checked',false);
  $('.clone').children("#port-button").remove();
});
    $(document).on("click", ".del", function() {
        var target = $(this).parent();
        if (target.parent().children().length > 1) {
            target.remove();
        }
      
    });


      $(document).on("click", ".reset", function(){
        document.sheet.reset();
        $('.cloned').remove();
      });
