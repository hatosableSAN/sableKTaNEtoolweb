<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
 <% String nothtml=(String)request.getAttribute("nothtml"); %>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="./favicon.ico" >
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>プロファイル保管庫 -Hatosable's KTaNE Page-</title>
    </head>
    <body>
      <br/><a href="/index"><button type="button" class="reset" style="border-radius: 10px;padding:10px;font-size:100%;font:#fff;">BACK</button></a><br>
      <h1>日本語マニュアル変換ツール</h1>
      <p>(ほぼ自分用ですが)遊ぶのに便利なプロファイルを配布します。必要に応じて設定を変更してください。</p>
      <p>今後も不定期更新予定。</p>
      <table>
       <tr><th>名前</th><th>説明</th><th colspan="2">Download</th></tr>
       <tr><td>Boss module eraser</td><td>全てのボスモジュール(準ボスを除く)を非表示にします。</td><td style="text-align: center;" colspan="2"><input type="hidden" value="1" form="1" name="id"></input><input type="submit" value="クリックして入手" form="1" class="btn--green"></input></td><td></td></tr>
       <tr><td>Veryhard eraser</td><td>分析担当者(Expert)/処理担当者(Defuser)の難易度がVeryhardに設定されているモジュールを除外します。<br>両方有効化しておくと、かなりフリープレイが行いやすくなります。</td><td style="text-align: center;" ><input type="hidden" value="2" form="2" name="id"></input><input type="submit" value="Expert版" form="2" class="btn--green"></input></td><td style="text-align: center;" ><input type="hidden" value="3" form="3" name="id"></input><input type="submit" value="Defuser版" form="3" class="btn--green"></input></td></tr>
       </table>
       
      <form action="./ProfilesGet" method="post" id="1" enctype="multipart/form-data"></form>
      <form action="./ProfilesGet" method="post" id="2" enctype="multipart/form-data"></form>
      <form action="./ProfilesGet" method="post" id="3" enctype="multipart/form-data"></form>
    </body>
  </html>
