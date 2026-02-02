package servlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfilesPageController {

    @GetMapping("/profiles")
    public String page() {
        return "profiles/select";
    }
}
