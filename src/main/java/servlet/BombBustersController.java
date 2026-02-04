package servlet;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class BombBustersController {
    private final BombBustersGameService gameService;
    private final SimpMessagingTemplate messagingTemplate;

    public BombBustersController(BombBustersGameService gameService, SimpMessagingTemplate messagingTemplate) {
        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/bomb-busters-simutate")
    public String index() {
        return "BombBustersSimutate/login";
    }

    @GetMapping("/bomb-busters-simutate/play")
    public String play(HttpSession session) {
        Object name = session.getAttribute("playerName");
        if (name == null || name.toString().trim().isEmpty()) {
            return "redirect:/bomb-busters-simutate";
        }
        return "BombBustersSimutate/play";
    }

    @GetMapping(path = "/bomb-busters-simutate/session", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> session(HttpSession session) {
        Map<String, Object> body = new HashMap<>();
        Object name = session.getAttribute("playerName");
        body.put("playerName", name == null ? "" : name.toString());
        return ResponseEntity.ok(body);
    }

    @PostMapping(path = "/bomb-busters-simutate/join", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> join(@RequestBody PlayerNameRequest request, HttpSession session) {
        String name = request == null ? null : request.getName();
        if (name == null || name.trim().isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("ok", false);
            error.put("message", "名前を入力してください。");
            return ResponseEntity.badRequest().body(error);
        }
        session.setAttribute("playerName", name.trim());
        gameService.joinPlayer(session.getId(), name.trim());
        Map<String, Object> body = new HashMap<>();
        body.put("ok", true);
        body.put("playerName", name.trim());
        return ResponseEntity.ok(body);
    }

    @GetMapping(path = "/bomb-busters-simutate/state", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BombBustersState> state() {
        return ResponseEntity.ok(gameService.getState());
    }

    @GetMapping(path = "/bomb-busters-simutate/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> me(HttpSession session) {
        String sessionId = session.getId();
        Integer index = gameService.getPlayerIndex(sessionId);
        Map<String, Object> body = new HashMap<>();
        body.put("playerIndex", index);
        body.put("isHost", index != null && index == 0);
        return ResponseEntity.ok(body);
    }

    @PostMapping(path = "/bomb-busters-simutate/start", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BombBustersState> start(@RequestBody(required = false) BombBustersStartOptions options, HttpSession session) {
        String sessionId = session.getId();
        BombBustersState state = gameService.startGame(sessionId, options);
        messagingTemplate.convertAndSend("/topic/state", state);
        return ResponseEntity.ok(state);
    }

    @PostMapping(path = "/bomb-busters-simutate/end", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BombBustersState> end(HttpSession session) {
        String sessionId = session.getId();
        BombBustersState state = gameService.endGame(sessionId);
        messagingTemplate.convertAndSend("/topic/state", state);
        return ResponseEntity.ok(state);
    }

    @PostMapping(path = "/bomb-busters-simutate/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        String sessionId = session.getId();
        BombBustersState state = gameService.leavePlayer(sessionId);
        session.invalidate();
        messagingTemplate.convertAndSend("/topic/state", state);
        Map<String, Object> body = new HashMap<>();
        body.put("ok", true);
        return ResponseEntity.ok(body);
    }

    public static class PlayerNameRequest {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
