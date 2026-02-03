package servlet;

import java.util.List;

public class BombBustersRevealRequest {
    private String actionType;
    private List<Integer> positions;

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public List<Integer> getPositions() {
        return positions;
    }

    public void setPositions(List<Integer> positions) {
        this.positions = positions;
    }
}
