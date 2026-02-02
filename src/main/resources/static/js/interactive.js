function valueChange(){

var target = document.getElementById("manualcheck");
var target2 = document.getElementById("interactive");
   if (target.checked){
    target2.style.visibility="visible";
   }else{
   target2.style.visibility="hidden";
   }
 }
