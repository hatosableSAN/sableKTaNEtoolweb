package servlet;

import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class BombBustersMessageController {
    private final BombBustersGameService gameService;

    public BombBustersMessageController(BombBustersGameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/join")
    @SendTo("/topic/state")
    public BombBustersState join(SimpMessageHeaderAccessor accessor) {
        String playerName = resolvePlayerName(accessor);
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.joinPlayer(sessionId, playerName);
    }

    @MessageMapping("/move")
    @SendTo("/topic/state")
    public BombBustersState move(@Payload BombBustersMoveRequest request, SimpMessageHeaderAccessor accessor) {
        String playerName = resolvePlayerName(accessor);
        return gameService.moveCard(request, playerName);
    }

    @MessageMapping("/options")
    @SendTo("/topic/state")
    public BombBustersState updateOptions(@Payload BombBustersStartOptions options, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.updateOptions(sessionId, options);
    }

    @MessageMapping("/target")
    @SendTo("/topic/state")
    public BombBustersState target(@Payload BombBustersTargetRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.submitTarget(sessionId, request);
    }

    @MessageMapping("/resolve")
    @SendTo("/topic/state")
    public BombBustersState resolve(@Payload BombBustersResolveRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.resolveGuess(sessionId, request);
    }

    @MessageMapping("/reveal")
    @SendTo("/topic/state")
    public BombBustersState reveal(@Payload BombBustersRevealRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.revealAction(sessionId, request);
    }

    @MessageMapping("/selfreveal")
    @SendTo("/topic/state")
    public BombBustersState selfReveal(@Payload BombBustersSelfRevealRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.revealSelf(sessionId, request);
    }

    @MessageMapping("/opponentreveal")
    @SendTo("/topic/state")
    public BombBustersState opponentReveal(@Payload BombBustersOpponentRevealRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.revealOpponent(sessionId, request);
    }

    @MessageMapping("/token")
    @SendTo("/topic/state")
    public BombBustersState placeToken(@Payload BombBustersTokenRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.placeToken(sessionId, request);
    }

    @MessageMapping("/wrongtoken")
    @SendTo("/topic/state")
    public BombBustersState placeWrongToken(@Payload BombBustersWrongTokenRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.placeWrongToken(sessionId, request);
    }

    @MessageMapping("/equipment")
    @SendTo("/topic/state")
    public BombBustersState equipment(@Payload BombBustersEquipmentRequest request, SimpMessageHeaderAccessor accessor) {
        String sessionId = resolveHttpSessionId(accessor);
        return gameService.executeEquipment(sessionId, request);
    }

    private String resolvePlayerName(SimpMessageHeaderAccessor accessor) {
        if (accessor == null) {
            return "ゲスト";
        }
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
        if (sessionAttributes == null) {
            return "ゲスト";
        }
        Object name = sessionAttributes.get("playerName");
        if (name == null) {
            return "ゲスト";
        }
        String trimmed = name.toString().trim();
        return trimmed.isEmpty() ? "ゲスト" : trimmed;
    }

    private String resolveHttpSessionId(SimpMessageHeaderAccessor accessor) {
        if (accessor == null) {
            return null;
        }
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
        if (sessionAttributes != null) {
            Object httpSessionId = sessionAttributes.get("HTTP.SESSION.ID");
            if (httpSessionId != null) {
                String id = httpSessionId.toString().trim();
                if (!id.isEmpty()) {
                    return id;
                }
            }
        }
        return accessor.getSessionId();
    }
}
