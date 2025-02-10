<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>トップページ -Hatosable's KTaNE Page-</title>
  <link rel="shortcut icon" href="./favicon.ico" >
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">

</head>
<body>

                <h1>Hatosable's KTaNE Page</h1>
<p>ようこそ！ここはHatosableによるKeep Talking and Nobody Explodes関連のツールを用意しております。</p>
<div class="rowed">
   <div class="topbutton">
   <a href="./Expert" class="btn btn--yellow">Experting Sheet</br>(処理担当者ツール)</a>
   </div>
   <div class="topbutton">
   <a href="./ConvertMenu" class="btn btn--blue">Manual Converter</br>(日本語用マニュアル変換ツール)</a>
   </div>
</div>
<div class="rowed">
     <div class="topbutton">
      <a href="./Calculator" class="btn btn--red">Base Calculator</br>(進数計算機)</a>
  </div>
</div>
 <h2>更新履歴</h2>
 <li>2025/02/10 Manual Converter:新しいマニュアルテンプレートに対応。
 <li>2024/07/15 Manual Converter:新しいマニュアルテンプレートに対応。
 <li>2023/10/04 Experting Sheet:インジケーター＆ポートプレートが存在しない場合に非表示にできる機能を追加。
 <li>2023/09/21 更新が大変なため、プロファイル保管庫を一旦凍結。Experting Sheetのデザインを改善。
 <li>2023/03/10 進数計算機:64進数および52進数が正常に計算出来なかった不具合を修正。<span style="color: #FFF; font-size: 2px;">+隠し機能を追加。Nに-3進数を指定すると…？</span>
 <li>2023/02/08 進数計算機を追加。プロファイル保管庫の内容を更新。
 <li>2023/01/27 プロファイル保管庫に新規プロファイルを追加。細かい内容の修正。
 <li>2022/11/15 新ページ「マニュアル保管庫」を追加。ページのタイトルを修正
 <li>2022/10/20 Manual Converter:差分マニュアルのファイル名に原著者名を併記するように修正。
 <li>2022/10/07 Manual Converter:ファイルの末尾に改行が入る問題を修正。その他フォントを改良。
 <li>2022/09/06 Manual Converter:差分作成時に原文名を求めるように修正(オリジナルマニュアルとの整合性を図るため)
 <li>2022/08/29 Manual Converter:差分マニュアルの作成に対応。
 <li>2022/06/18 Experting Sheet:ポートプレート追加ボタンを一つに固定。
  Manual Converter:変換後の文字列に自動インデントを追加する機能を追加。
  その他いくつかの軽微な修正。</li>
 <li>2022/06/14 更新履歴の項目を追加。Experting Sheetをレスポンシブ対応。</li>
<footer>
 <p>© 2023 Hatosable</p>
</footer>
</body>
</html>

