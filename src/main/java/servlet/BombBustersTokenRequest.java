package servlet;

public class BombBustersTokenRequest {
    private int position;

    public BombBustersTokenRequest() {
    }

    public BombBustersTokenRequest(int position) {
        this.position = position;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
