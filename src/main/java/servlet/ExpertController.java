package servlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExpertController {
    @GetMapping("/Expert")
    public String expert(){
        return "ExpertSheet/SheetTop";
    }
}
