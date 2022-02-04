<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
 <% String nothtml=(String)request.getAttribute("nothtml"); %>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>日本語マニュアル変換ツール</title>
    </head>
    <body>
      
      <h1>日本語マニュアル変換ツール(ベータ版)</h1>
      <br/><a href="/index"><button type="button" class="reset" style="color: #0478a5;">BACK</button></a><br/>
      <form action="./Converter" method="post"enctype="multipart/form-data">
        <input type="file" name="select" class="btn btn--red btn--radius btn--cubic" required accept=".html"/><a style="color: red;">*</a>
        <% if(nothtml!=null){%>
          <p style="color: red;">拡張子が.htmlのファイルを読み込ませてください</p>
        <%}
        %>
        <p>モジュール和名：<input type="text" name="name" required/><a style="color: red;"> *</a></p>
        <p>翻訳者：<input type="text" name="creator" required/><a style="color: red;"> *</a></p>
        <input type="submit" class="btn btn--orange btn--cubic btn--shadow" value="送信">
          </form>
      <h2>使い方</h2>
      <p>1.変換元のマニュアルを選択</p>
      <p>2.和名を入力</p>
      <p>2.翻訳者名を入力</p>
      <p>3.変換ボタンを押す</p>
      <p>4.日本語マニュアル形式に変換されたhtml(原名 translated (日本語 — 和名) (翻訳者名).html)がダウンロードされます！</p>

      <h2>どこが変わるの？</h2>
    <p>・<code>&lt;html lang="ja"&gt;</code>の追加</p>
  <p> ・<code>&lt;link rel="stylesheet" type="text/css" href="css/font-japanese.css"&gt;</code>の追加</p>
<p>  ・ページタイトル&セクションタイトル&タイトルh2タグ(モジュール詳細：〇〇)の自動和名置換</p>
<p>     ・ページ数の自動変換 Page 1 of 1 → ページ 1/1</p>



    </body>
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


input.btn--orange {
  border:none;
  color: #fff;
  background-color: #eb6100;
  border-bottom: 3px solid #b84c00;
}
input.btn--orange:active {
  margin-top: 3px;
  color: #fff;
  background: #f56500;
  border-bottom: 1px solid #b84c00;
}



    
    
      </style>
    