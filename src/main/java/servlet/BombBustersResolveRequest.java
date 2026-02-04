package servlet;

public class BombBustersResolveRequest {
    private Double chosenNumber;
    private Double chosenNumber2;
    private String guessType;
    private String guessType2;
    private int targetPlayerIndex;
    private int targetPosition;

    public Double getChosenNumber() {
        return chosenNumber;
    }

    public void setChosenNumber(Double chosenNumber) {
        this.chosenNumber = chosenNumber;
    }

    public Double getChosenNumber2() {
        return chosenNumber2;
    }

    public void setChosenNumber2(Double chosenNumber2) {
        this.chosenNumber2 = chosenNumber2;
    }

    public String getGuessType() {
        return guessType;
    }

    public void setGuessType(String guessType) {
        this.guessType = guessType;
    }

    public String getGuessType2() {
        return guessType2;
    }

    public void setGuessType2(String guessType2) {
        this.guessType2 = guessType2;
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
