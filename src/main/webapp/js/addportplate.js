clone=0;
  $(document).on("click", ".add", function() {
  clone=clone+1;
  var clonename="clone"+String(clone);
  var cloneport= $(this).parents(".original").clone(true).removeClass('original').addClass(clonename);
  var originalport=$(this).parents("#portplate-contents").addClass('original');
  if(clone!=1){
   var parentname=".clone"+String(clone-1);
   originalport=$(parentname);
   console.log(parentname);
   console.log(originalport);
  }
  cloneport.insertAfter(originalport);//ポートボックスの複製 末尾に追加されてくれ
  cloneport.find('input[name="port"]').prop('checked',false);//チェックボックスリセット
  cloneport.children("#port-button").remove();//クローンのボタン削除

  
});
    $(document).on("click", ".del", function() {
     var targetname=".clone"+String(clone);
     console.log(targetname);
        var target = $(targetname);

            target.remove();
     if(clone>0){
      clone=clone-1;
     }
      
    });


      $(document).on("click", ".reset", function(){
        document.sheet.reset();
        $('.cloned').remove();
      });
