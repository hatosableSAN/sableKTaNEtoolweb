<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>KTaNE Experting Sheet -Hatosable's KTaNE Page-</title>
    <link rel="shortcut icon" href="./favicon.ico" >
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<style>
  @font-face {
	font-family: 'ind';
	src: url(<%=request.getContextPath() %>/font/OstrichSans-Black.otf);
}
  div { display: inline-block;}
  .serialdiv{
   display: inline-flex;
   flex-direction: column;
   align-items: flex-end;
  }
  .serialset{

   margin-left: 10px;
   margin-right: 10px;
  }
  .indicator{

   color: #fff;
   background-color: rgb(86, 2, 2);
   padding: 5px;
   font-family: "ind";
  }
  .lightlit, .lightunlit {
    width: 1.5em;
    height: 1.5em;
    background-color: #92b2d0;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #848484;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}
/*チェックボックスクリック時に色を設定*/
.lightlit:checked {
    background-color: #ffffff;
}
.lightunlit:checked {
    background-color: #292929;
}
#portplate-contents {
    display: block;
}
#lit, #unlit{
 margin: 10px;
}
 </style>
   

<body>
  <br/><a href="/index"><button type="button" class="reset" style="border-radius: 10px;padding:10px;font-size:100%;font:#fff;">BACK</button></a><br>
                <h1>KTaNE Experting Sheet</h1>
<div class="sheet" style="display: block;">
<form name="sheet" >
<p>
<div class="serialset">
 <div class="serialdiv" style="height: 130%;">
  <span style="color: #fff;font-size:14px;background-color:rgb(115, 3, 3);width: 168px;text-align: center;">SERIAL</span>
<input type="text" class="serial" name="name" placeholder="XXXXXX" maxlength="6" oninput="value = value.toUpperCase();">
</div>
<button type="button" class="reset" style="margin-top: auto;">RESET</button>
</div>

<div id='open' onclick="OpenModal();">
 メモを開く
</div>
</p>


    

 <div class ="memoarea">
<h2 style="position: relative;">MEMO</h2>
<textarea name="kanso" class="memo" id="defaultmemo"></textarea>
</div>

<div id="mask"></div>
<div class ="modal"id="modal">
 <h2 style="position: relative;">MEMO</h2>
 <textarea name="kanso" class="memo" id="modalmemo"></textarea>
 <div id="close" onclick="CloseModal();CloseMask();">
  閉じる
 </div>
</div>
    <h2>BATTERYS</h2>
    <p>
[種類別]</br>    
D BATTERY(単1):<input type="number" name="name" value="0" min="0" size="2">   
AA BATTERY(単3):<input type="number" name="name"value="0" min="0" size="2"></br>
[本数別]</br>  
BATTERYS(総本数):<input type="number" name="name" value="0" min="0" size="2">    
HOLDER:<input type="number" name="number" value="0" min="0" size="2">
</p>
 
<h2>INDICATORS</h2>
<p><input type="checkbox" id="litindvisible" onclick="nolitindicator();">No LIT indicators</p>
<p><input type="checkbox" id="unlitindvisible" onclick="nounlitindicator();">No UNLIT indicators</p>
<div id="lit">
LIT:
<div class="indicator"><input type="checkbox" class="lightlit">BOB</div>
<div class="indicator"><input type="checkbox" class="lightlit">CAR</div>
<div class="indicator"><input type="checkbox" class="lightlit">CLR</div>
<div class="indicator"><input type="checkbox" class="lightlit">FRK</div>
<div class="indicator"><input type="checkbox" class="lightlit">FRQ</div>
<div class="indicator"><input type="checkbox" class="lightlit">IND</div>
<div class="indicator"><input type="checkbox" class="lightlit">MSA</div>
<div class="indicator"><input type="checkbox" class="lightlit">NSA</div>
<div class="indicator"><input type="checkbox" class="lightlit">SIG</div>
<div class="indicator"><input type="checkbox" class="lightlit">SND</div>
<div class="indicator"><input type="checkbox" class="lightlit">TRN</div>
<div class="indicator"><input type="checkbox" class="lightlit">NLL </div> 
</div>
<div id="unlit">
UNLIT:
<div class="indicator"><input type="checkbox" class="lightunlit">BOB</div>
<div class="indicator"><input type="checkbox" class="lightunlit">CAR</div>
<div class="indicator"><input type="checkbox" class="lightunlit">CLR</div>
<div class="indicator"><input type="checkbox" class="lightunlit">FRK</div>
<div class="indicator"><input type="checkbox" class="lightunlit">FRQ</div>
<div class="indicator"><input type="checkbox" class="lightunlit">IND</div>
<div class="indicator"><input type="checkbox" class="lightunlit">MSA</div>
<div class="indicator"><input type="checkbox" class="lightunlit">NSA</div>
<div class="indicator"><input type="checkbox" class="lightunlit">SIG</div>
<div class="indicator"><input type="checkbox" class="lightunlit">SND</div>
<div class="indicator"><input type="checkbox" class="lightunlit">TRN</div>
<div class="indicator"><input type="checkbox" class="lightunlit">NLL</div> 
</div>

    <h2>PORTS</h2>
    <p class="port"><input type="checkbox" id="portvisible" onclick="noportplate();">No Portplates</p>
    <div id="portbox">
    <div id="portplate-contents" class="original">
     <div class="port"><input type="checkbox" name="port">DVI-D</div>
     <div class="port"><input type="checkbox" name="port">Stereo RCA</div>
     <div class="port"><input type="checkbox" name="port">PS/2</div>
     <div class="port"><input type="checkbox" name="port">RJ-45</div>
     <div class="port"><input type="checkbox" name="port">Serial</div>
     <div class="port"><input type="checkbox"name="port">Parallel</div>
     <div class="port"><input type="checkbox" name="port">Empty</div>
     <div class="port"><input type="text" name="port" placeholder="MOD Port" style="width: 75%;"></div>
     <div id="port-button">
           <span>
           <input type="button" value="＋" class="add pluralBtn">
           <input type="button" value="－" class="del pluralBtn">
           </span> 
     </div>     
           </div>
      </div>
</div>
</form>
</body>
  <script type="text/javascript" src="/js/addportplate.js"></script>
  <script type="text/javascript" src="/js/modal.js"></script>
  <script type="text/javascript" src="/js/reset.js"></script>
</html>


