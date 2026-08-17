package servlet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 静的な画面を表示するためのルーティングをまとめたコントローラー。
 * API、ファイル変換、WebSocketなど処理を伴う機能は個別の
 * コントローラーで管理する。
 */
@Controller
public class PageController {

    @GetMapping({"/", "/index"})
    public String index() {
        return "index";
    }

    @GetMapping("/Expert")
    public String expert() {
        return "ExpertSheet/SheetTop";
    }

    @GetMapping("/Calculator")
    public String calculator() {
        return "Calculator/SheetTop";
    }

    @GetMapping("/ConvertMenu")
    public String convertMenu() {
        return "FileConvert/select";
    }

    @GetMapping("/TPCommands")
    public String tpCommands() {
        return "TPCommands/index";
    }

    @GetMapping("/profiles")
    public String profiles() {
        return "profiles/select";
    }

    @GetMapping("/KtaneYaml")
    public String ktaneYaml() {
        return "KtaneYaml/index";
    }
}
