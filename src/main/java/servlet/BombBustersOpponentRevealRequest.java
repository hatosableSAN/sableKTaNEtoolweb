package servlet;

public class BombBustersOpponentRevealRequest {
    private int position;

    public BombBustersOpponentRevealRequest() {
    }

    public BombBustersOpponentRevealRequest(int position) {
        this.position = position;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
