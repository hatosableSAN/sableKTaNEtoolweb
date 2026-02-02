<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
<% response.sendRedirect(request.getContextPath() + "/profiles"); return; %>
<%-- Redirected to Spring profiles UI (Thymeleaf) --%>
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
      <h1>プロファイル保管庫</h1>
      <p>(ほぼ自分用ですが)遊ぶのに便利なプロファイルを配布します。必要に応じて設定を変更してください。</p>
      <p>毎月月末に最新版に更新されます。</p>
<p>このページは削除されました。プロファイルのダウンロードは API 経由で提供されます。</p>
    </body>
  </html>
