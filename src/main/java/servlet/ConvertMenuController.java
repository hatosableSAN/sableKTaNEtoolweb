package servlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ConvertMenuController {

    @GetMapping("/ConvertMenu")
    public String menu() {
        return "FileConvert/select";
    }
}
