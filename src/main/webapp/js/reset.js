$(document).on("click", ".add", function() {
 $(this).parent().clone(true).insertAfter($(this).parent()).addClass('cloned');
 $(this).parent().next().find('input[name="port"]').prop('checked',false);
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



