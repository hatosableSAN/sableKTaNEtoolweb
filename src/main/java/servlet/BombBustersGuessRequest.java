package servlet;

public class BombBustersGuessRequest {
    private Double chosenNumber;
    private int targetPlayerIndex;
    private int targetPosition;

    public Double getChosenNumber() {
        return chosenNumber;
    }

    public void setChosenNumber(Double chosenNumber) {
        this.chosenNumber = chosenNumber;
    }

    public int getTargetPlayerIndex() {
        return targetPlayerIndex;
    }

    public void setTargetPlayerIndex(int targetPlayerIndex) {
        this.targetPlayerIndex = targetPlayerIndex;
    }

    public int getTargetPosition() {
        return targetPosition;
    }

    public void setTargetPosition(int targetPosition) {
        this.targetPosition = targetPosition;
    }
}
