package servlet;

public class BombBustersEquipmentRequest {
    private Integer equipmentNumber;
    private String action;
    private Integer targetPlayerIndex;
    private Integer fromPosition;
    private Integer targetPosition;
    private Integer position;
    private Integer positionA;
    private Integer positionB;

    public BombBustersEquipmentRequest() {}

    public Integer getEquipmentNumber() {
        return equipmentNumber;
    }

    public void setEquipmentNumber(Integer equipmentNumber) {
        this.equipmentNumber = equipmentNumber;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Integer getTargetPlayerIndex() {
        return targetPlayerIndex;
    }

    public void setTargetPlayerIndex(Integer targetPlayerIndex) {
        this.targetPlayerIndex = targetPlayerIndex;
    }

    public Integer getFromPosition() {
        return fromPosition;
    }

    public void setFromPosition(Integer fromPosition) {
        this.fromPosition = fromPosition;
    }

    public Integer getTargetPosition() {
        return targetPosition;
    }

    public void setTargetPosition(Integer targetPosition) {
        this.targetPosition = targetPosition;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Integer getPositionA() {
        return positionA;
    }

    public void setPositionA(Integer positionA) {
        this.positionA = positionA;
    }

    public Integer getPositionB() {
        return positionB;
    }

    public void setPositionB(Integer positionB) {
        this.positionB = positionB;
    }
}
