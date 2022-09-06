package servlet;

import java.io.BufferedReader;
import java.io.EOFException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.net.URLEncoder;
import java.nio.file.Paths;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.apache.tomcat.util.http.fileupload.FileUploadBase.IOFileUploadException;

@WebServlet("/Converter")
@MultipartConfig
public class Converter extends HttpServlet {


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/octet-stream;charset=UTF-8");
		request.setCharacterEncoding("utf-8");
  Part part=null;
  try{
  part=request.getPart("select");
  }catch(EOFException e){
   RequestDispatcher rd=request.getRequestDispatcher("/WEB-INF/FileConvert/fileError.jsp");
   rd.forward(request, response);
  }

String JAName =request.getParameter("name");
InputStream input=part.getInputStream();
if(!(part.getSubmittedFileName().contains(".html"))){
  request.setAttribute("nothtml","1");
  RequestDispatcher rd=request.getRequestDispatcher("/WEB-INF/FileConvert/fileError.jsp");
rd.forward(request, response);
}else{
String originalName=part.getSubmittedFileName().replace(".html", "");
String Creator=request.getParameter("creator");
String Subtitle=request.getParameter("subtitle");
String Original=request.getParameter("original");
String Check=request.getParameter("checkbox");


//ファイル名を取得
//String filename=part.getSubmittedFileName();//ie対応が不要な場合
//アップロードするフォルダ
//実際にファイルが保存されるパス確認
String insertName;
System.out.println(Check);
if(!(Check.equals("on"))){
insertName=originalName+" translated (日本語 — "+JAName+") ("+Creator+")";
}else{
insertName=Original+" translated (日本語 — "+JAName+") "+Subtitle+" ("+Creator+")";
}
String encodedname =URLEncoder.encode(insertName+".html","utf-8");
encodedname = encodedname.replace("+", "%20");
response.setHeader("Content-Disposition", "attachment;filename*=utf8''"+ encodedname);

BufferedReader br = new BufferedReader(new InputStreamReader(input,"UTF-8")) ;
String text="<!DOCTYPE html>";//最初の文字列は固定
PrintWriter writer = response.getWriter();
writer.write(text);
writer.write("\n");
text = br.readLine();
while ((text = br.readLine()) != null) {
if(text.contains("<html>")){
  	text="<html lang=\"ja\">";//ja入りに置き換え
  	write(writer,text);
  }

  else if(text.contains(" Keep Talking and Nobody Explodes Module</title>")){
  	text="    <title>"+JAName+" — Keep Talking and Nobody Explodes Module</title>";//文字化け防止のため一応別枠処理
  	write(writer,text);
  }

  else if(text.contains("   <link rel=\"stylesheet\" type=\"text/css\" href=\"css/font.css\">")){
  	
  	String inserttext="    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/font-japanese.css\">";//font-japanese追加
  	write(writer,text);
  	write(writer,inserttext);//後ろに挿入するようにしたよ

  }
  else if(text.contains("<span class=\"page-header-section-title\">")){
  	text="                <span class=\"page-header-section-title\">"+JAName+"</span>";//セクションタイトルの変更
  	write(writer,text);
  }

  else if(text.contains(" <h2>On the Subject of")){
  	text="                <h2>モジュール詳細："+JAName+"</h2>";//タイトルの変更
  	write(writer,text);
  }

  else if(text.contains("  <div class=\"page-footer relative-footer\">")){//ページ数
  	text = text.replace("Page", "ページ");
  	text = text.replace(" of ", "/");
  	write(writer,text);
  }else{
  	write(writer,text);
  }
}
}


 }



 


private void write(PrintWriter writer,String text){
	writer.write(text);
	writer.write("\n");
	System.out.println(":"+text);//追加する
}

}


