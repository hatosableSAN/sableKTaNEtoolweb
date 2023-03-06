const Letters=("A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.+./").split(".");
searchWord = function(){
 var  base_d = [],
      input = document.getElementById('inputnumber').value;
      inputbase = document.getElementById('inputbase').value;
      inputN= document.getElementById('inputN').value;

      offset=10;
      if(inputbase=="52"){
       offset=0;
      }
      
      base_d = makedigitstr(input,offset,base_d);//各桁に分解
      
      var input_pre = Number(convertdeci(base_d,inputbase));//一旦10進数に
      console.log("input"+base_d);
      if(!(isNaN(input_pre))){
      document.getElementById( "baseother" ).value = convertbasefrom(input_pre,inputN,offset);
      document.getElementById( "base10" ).value = input_pre;
      document.getElementById( "base2" ).value =  convertbasefrom(input_pre,2,offset);
      document.getElementById( "base16" ).value = convertbasefrom(input_pre,16,offset);
      document.getElementById( "base36" ).value = convertbasefrom(input_pre,36,offset);

      }else{
       document.getElementById( "base10" ).value = 'この文字は変換できません。';
       document.getElementById( "base2" ).value =   'この文字は変換できません。';
       document.getElementById( "base16" ).value =  'この文字は変換できません。';
       document.getElementById( "base36" ).value =  'この文字は変換できません。';
       document.getElementById( "baseother" ).value =  'この文字は変換できません。';
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
      if(inputbase==1){//ﾌｧｱｱｱｱｱ
       
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

   convertbasefrom = function(decinum,basenum,offset){//10進数をn進数にする
    var modlist=[];
    var result='';
    var i=0;
   //各桁を掛けていくよ

   if(decinum==0){
    return 0;
   }
   if(basenum==1){
    if(decinum>=20){decinum=20;}
    for(i=0; i < decinum ; i++){
     result=result+'1';
    }
    result=result+'...';
   }
   if(basenum==0){
    return result='変換先の進数値が空欄です。'
   }
   while(decinum / basenum!=0&&i<50) {
    modlist.unshift(decinum % basenum);
    decinum=Math.floor(decinum/basenum);
    i++;
   }

   for (var i = 0; i < modlist.length; ++i) {
    var thisdigit=modlist[i];
    if(thisdigit>=offset){//その桁は英字や記号ですか？
     thisdigit=Letters[thisdigit-offset];//A=10,B=11...
    }
    result=result+thisdigit;
  }


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
    
    if(Letterexp.test(thisdigit)||thisdigit=='+'||thisdigit=='/'){//その桁は英字や記号ですか？
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


