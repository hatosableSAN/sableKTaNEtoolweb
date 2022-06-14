// $(document).on("click", ".add", function() {
//     $("#originalport").insertAfter($(this).parent());
// });
// $(document).on("click", ".del", function() {
//     var target = $(this).parent();
//     if (target.parent().children().length > 1) {
//         target.remove();
//     }
// });

const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');
const mask = document.getElementById('mask');
const defaulttext=document.getElementById('defaultmemo');
const modaltext=document.getElementById('modalmemo');
function OpenModal() {
   modaltext.value=defaulttext.value;
    modal.style.display="block";
    mask.style.display="inline";
  };
  function CloseModal() {
   defaulttext.value=modaltext.value;
   mask.style.display ="none";
   modal.style.display="none";
  };
  function CloseMask(){
    mask.style.display ="none";
    modal.style.display="none";
  };

