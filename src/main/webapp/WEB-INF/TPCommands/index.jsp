<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="./favicon.ico" >
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/cssfile.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Twitch Playsコマンド完全版 -Hatosable's KTaNE Page-</title>
    <style>
     li{
      font-size: 100%;
     }
     .command td{
      background-color: #ffffff;  /* 背景色指定 */
     }
     </style>
    </head>
    <body>
      <br/><a href="/index"><button type="button" class="reset" style="border-radius: 10px;padding:10px;font-size:100%;font:#fff;">BACK</button></a><br>
      <h1>Twitch Playsコマンド完全版</h1>
      <!-- ヘッダー -->
      <!-- ヘッダー終わり -->
      <h2>用語説明</h2>
      <ul>
       <li>四角括弧[]:必須引数</li>
       <li>丸括弧():任意引数</li>
      </ul>
      <h2>一般設定</h2>
      <p>いつでも使えるコマンド。</p>
      <table class="command">
       <tr><th>概要</th><th>コマンド</th><th>説明</th></tr>
       <tr><td>ヘルプ</td><td>!help</td><td>TPの説明を表示する。</td></tr>
       <tr><td>モード変更</td><td>!timemode [on/off]<br>!vsmode [on/off]<br>!zenmode [on/off]<br>!trainingmode [on/off]</td><td>ゲームモードを有効/無効化する。<br>training modeはzen modeの仕様に加え、ミスが記録されてもカウントダウンタイマーの速度が上昇しない。</td></tr>
       <tr><td>VSモードに参加</td><td>!join (good/evil)</td><td>VSモードのチームに参加する。引数で参加チームを指定できる。</td></tr>
       <tr><td>VSモードの解散</td><td>!clearvsplayers</td><td>VSモードの参加者情報を削除する。管理者のみ可能。</td></tr>
       <tr><td>VSモード参加者表示</td><td>!players</td><td>各チームの参加者を確認する。</td></tr>
       <tr><td>順位確認</td><td>!rank (順位/ユーザー)</td><td>特定のユーザーの順位やその順位のユーザーを確認する。引数無しの場合、自分の順位を確認する。</td></tr>
       <tr><td>ソロランク確認</td><td>!rank solo [順位/ユーザー]</td><td>特定のユーザーのソロランクやそのソロランクのユーザーを確認する。</td></tr>
       <tr><td>ログ取得</td><td>!log</td><td>直前の爆弾のログを取得する。</td></tr>
       <tr><td>URL短縮</td><td>!shorturl</td><td>URLの短縮設定を切り替える。</td></tr>
       <tr><td>起動日確認</td><td>!builddate</td><td>TPが起動した日時を確認する。</td></tr>
       <tr><td>ゲームを開始する</td><td>!run<br>!run [vanilla/light/mixed/heavy/mods] [モジュール数]<br>!run [モジュール数] [vanilla/light/mixed/heavy/mods] [GoodチームのHP] [EvilチームのHP]<br>!run [ミッション名]<br></td><td>モジュール数を指定してゲームを開始する。<br>MODモジュールの割合を第2引数で指定する(mixedlightのように連結させた語句も可能)。引数無しでヘルプを表示する。</td></tr>
       <tr><td>プロファイルの設定</td><td>!profile enable [プロファイル名]<br>!profile disable [プロファイル名]<br>!profile enabled<br>!profile list</td><td>プロファイルを有効/無効化する。<br>enabledオプションで有効なプロファイルを表示したり、listオプションで利用可能なプロファイルを表示できる。</td></tr>
       <tr><td>モジュール情報の呼び出し</td><td>!readmodule [情報名] [モジュール]</td><td>モジュールの情報を呼び出す。</td></tr>
       <tr><td>プロファイルの編集</td><td>!profile add [モジュール名/モジュールID] [プロファイル名]<br>!profile remove [モジュール名/モジュールID] [プロファイル名]<br>!profile enabled<br>!profile list</td><td>プロファイルにモジュールを追加したり削除したりする。<br>引数にスペースが含まれる場合、""で囲む。プロファイル名は部分一致が可能。</td></tr>
       <tr><td>無効モジュールの確認</td><td>!profile disabled by [プロファイル名]</td><td>プロファイルによって無効化されているモジュール一覧を表示する。</td></tr>
       </table>
       <h2>管理者用コマンド</h2>
       <table class="command">
       <tr><td>ボーナスポイント</td><td>!bonuspoints [ユーザー] [ポイント数]</td><td>そのユーザーに追加でポイントを与える。管理者のみ有効。</td></tr>
       <tr><td>モード表示</td><td>!mode</td><td>現在のモードと使用可能なモードを表示する。</td></tr>
       <tr><td>ボーナス解除</td><td>!bonussolves [ユーザー] [解除数]</td><td>そのユーザーに追加で解除数を与える。管理者のみ有効。</td></tr>
       <tr><td>ボーナスミス</td><td>!bonusstrikes [ユーザー] [ミス数]</td><td>そのユーザーに追加でミス数を与える。管理者のみ有効。</td></tr>
       <tr><td>ミス取り消し</td><td>!srefund [ユーザー] (取り消し数)</td><td>そのユーザーのミス数を取り消す。管理者のみ有効。</td></tr>
       <tr><td>ミス移動</td><td>!stransfer [ユーザー1] to [ユーザー2] (移動数)</td><td>ユーザー1のミス数をユーザー2に与える。管理者のみ有効。</td></tr>
       <tr><td>報酬設定</td><td>!reward [ポイント数]</td><td>爆弾解除成功時に貰えるポイントを設定する。管理者のみ有効。</td></tr>
       <tr><td>報酬追加</td><td>!bonusreward [ポイント数]</td><td>爆弾解除成功時に貰えるポイントを追加する。管理者のみ有効。</td></tr>
       <tr><td>記録リセット</td><td>!resetuser [ユーザー1;ユーザー2;ユーザー3;...]</td><td>ユーザーの実績情報を削除する。スーパーユーザーのみ可能。</td></tr>
       <tr><td>投票の開始</td><td>!vote [任意の文字列/yes/no]</td><td>任意の文字列で投票を開始する。yes/noで投票に賛成/反対する。</td></tr>
       <tr><td>投票の取り消し</td><td>!vote remove</td><td>自分の投票を取り消す。</td></tr>
       <tr><td>投票時間の確認</td><td>!vote time</td><td>残り投票時間を表示する。</td></tr>
       <tr><td>投票の中止</td><td>!vote cancel</td><td>現在の投票を中止する。モデレーターのみ可能。</td></tr>
       <tr><td>投票の強制終了</td><td>!vote forceend</td><td>強制的に投票を締め切る。モデレーターのみ可能。</td></tr>
       <tr><td>現在のログ取得</td><td>!lognow</td><td>現在の爆弾のログを取得する。スーパーユーザーのみ可能。</td></tr>
       <tr><td>設定の呼び出し</td><td>!readsetting [設定名]</td><td>Mod Settingsに存在する特定の設定を呼び出す。モデレーターのみ可能。</td></tr>
       <tr><td>設定の書き込み</td><td>!writesetting [設定名] [値]</td><td>Mod Settingsに存在する特定の設定に値を書き込む。スーパーユーザーのみ可能。</td></tr>
       <tr><td>権限の付与/削除</td><td>!add [ユーザー] [moderators/など]<br>!remove [ユーザー] [moderators/など]</td><td>ユーザーに権限を付与/削除する。モデレーターのみ有効。</td></tr>
       <tr><td>モデレーターの表示</td><td>!moderators</td><td>有効にすると、モデレーター以上の権限を持つユーザーを表示する。</td></tr>

       
      </table>
    </body>
  </html>
