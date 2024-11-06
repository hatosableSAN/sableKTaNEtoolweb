package servlet;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/Profile")
@MultipartConfig
public class Profile extends HttpServlet {
 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  RequestDispatcher rd=request.getRequestDispatcher("/WEB-INF/Profile/index.jsp");
		rd.forward(request, response);
 }

 private static Connection getConnection() throws URISyntaxException, SQLException {
  // データベースのURL
  URI dbUri = new URI(System.getenv("DATABASE_URL"));

  String username = dbUri.getUserInfo().split(":")[0];
  String password = dbUri.getUserInfo().split(":")[1];
  String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

  return DriverManager.getConnection(dbUrl, username, password);
}


	
}
