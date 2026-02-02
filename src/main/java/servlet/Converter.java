package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Converter")
@MultipartConfig
public class Converter extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Redirect legacy GET to the new FileConvert page
        response.sendRedirect(request.getContextPath() + "/fileconvert/select");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Deprecated: POST handling moved to Spring controller at POST /fileconvert/convert
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain; charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_GONE); // 410 Gone
        response.getWriter().write("This legacy Converter endpoint has been removed. Use the new UI at /fileconvert/select or POST to /fileconvert/convert");
    }

    @SuppressWarnings("unused")
    private void write(PrintWriter writer, String text) {
        writer.write(text);
        writer.write("\n");
        System.out.println(":" + text);
    }

}


