package servlet;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletContext;


@WebServlet("/ProfilesGet")
@MultipartConfig
public class ProfilesGet extends HttpServlet {
 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  RequestDispatcher rd=request.getRequestDispatcher("/WEB-INF/ProfilesRepo/select.jsp");
		rd.forward(request, response);
 }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		//idをゲット
		int FileId=Integer.parseInt(request.getParameter("id"));
  String FileName=new String();
  if(FileId==1){
  FileName="Boss module eraser";
  }else if(FileId==2){
   FileName="Veryhard eraser(exp)";
  }else if(FileId==3){
   FileName="Veryhard eraser(def)";
  }
  ServletContext context = this.getServletContext();
  Path file = Paths.get(context.getRealPath("/WEB-INF/jsondata/"+FileName+".json"));
 List<String> text = Files.readAllLines(file);
 String FileStr="";
 for(int i=0;i<text.size();i++){
  FileStr=FileStr+text.get(i);
 }
 response.setHeader("Content-Disposition", "attachment;filename*=utf8''"+ FileName+".json");
 PrintWriter writer = response.getWriter();
 writer.write(FileStr);
		RequestDispatcher rd=request.getRequestDispatcher("/WEB-INF/ProfilesRepo/select.jsp");
		rd.forward(request, response);
	}
}
