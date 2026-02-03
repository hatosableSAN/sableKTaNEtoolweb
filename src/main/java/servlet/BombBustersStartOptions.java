package servlet;

public class BombBustersStartOptions {
    private RangeOption yellow;
    private RangeOption red;
    private int cardMin = 1;
    private int cardMax = 12;
    private java.util.List<Integer> excludedEquipments = new java.util.ArrayList<>();

    public RangeOption getYellow() {
        return yellow;
    }

    public void setYellow(RangeOption yellow) {
        this.yellow = yellow;
    }

    public RangeOption getRed() {
        return red;
    }

    public void setRed(RangeOption red) {
        this.red = red;
    }

    public int getCardMin() {
        return cardMin;
    }

    public void setCardMin(int cardMin) {
        this.cardMin = cardMin;
    }

    public int getCardMax() {
        return cardMax;
    }

    public void setCardMax(int cardMax) {
        this.cardMax = cardMax;
    }

    public java.util.List<Integer> getExcludedEquipments() {
        return excludedEquipments;
    }

    public void setExcludedEquipments(java.util.List<Integer> excludedEquipments) {
        this.excludedEquipments = excludedEquipments;
    }

    public static class RangeOption {
        private int min = 1;
        private int max = 11;
        private int pool = 0;
        private int draw = 0;

        public int getMin() {
            return min;
        }

        public void setMin(int min) {
            this.min = min;
        }

        public int getMax() {
            return max;
        }

        public void setMax(int max) {
            this.max = max;
        }

        public int getPool() {
            return pool;
        }

        public void setPool(int pool) {
            this.pool = pool;
        }

        public int getDraw() {
            return draw;
        }

        public void setDraw(int draw) {
            this.draw = draw;
        }
    }
}
