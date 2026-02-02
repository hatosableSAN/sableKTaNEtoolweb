package servlet;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/profiles")
public class ProfilesController {

    @PostMapping("/download")
    public ResponseEntity<Resource> download(@RequestParam int id) throws IOException {
        String fileName;
        switch (id) {
            case 1: fileName = "Boss module eraser.json"; break;
            case 2: fileName = "Veryhard eraser(exp).json"; break;
            case 3: fileName = "Veryhard eraser(def).json"; break;
            case 4: fileName = "Boss module only.json"; break;
            default: throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid id");
        }
        Resource res = new ClassPathResource("jsondata/" + fileName);
        if (!res.exists()) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        String encoded = URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString()).replace("+", "%20");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encoded)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(res);
    }


}
