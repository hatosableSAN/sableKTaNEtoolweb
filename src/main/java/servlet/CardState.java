package servlet;

public class CardState {
    private int id;
    private int value;
    private double x;
    private double y;
    private boolean faceDown;

    public CardState() {
    }

    public CardState(int id, int value, double x, double y, boolean faceDown) {
        this.id = id;
        this.value = value;
        this.x = x;
        this.y = y;
        this.faceDown = faceDown;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isFaceDown() {
        return faceDown;
    }

    public void setFaceDown(boolean faceDown) {
        this.faceDown = faceDown;
    }
}
