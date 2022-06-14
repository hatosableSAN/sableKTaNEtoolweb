<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>KTaNE Experting Sheet</title>
    <link rel="shortcut icon" href="./favicon.ico" >
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <br/><a href="/index"><button type="button" class="reset" style="border-radius: 10px;padding:10px;font-size:100%;font:#fff;">BACK</button></a><br>
                <h1>KTaNE Experting Sheet</h1>
<form name="sheet">
<p>
SERIAL：<input type="text" class="serial" name="name" pattern="^[A-Z0-9]{5}[0-9]"  placeholder="XXXXXX" maxlength="6">   <button type="button" class="reset">RESET</button><br/><br/>
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
</form>
</body>


  <script type="text/javascript" src="/js/addportplate.js"></script>
  <script type="text/javascript" src="/js/modal.js"></script>
  <script type="text/javascript" src="/js/reset.js"></script>







</html>


