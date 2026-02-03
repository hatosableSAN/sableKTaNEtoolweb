package servlet;

public class BombBustersResolveRequest {
    private Double chosenNumber;
    private String guessType;
    private int targetPlayerIndex;
    private int targetPosition;

    public Double getChosenNumber() {
        return chosenNumber;
    }

    public void setChosenNumber(Double chosenNumber) {
        this.chosenNumber = chosenNumber;
    }

    public String getGuessType() {
        return guessType;
    }

    public void setGuessType(String guessType) {
        this.guessType = guessType;
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
