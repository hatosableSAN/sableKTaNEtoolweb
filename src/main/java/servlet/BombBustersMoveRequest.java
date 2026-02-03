package servlet;

public class BombBustersMoveRequest {
    private int cardId;
    private Double x;
    private Double y;
    private Boolean faceDown;

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Boolean getFaceDown() {
        return faceDown;
    }

    public void setFaceDown(Boolean faceDown) {
        this.faceDown = faceDown;
    }
}
