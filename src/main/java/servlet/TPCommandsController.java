package servlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TPCommandsController {

    @GetMapping("/TPCommands")
    public String index() {
        return "TPCommands/index";
    }
}
