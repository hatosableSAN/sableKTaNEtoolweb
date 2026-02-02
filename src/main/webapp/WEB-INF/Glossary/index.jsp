<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>

<%-- Removed: Glossary page was removed; backups deleted --%>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Glossary Removed</title>
</head>
<style>
 p { font-size: 13px;}
 </style>
<body>
 <br/><a href="/index"><button type="button" class="reset" style="border-radius: 10px;padding:10px;font-size:100%;font:#fff;">BACK</button></a><br>
 <h1>KTaNE用語集</h1>
 <p>これらの情報は、<a href="https://ktane.timwi.de/More/Glossary.html">英語版用語集</a>の情報を元に、加筆・修正を行ったものです。内容は予告なく変更される場合があります。</p>
 <h2>全般</h2>

  <ul class="accordion-area">
    <li>
      <section>
        <h3 class="title"><a name="加法混色">加法混色(Additive color mixing)</a></h3>
        <div class="box">
          <p>モジュールでよく使われる色のシステム。R(赤)G(緑)B(青)を原色とし、これらの色を混ぜ合わせることで8色の色を作る。<br>
          赤 + 青 = マゼンタ、緑 + 青 = シアン、赤 + 緑 = 黄の関係がある。3色全てを混ぜると白になり、どの色も混ぜないと黒になる。<br><br>対義語：<a href="#アラーム">減法混色</a></p>
        </div>
      </section>
    </li>
    <li>
      <section>
        <h3 class="title"><a name="アラーム">アラーム(Alarm,Alarm clock)</a></h3>
        <div class="box">
          <p>しばらく待つかボタンを押して止めるまで、大きな音を鳴らし続けるオブジェクト。お邪魔イベントの一つ。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1129522376">Alarm Clock Timer Extender</a>を導入することで、アラーム音の変更や自動停止までの秒数を変更できる。</p>
        </div>
      </section>
    </li>
    <li>
      <section>
        <h3 class="title"><a name="付録">付録(Appendix)</a></h3>
        <div class="box">
          <p>マニュアルの途中および末尾に追加される補足情報のこと。解除に必須となる情報ではないことが多い。</p>
        </div>
      </section>
    </li>
    <li>
     <section>
       <h3 class="title"><a name="減法混色">減法混色(Subtractive color mixing)</a></h3>
       <div class="box">
         <p>モジュールでよく使われる色のシステム。R(赤)B(青)Y(黄)を原色とし、これらの色を混ぜ合わせることで8色の色を作る。<br>
          赤 + 青 = 紫、黄 + 青 = 緑、赤 + 黄 = オレンジの関係がある。3色全てを混ぜると黒になり、どの色も混ぜないと白になる。<br><br>対義語：<a href="#加法混色">加法混色</a></p>
       </div>
     </section>
   </li>
   <li>
    <section>
      <h3 class="title"><a name="バッテリー/バッテリーホルダー">バッテリー/バッテリーホルダー(Batteries/Battery holders)</a></h3>
      <div class="box">
        <p>エッジワークの一つ。乾電池の形をしており、基本は単1バッテリーと単3バッテリーの2種類がある(単3バッテリーは2個1セットで出現)。<br>
         <br><br>関連用語：<a href="#エッジワーク">エッジワーク</a></p>
      </div>
    </section>
  </li>
  <li>
   <section>
     <h3 class="title"><a name="爆弾">爆弾(Bomb)</a></h3>
     <div class="box">
       <p>
        1. モジュールとカウントダウンタイマーを備えたオブジェクト。タイマーを停止させるには、すべての<a href="通常モジュール">通常モジュール</a>を解除する必要がある。基本ルールでは、分析担当者がこれを直接見ることはない。<br>
        2. 爆弾ケースのこと。モジュールとエッジワーク、カウントダウンタイマーなどを含んだ箱。MODなしでは、最大11個のモジュールを搭載した爆弾ケースを出現させられる。
        <br><br>関連用語：<a href="#エッジワーク">エッジワーク</a></p>
     </div>
   </section>
 </li>
 <li>
  <section>
    <h3 class="title"><a name="Bomb Creator">Bomb Creator</a></h3>
    <div class="box">
      <p>
       公式で用意されているフリープレイケースを拡張したMOD。事務所に大きな正方形の板として表示され、持ち上げられる。複数の爆弾を生成したり、エッジワークの数を直感的に変更したり、ルールシードを変更して起動することができる。<br>
       裏面には、開発チームによる様々なアニメやオリジナルのキャラクターイラストがランダムで表示される。
      </p>
    </div>
  </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ボスモジュール">ボスモジュール(Boss Module)</a></h3>
   <div class="box">
     <p>
      (1) 別のモジュールが解除されるたびに解除に必要な情報を生成する<br>
      (2) 解除に他のモジュールの解除が必要である<br>
      のいずれかを満たす通常モジュール。<br>
      例：我忘る勿かれ(Forget Me Not)、思い出(Souvenir)、サイモンのステージ(Simon's Stage)<br><br>
      基本的に、「最終解除」または「他解除必須」の特性を持ち、他のすべてのモジュールが解除されないと解除することができない。複数ボスモジュールがある場合は、互いが存在しないかのように無視し、監視しあうことはない。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1669095833">Boss Module Manager</a>を導入すると、常に最新の無視モジュールリストを利用できる。<br>
      なお、すべてではなく一定数のモジュール解除が必要なモジュールは「準ボス(Semi boss)モジュール」と呼ばれる。
      例：分割スクエア(Divided Square)、健忘症(Amnesia)、永遠に忘る(Forget Infinity)</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="パンフレット">パンフレット(Brochure)</a></h3>
   <div class="box">
     <p>事務所の机にある「MOD」と書かれたアイテム。MODマネージャーやローカルフォルダ、MODマニュアルのPDFへアクセスすることができる。より高機能な<a href="#Mod Manager">MOD Selector</a>や、<a href="#マニュアルレポジトリ">マニュアルレポジトリ</a>があるため、ほぼ使用しない。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Centurion">Centurion</a></h3>
   <div class="box">
     <p>2017年頃、100モジュール登録記念で作られた101個のモジュールを含んだMODミッション及び爆弾ケース。当時登録された99個の通常モジュール + バニラモジュール1個 + 特殊モジュール1個で構成され、チャレンジボム挑戦者にとって一つの登竜門となっている。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=952828429">導入はこちら。</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="チャレンジボム">チャレンジボム(Challenge bomb)</a></h3>
   <div class="box">
     <p>特定の構成の爆弾をいかに早く解除できるか競うミッション。「チャレボム」と略されることもある。チャレンジボムの一覧や部門別ランキングは、<a href="https://bombs.samfun.dev/">チャレンジボムサイト(CBS)</a>で確認/投稿することができる。掲載できる記録には<a href="https://bombs.samfun.dev/rules">ルール</a>があるため、投稿の際は注意すること。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="クラウンカー">クラウンカー(Clown Car)</a></h3>
   <div class="box">
     <p>二人以上の処理担当者が同じ空間で別々の爆弾を解除すること。分析担当者は共有するパターンや分けるパターンなど様々。元々の意味は「ピエロの車」であり、狭い空間に大量の人がいることを指す比喩である。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="色覚サポートモード">色覚サポートモード(Colorblind mode)</a></h3>
   <div class="box">
     <p>モジュールの色を読み取れない処理担当者用に設けられた設定。いくつかのモジュールでは、色に対応した英字や単語を表示することで、色を伝えるような設定に変更することができる。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2036735094">Colorblind helper</a>を使用することで、対応モジュールのモード切替を個別に行うことができる。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Competitive Mode">Competitive Mode</a></h3>
   <div class="box">
     <p>競技用に作られた、複数の処理担当者が(パズルの盤面なども含めて)全く同じ爆弾を実行できるようにするMOD。現在は「運も味方のうち」という理由から、ある程度のランダム性を許容するようになり、過去の遺物となっている。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=732672735">導入はこちら。</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Competitive Mode">処理担当者(Defuser)</a></h3>
   <div class="box">
     <p>爆弾を操作し、マニュアルは見ない人。<br><br>対義語：<a href="#分析担当者">分析担当者</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Competitive Mode">処理担当者プロファイル(Defuser)</a></h3>
   <div class="box">
     <p><a href="#Mod-selector">Mod-selector</a>にて、緑色で表示されるプロファイル。ここで無効にしたモジュールは分析担当者側で許可していても出現しない。<br><br>対義語：<a href="#分析担当者プロファイル">分析担当者プロファイル</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="DBML">Demamd-Based Mod Loading</a></h3>
   <div class="box">
     <p><a href="#Tweaks">Tweaks</a>の機能の一つ。通称「DBML」。ゲーム起動時にすべてのモジュールを読み込まず、爆弾生成時に必要なモジュールだけを読み込んでくれる。</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="DBML">数字根(Digital Root)</a></h3>
   <div class="box">
     <p>MODモジュール解除でよく指示される数学演算の一つ。ある数字の各桁の和を求め、これを一桁になるまで続けて得られる値のこと。<br>
     例：378の数字根は、3 + 7 + 8 = 18, 1 + 8 = 9となり、9である。<br>
    <br>
    整数の数字根は、「元の数から1を引き9で割り、その余りに1を足した数」と等しいことが証明されている。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="バインダー">バインダー(Dossier)</a></h3>
   <div class="box">
     <p>事務所画面および爆弾解除画面で表示される黄色のオブジェクト。escキーを押すと強制的に持ち上げる。<br>
     ゲームの様々なオプションの設定だけではなく、<a href="#Tweaks">Tweaks</a>を導入すれば、ここから事務所に戻らず即座にリトライすることができる。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="DMG">Dynamic Mission Generator</a></h3>
   <div class="box">
     <p>コマンドで、簡単に好みの構成の爆弾を呼び出せるMOD。使用するには、<a href="#Mod Selector">Mod Selector</a>の導入が必要。Mission Generatorと言いつつ、ここからミッションを作成して、Steamに公開することなどはできない。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1633427044">導入はこちら。</a>
    </p>
   </div>
 </section>
</li>
</li>
<li>
 <section>
   <h3 class="title"><a name="エッジワーク">エッジワーク(Edgework)</a></h3>
   <div class="box">
     <p>爆弾上にある<a href="シリアルナンバー">シリアルナンバー</a>とその他の部品。基本は<a href="バッテリー/バッテリーホルダー">バッテリー</a>、<a href="インジケーター">インジケーター</a>、<a href="ポート">ポート</a>、<a href="シリアルナンバー">シリアルナンバー</a>がこれにあたる。2ファクタなどのMODウィジェットも存在する。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="エレベーター">エレベーター(Elevator)</a></h3>
   <div class="box">
     <p>VR限定の機能。机下の小さなスイッチを操作することで、壁面にモジュールが貼られた特殊な部屋で遊ぶことができる。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1300045973">Camera Mover</a>や<a href="TP">Twitch Plays</a>を導入すると、VRを使用しなくても遊ぶことができる。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="エレベーター">耐久モード(Endurance)</a></h3>
   <div class="box">
     <p>
      無限に爆弾を出現させ、どれだけ多くの爆弾解除を続けられるかを目指すモード。<a href="#Factory">Factory</a>、<a href="#Multiple Bombs">Multiple Bombs</a>、<a href="#Tweaks">Tweaks</a>を導入し、<a href="#DMG">Dynamic Mission Generator</a>などのカスタム爆弾生成MODを使って起動することで実行できる。<a href="#タイムモード">タイムモード</a>かつ<a href="#Factory Mode">Factory Mode</a>を「∞ + global time」にすることを推奨する。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="エレベーター">分析担当者(Expert)</a></h3>
   <div class="box">
    <p>マニュアルを見るが、爆弾を見ることができない人。<br><br>対義語：<a href="#処理担当者">処理担当者</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="エレベーター">EFM</a></h3>
   <div class="box">
    <p><a href="#処理担当者">処理担当者</a>と<a href="#分析担当者">分析担当者</a>を兼任し、マニュアルを見ながら爆弾を解除すること。「Experting for myself」の略。本来のゲーム方針には反するものの、制限時間内に一人で考えながら進める力を求められるため、一定数のファンがいる。<a href="#ソロプレイ">ソロプレイ</a>とは異なるため、注意する。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Competitive Mode">分析担当者プロファイル(Expert Profile)</a></h3>
   <div class="box">
     <p><a href="#Mod-selector">Mod-selector</a>にて、オレンジ色で表示されるプロファイル。ここで有効にしたモジュールのみが出現する。ただし、処理担当者プロファイルで無効にされている場合は出現しない。<br><br>対義語：<a href="#処理担当者プロファイル">処理担当者プロファイル</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Competitive Mode">爆発(Explode)</a></h3>
   <div class="box">
     <p>何らかの理由により、大きな爆発音とともにゲームオーバーとなること。リザルト画面では、爆発の原因が記載される。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="Factory">Factory</a></h3>
   <div class="box">
     <p>通常の部屋に加えて、複数の爆弾を解除できるようにベルトコンベアが設置されたゲーム部屋のMOD。ベルトコンベアを使用する場合、<a href="#Multiple Bombs">Multiple Bombs</a>の導入および<a href="#DMG">Dynamic Mission Generator</a>などのカスタム爆弾生成MODでの起動が必要となる。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1307301431">導入はこちら。</a></p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ハードコア">ハードコア</a></h3>
   <div class="box">
     <p>ミスの最大回数が1回の爆弾のこと。ノーミスでの解除が求められる。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ハードコア">ハイライト</a></h3>
   <div class="box">
     <p><a href="#マニュアルレポジトリ">マニュアルレポジトリ</a>の機能の一つ。Ctrl+Shift+クリック(Windows)/Command+Shift+クリック(Mac)で各セルに色を付けられる。レポジトリトップページの「さらに表示」ボタンから、より細かい利用方法を確認することができる。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ハードコア">持ち上げ可能物(Holdable)</a></h3>
   <div class="box">
     <p><a href="#事務所">事務所</a>内で操作できるオブジェクトのこと。公式で用意されている<a href="#バインダー">バインダー</a>などがこれに該当する。MODのオブジェクトを追加することも可能。</p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ハードコア">インジケーター(Indicator)</a></h3>
   <div class="box">
     <p><a href="#エッジワーク">エッジワーク</a>に含まれる、文字とライトで構成された部品のこと。ライトは点灯/消灯の2種類がある。<br>
     MODインジケーターを除き、基本は次の11パターンのどれかになる。似た発音のインジケーターは、誤解されないように注意する必要がある。<br>
     BOB, CAR, CLR, FRK, FRQ, IND, MSA, NSA, SIG, SND, TRN<br>
     同じ文字のインジケーターが一つの爆弾に二つ以上出現することはない。そのため、MODの設定によりインジケーターが12個以上出現することになった場合、残りのインジケーターはすべて「NLL」という特別なインジケーターになる。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ハードコア">インタラクティブ(Interactive)</a></h3>
   <div class="box">
     <p>1. インタラクティブモジュール。モジュールの解除に、分析担当者と処理担当者のやり取りが必須であるモジュールのこと。バニラモジュールの「記憶」や「表比較」のように複数のステージを含むものを指すことが多い。<br>これに対して、バニラモジュールの「ワイヤ」や「キーパッド」のような、モジュールの情報を分析担当者に与えるだけでマニュアルから答えを得られるモジュールを「ノンインタラクティブモジュール」という。<br><br>
        2. インタラクティブマニュアル。一部のモジュールに含まれる、動的に操作できる差分マニュアルのこと。マニュアル内で図形を回転させたり、メモを記入することができ、解読の助けになる。
    </p>
   </div>
 </section>
</li>
<li>
 <section>
   <h3 class="title"><a name="ハードコア">ログファイル(Logfile)</a></h3>
   <div class="box">
     <p>ゲーム内で生成される爆弾の情報を記録したファイルのこと。モジュールの回答やミスの情報が確認できる。<a href="#Logfile Analyzer">Logfile Analyzer</a>を使用することで、より見やすいUIで情報を確認することができる。
      ファイルの場所は、<a href="#マニュアルレポジトリ">マニュアルレポジトリ</a>の「さらに表示」にOSごとのファイルパスが掲載されているが、<a href="#Log Viewer Hotkey"></a>
     
    </p>
   </div>
 </section>
</li>
  </ul>

  <h2>ツール関連</h2>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
 //アコーディオンをクリックした時の動作
 
$('.title').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去し
	}else{//それ以外は
		$(this).addClass('close');//クラス名closeを付与
	}
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function(){
	$('.accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
	$(".open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				//タイトルにクラス名closeを付与し
		var Box =$(element).children('.box');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
});
 </script>
</body>
</html>