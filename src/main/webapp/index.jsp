<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>KTaNE Experting Sheet</title>
  <link rel="shortcut icon" href="./favicon.ico" >
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">

</head>
<body>

                <h1>Hatosable's KTaNE Page</h1>
<p>ようこそ！ここはHatosableによるKeep Talking and Nobody Explodes関連のツールを用意しております。</p>
<div class="topbutton">
<a href="./Expert" class="btn btn--yellow">Experting Sheet</br>(処理担当者ツール)</a>
</div>
<div class="topbutton">
<a href="./ConvertMenu" class="btn btn--blue">Manual Converter</br>(日本語用マニュアル作成ツール)</a>
</div>


 <h2>更新履歴</h2>
 <li>2022/08/29 Manual Converter:差分マニュアルの作成に対応。
 </li>
 <li>2022/06/18 Experting Sheet:ポートプレート追加ボタンを一つに固定。
  Manual Converter:変換後の文字列に自動インデントを追加する機能を追加。
  その他いくつかの軽微な修正。
 </li>
 <li>2022/06/14 更新履歴の項目を追加。Experting Sheetをレスポンシブ対応。</li>
<footer>
 <p>© 2022 Hatosable</p>
</footer>
</body>
</html>

