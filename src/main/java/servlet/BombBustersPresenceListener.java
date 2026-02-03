package servlet;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class BombBustersPresenceListener {
    private final BombBustersGameService gameService;
    private final SimpMessagingTemplate messagingTemplate;

    public BombBustersPresenceListener(BombBustersGameService gameService, SimpMessagingTemplate messagingTemplate) {
        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = resolveHttpSessionId(accessor);
        BombBustersState state = gameService.leavePlayer(sessionId);
        messagingTemplate.convertAndSend("/topic/state", state);
    }

    private String resolveHttpSessionId(StompHeaderAccessor accessor) {
        if (accessor == null) {
            return null;
        }
        if (accessor.getSessionAttributes() != null) {
            Object httpSessionId = accessor.getSessionAttributes().get("HTTP.SESSION.ID");
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
