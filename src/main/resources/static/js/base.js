/**** copied from original js/base.js ****/
const Letters=("A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.0.1.2.3.4.5.6.7.8.9.+./").split(".");
searchWord = function(){
 var  base_d = [],
      input = document.getElementById('inputnumber').value;
      inputbase = document.getElementById('inputbase').value;
      inputN= document.getElementById('inputN').value;

      offset=10;
      if(inputbase=="52"||inputbase=="64"){
       offset=0;
      }
      if(Number(inputbase)<=36){
       input=input.toUpperCase();
      }

      
      base_d = makedigitstr(input,offset,base_d);//各桁に分解
      
      var input_pre = Number(convertdeci(base_d,inputbase));//一旦10進数に
      console.log("input"+base_d);
      if(!(isNaN(input_pre))){
      document.getElementById( "baseother" ).value = convertbasefrom(input_pre,inputN);
      document.getElementById( "base10" ).value = input_pre;
      document.getElementById( "base2" ).value =  convertbasefrom(input_pre,2);
      document.getElementById( "base16" ).value = convertbasefrom(input_pre,16);
      document.getElementById( "base36" ).value = convertbasefrom(input_pre,36);

      }else{
       document.getElementById( "base10" ).value = 'この文字は変換できません。';
       document.getElementById( "base2" ).value =   'この文字は変換できません。';
       document.getElementById( "base16" ).value =  'この文字は変換できません。';
       document.getElementById( "base36" ).value =  'この文字は変換できません。';
       document.getElementById( "baseother" ).value =  'この文字は変換できません。';
      }
      if(Number(input)<0&&Number(inputN)==-3){
       document.getElementById( "baseother" ).value = convertbalanced(Number(input),true);
      }  
     
}


  convertdeci = function(base_d,basenum){
      var result=0;
      var multiplier=1;
     //各桁を掛けていくよ
     if(base_d.length==0){//ひらがなとか
      return NaN;
      
     }
     for (var i = 0; i < base_d.length; ++i) {
      console.log(base_d[i]);
      if(isNaN(base_d[i])){//ひらがなとか
       return NaN;
       
      } 

      if(basenum==1){//ﾌｧｱｱｱｱｱ
       
       return base_d.length;
      }
      else{
      if(base_d[i]<basenum){//0~base-1以外の数字が入力されているか確認
       console.log("mimam");
      result=result+Number(base_d[i])*multiplier;
      multiplier=multiplier*basenum;//乗数を2乗
      }else{
       console.log("over");
       return NaN;
      }
     }
    }
     return result;
   }

   convertbasefrom = function(decinum,basenum){//10進数をn進数にする
    var modlist=[];
    var result='';
    var i=0;
   //各桁を掛けていくよ

   if(decinum==0&&basenum!=64){//0は0のまま
    return 0;
   }
   if(basenum==1){//1進数 最大20個1表示
    if(decinum>=20){decinum=20;}
    for(i=0; i < decinum ; i++){
     result=result+'1';
    }
    result=result+'...';
   }
   if(basenum==-3){//均衡三進数
     return result=convertbalanced(decinum);
   }
   else if(basenum<1||basenum//進数エラー
    =="-"){
    return result='変換先の進数値が不正な値です。'
   }
   while(decinum / basenum!=0&&i<50) {//それ以外(50桁まで対応)
    modlist.unshift(decinum % basenum);//余りを逆順で入れる
    decinum=Math.floor(decinum/basenum);//商を次の割られる数にする
    i++;
   }

   for (var i = 0; i < modlist.length; ++i) {
    var thisdigit=modlist[i];
    if(basenum!=64&&basenum!=52){//52,64進数ではない？
    if(thisdigit>=10){//その桁は0~9の数字ではないですか？
     thisdigit=Letters[thisdigit-10];//36進数までは-9してアルファベット変換
   
   }
  }else{
    thisdigit=Letters[thisdigit];//52,64進数はそのままのLetters参照
   }
   result=result+thisdigit;
   }


  return result;
 }
 convertbalanced= function(input,minus){
  if(minus==true){
   input=input*(-1);
   var p="-";
   var m="+";   
  }else{
   var p="+";
   var m="-";
  }
  
  var digit;
  var result="";
  do{
   digit=input%3;
   if(digit==2){result=m+result;input++;}
   input=Math.floor(input/3);
   if(digit==0){result="0"+result;};
   if(digit==1){result=p+result;};
  }while(input/3!=0);
  
  return result;
 }

 // $('.search-result__list').empty();
 // $('.search-result__hit-num').empty();

 // const selectexp = document.getElementById('searchlist').expselect;


   // output
makedigitstr = function(numstr,offset,baselist){
  Letterexp =  new RegExp('[A-Za-z]');
   for (var i = 0; i < numstr.length; ++i) {
    var thisdigit=numstr.charAt(i);
    console.log("thisdigit:"+thisdigit);
    if(Letterexp.test(thisdigit)||offset!=10){//その桁は英字や記号ですか？
     console.log("thisis letter");
     thisdigit=Letters.indexOf(thisdigit)+offset;//A=10,B=11....
     console.log("this digit:"+thisdigit);
   }
    
    baselist.unshift(Number(thisdigit));

         }

  return baselist;
      }


// searchWordの実行
$('#inputN').on('input', searchWord);
$('#inputnumber').on('input', searchWord);
$('#inputbase').on('input', searchWord);
