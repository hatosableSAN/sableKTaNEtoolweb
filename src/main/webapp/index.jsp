<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>KTaNE Experting Sheet</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script type="text/javascript" src="addportplate.js"></script>

</head>
<body>

                <h1>Hatosable's KTaNE Page</h1>
<p>ようこそ！ここはHatosableによるKeep Talking and Nobody Explodes関連のツールを用意しております。</p>
<a href="./Expert" class="btn btn--yellow">Experting Sheet(処理担当者ツール)</a>
<a href="./ConvertMenu" class="btn btn--blue">JA Manual Converter(準備中)</a>
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

a.btn--yellow {
  display: inline-block;
  color: #000;
  width: 300px;
  height: 50px;
  background-color: #fff100;
  border-bottom: 5px solid #ccc100;
  padding: 10px,10px;
  text-decoration: none;
  text-align: center;
}

a.btn--yellow:active {
  color: #000;
  background: #fff20a;
  border-bottom:none;
  transform: translate(0,2px);

}

a.btn--blue {
  display: inline-block;
  color: rgb(255, 255, 255);
  width: 300px;
  height: 50px;
  background-color: #0004ff;
  border-bottom: 5px solid #06004193;
  padding: 10px,10px;
  text-decoration: none;
  text-align: center;
}
a.btn--blue:active {
  background: #0004ff;
  border-bottom:none;
  transform: translate(0,2px);

}




  </style>
