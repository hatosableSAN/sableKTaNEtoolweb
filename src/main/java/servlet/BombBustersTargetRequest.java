package servlet;

public class BombBustersTargetRequest {
    private int targetPlayerIndex;
    private int targetPosition;
    private Integer targetPlayerIndex2;
    private Integer targetPosition2;
    private Integer targetPosition3;
    private String mode;

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

    public Integer getTargetPlayerIndex2() {
        return targetPlayerIndex2;
    }

    public void setTargetPlayerIndex2(Integer targetPlayerIndex2) {
        this.targetPlayerIndex2 = targetPlayerIndex2;
    }

    public Integer getTargetPosition2() {
        return targetPosition2;
    }

    public void setTargetPosition2(Integer targetPosition2) {
        this.targetPosition2 = targetPosition2;
    }

    public Integer getTargetPosition3() {
        return targetPosition3;
    }

    public void setTargetPosition3(Integer targetPosition3) {
        this.targetPosition3 = targetPosition3;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
