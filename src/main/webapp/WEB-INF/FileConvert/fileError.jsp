<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
 <% request.setAttribute("nothtml",null); %>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>日本語マニュアル変換ツール</title>
    </head>
    <body>
      <h1>日本語マニュアル変換ツール(ベータ版)</h1>
          <p style="color: red;">拡張子が.htmlのファイルを読み込ませてください</p>
          <button class="btn btn--orange">
          <a href="./ConvertMenu" style="color: white;text-decoration: none;">戻る</a></button>
        
        



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


.btn--orange {
  size: 150%;
  padding: 5px 5px;
  width: 10%;
  text-decoration: none;
  text-align: center;
  border:none;
  color: #fff;
  background-color: #eb6100;
  border-bottom: 3px solid #b84c00;
}
.btn--orange:active {
  margin-top: 3px;
  color: #fff;
  background: #f56500;
  border-bottom: 1px solid #b84c00;
}



    
    
      </style>
    