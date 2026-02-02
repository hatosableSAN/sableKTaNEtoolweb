package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class FileConvertController {

    @GetMapping("/fileconvert/select")
    public String select(@RequestParam(required = false) String nothtml, Model model) {
        if (nothtml != null) {
            model.addAttribute("nothtml", "1");
        }
        return "FileConvert/select";
    }

    @PostMapping(path = "/fileconvert/convert", consumes = { "multipart/form-data" })
    public Object convert(@RequestParam("select") MultipartFile file,
            @RequestParam("name") String jaName, @RequestParam("creator") String creator,
            @RequestParam(value = "subtitle", required = false) String subtitle,
            @RequestParam(value = "original", required = false) String original,
            @RequestParam(value = "checkbox", required = false) String checkbox,
            RedirectAttributes ra) throws IOException {

        if (file == null || file.getOriginalFilename() == null
                || !file.getOriginalFilename().toLowerCase().endsWith(".html")) {
            ra.addAttribute("nothtml", "1");
            return "redirect:/fileconvert/select";
        }

        String fileName = file.getOriginalFilename();
        String originalName = fileName.replace(".html", "");

        String insertName;
        if (checkbox == null) {
            insertName = originalName + " translated (日本語 — " + jaName + ") (" + creator + ")";
        } else {
            int startindex = fileName.indexOf("(") + 1;
            int endindex = fileName.indexOf(")");
            String OriginalAuthor = "";
            if (startindex > 0 && endindex > startindex) {
                OriginalAuthor = fileName.substring(startindex, endindex);
            }
            insertName = (original != null ? original : "") + " translated (日本語 — " + jaName + ") "
                    + (subtitle != null ? subtitle : "") + " (" + OriginalAuthor + ", " + creator + ")";
        }

        // Build output by reading uploaded HTML and applying transformations similar to original servlet
        BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
        StringBuilder out = new StringBuilder();
        out.append("<!DOCTYPE html>\n");
        // skip first read as original did
        br.readLine();
        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("<meta property=\"")) {
                continue; // skip metadata
            } else if (line.contains("<html lang=\"en\">") || line.contains("<html>")) {
                out.append("<html lang=\"ja\">\n");
            } else if (line.contains("Keep Talking and Nobody Explodes Module</title>")) {
                out.append("    <title" + ">" + jaName + " — Keep Talking and Nobody Explodes Module</title>\n");
            } else if (line.contains("Keep Talking and Nobody Explodes Mod</title>")) {
                out.append("    <title" + ">" + jaName + " — Keep Talking and Nobody Explodes Mod</title>\n");
            } else if (line.contains("   <link rel=\"stylesheet\" type=\"text/css\" href=\"css/font.css\">")) {
                out.append(line).append("\n");
                out.append("    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/font-japanese.css\">\n");
            } else if (line.contains("<span class=\"page-header-section-title\">")) {
                out.append("                <span class=\"page-header-section-title\">" + jaName + "</span>\n");
            } else if (line.contains(" <h2>On the Subject of")) {
                out.append("                <h2>モジュール詳細：" + jaName + "</h2>\n");
            } else if (line.contains("  <div class=\"page-footer relative-footer\">")) {
                String replaced = line.replace("Page", "ページ").replace(" of ", "/");
                out.append(replaced).append("\n");
            } else if (line.contains("        .page-footer::before { content: 'Page '; }")) {
                String replaced = line.replace("Page", "ページ");
                out.append(replaced).append("\n");
            } else if (line.contains("        .page-footer::after { content: ' of ")) {
                String replaced = line.replace(" of ", "/");
                out.append(replaced).append("\n");
            } else if (line.contains("        .page-footer::before { content: \"Page \"; }")) {
                String replaced = line.replace("Page", "ページ");
                out.append(replaced).append("\n");
            } else if (line.contains("        .page-footer::after { content: \" of ")) {
                String replaced = line.replace(" of ", "/");
                out.append(replaced).append("\n");
            } else if (line.contains("</html>")) {
                out.append(line).append("\n");
            } else {
                out.append(line).append("\n");
            }
        }

        String encodedname = URLEncoder.encode(insertName + ".html", "utf-8");
        encodedname = encodedname.replace("+", "%20");
        String disp = "attachment;filename*=utf8''" + encodedname;

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, disp);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        byte[] body = out.toString().getBytes(StandardCharsets.UTF_8);
        headers.setContentLength(body.length);

        return new ResponseEntity<>(body, headers, HttpStatus.OK);
    }
}
