<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>KTaNE Calclator -Hatosable's KTaNE Page-</title>
    <link rel="shortcut icon" href="./favicon.ico" >
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <br/><a href="/index"><button type="button" class="reset" style="border-radius: 10px;padding:10px;font-size:100%;font:#fff;">BACK</button></a><br>
                <h1>KTaNE Calclator</h1>
<div class="sheet">
<form name="sheet" >
<p>
 <input type="number" pattern="" value="10"min=1 max="64">進数表記の<input type="text"pattern="">を進数変換
</p>
<input readonly id="base2" class="gray">
<input readonly id="base10" class="gray">
<input readonly id="base" class="gray">
<input readonly id="base2" class="gray">
 <script type="text/javascript" src="/js/base.js"></script>



</html>


