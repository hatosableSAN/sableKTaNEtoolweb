<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>KTaNE Experting Sheet</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script type="text/javascript" src="./addportplate.js"></script>

</head>
<body>

                <h1>KTaNE Experting Sheet</h1>
<form name="sheet">
<p>
  <button type="button" class="reset">RESET</button>
SERIAL：<input type="text" name="name" pattern="^[A-Z0-9]{5}[0-9]">
</p>

    <h2>INDICATORS</h2>
    <p>
LIT:
  <input type="checkbox">BOB
  <input type="checkbox">CAR
  <input type="checkbox">CLR
  <input type="checkbox">FRK
  <input type="checkbox">FRQ
  <input type="checkbox">IND
  <input type="checkbox">MSA
  <input type="checkbox">NSA
  <input type="checkbox">SIG
  <input type="checkbox">SND
  <input type="checkbox">TRN  
</p>
 <p>
UNLIT:
  <input type="checkbox">BOB
  <input type="checkbox">CAR
  <input type="checkbox">CLR
  <input type="checkbox">FRK
  <input type="checkbox">FRQ
  <input type="checkbox">IND
  <input type="checkbox">MSA
  <input type="checkbox">NSA
  <input type="checkbox">SIG
  <input type="checkbox">SND
  <input type="checkbox">TRN  
</p>

    <h2>BATTERYS</h2>
    <p>
D BATTERY(単1):<input type="number" name="name">
AA BATTERY(単3):<input type="number" name="name">
HOLDER:<input type="number" name="number">
</p>
    
    <h2>PORTS</h2>

    <div id="portbox">
    <div id="portplate">
<!-- DVI-D:<input type="text" name="name" size="3">
Parallel:<input type="text" name="name" size="3">
PS/2:<input type="text" name="name" size="3">
RJ-45:<input type="text" name="name" size="3">
Serial:<input type="text" name="name" size="3">
Stereo RCA:<input type="text" name="name" size="3"> -->
      <input type="checkbox" name="port">DVI-D
      <input type="checkbox" name="port">Stereo RCA
      <input type="checkbox" name="port">PS/2
      <input type="checkbox" name="port">RJ-45
      <input type="checkbox" name="port">Serial
      <input type="checkbox"name="port">Parallel
       <input type="checkbox" name="port">NO Ports
        <input type="button" value="＋" class="add pluralBtn">
        <input type="button" value="－" class="del pluralBtn">
        
</div>
</div>
    

    
<p>
<h2>MEMO</h2>
<textarea name="kanso" rows="40" cols="100"></textarea>
</p>

</form>
</body>

<script>
// $(document).on("click", ".add", function() {
//     $("#originalport").insertAfter($(this).parent());
// });
// $(document).on("click", ".del", function() {
//     var target = $(this).parent();
//     if (target.parent().children().length > 1) {
//         target.remove();
//     }
// });
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





</script>




</html>


<style>
.reset{
  color: #fff;
  font-size: 100%;
  background-color: #eb6100;
  border-style: none;
}
.reset:hover{
  font-size: 100%;
  color: #fff;
  background: #f56500;
  border-style: none;
}

h1 {
  position: relative;
  display: inline-block;
  padding: 1rem 2rem 1rem 4rem;
  color: #fff;
  border-radius: 100vh 0 0 100vh;
  background: #fa4141;
}

h1:before {
  position: absolute;
  top: calc(50% - 7px);
  left: 10px;
  width: 14px;
  height: 14px;
  content: '';
  border-radius: 50%;
  background: #fff;
}

  h2 {
    width: 30%;
  padding: 1rem 2rem;
  color: #fff;
  border-radius: 10px;
  background-image: -webkit-gradient(linear, left top, right top, from(#0478a5), to(#17d1f1));
  background-image: -webkit-linear-gradient(left, #0478a5 0%, #17d1f1 100%);
  background-image: linear-gradient(to right, #0478a5 0%, #17d1f1 100%);
}
p{
  font-size: large;
  font-weight:bold;
}
div{
  font-size: large;
  font-weight:bold;
}

  </style>


