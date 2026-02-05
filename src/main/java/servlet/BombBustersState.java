package servlet;

import java.util.List;

public class BombBustersState {
    private List<CardState> cards;
    private List<String> players;
    private List<List<Double>> hands;
    private List<List<Boolean>> revealed;
    private List<List<Double>> wrongHints;
    private List<List<Integer>> differentLabels;
    private List<List<Integer>> equalLabels;
    private boolean gameStarted;
    private BombBustersStartOptions options;
    private List<Double> deckNumbers;
    private List<Integer> equipmentNumbers;
    private List<Integer> usedEquipmentNumbers;
    private int mistakesRemaining;
    private int parentIndex;
    private int turnIndex;
    private Integer lastGuessTarget;
    private Integer lastGuessPosition;
    private Boolean lastGuessCorrect;
    private Integer lastDeclaredBy;
    private Integer lastDeclaredBase;
    private boolean lastDeclaredYellow;
    private String lastDeclaredMode;
    private Integer lastDeclaredBase2;
    private boolean lastDeclaredYellow2;
    private Integer pendingFromIndex;
    private Integer pendingTargetIndex;
    private Integer pendingPosition;
    private Integer pendingTargetIndex2;
    private Integer pendingPosition2;
    private Integer pendingPosition3;
    private String pendingTargetMode;
    private Integer pendingOpponentRevealFrom;
    private Integer pendingOpponentRevealPosition;
    private Integer pendingOpponentRevealPosition2;
    private Integer pendingOpponentRevealPosition3;
    private Integer pendingOpponentRevealBase;
    private boolean pendingOpponentRevealYellow;
    private Integer pendingWrongTokenFrom;
    private Integer pendingWrongTokenPosition;
    private Integer pendingWrongTokenPosition2;
    private Integer pendingWrongTokenPosition3;
    private List<Boolean> detectorUsed;
    private Integer pendingDetectorGuesser;
    private Integer pendingDetectorBase;
    private boolean pendingDetectorYellow;
    private Integer pendingSelfRevealFrom;
    private Integer pendingSelfRevealBase;
    private boolean pendingSelfRevealYellow;
    private boolean preTokenPhase;
    private int tokenTurnIndex;
    private boolean missionEnded;
    private boolean missionSuccess;
    private Integer pendingEquipmentNumber;
    private Integer pendingEquipmentFromPosition;
    private Integer pendingEquipmentTargetPosition;
    private boolean pendingEquipmentWaitingTargetChoice;
    private Integer equipmentInUseNumber;
    private Integer equipmentInUseBy;
    private boolean swapPendingConfirmation;
    private Integer swapHighlightPlayerA;
    private Integer swapHighlightPlayerB;
    private Double swapHighlightValueA;
    private Double swapHighlightValueB;
    private Integer swapHighlightPositionA;
    private Integer swapHighlightPositionB;
    private Integer radarNumber;
    private List<String> radarPlayers;
    private Integer iceActiveBy;
    private String lastAction;
    private String lastUpdatedBy;
    private long version;

    public BombBustersState() {
    }

    public BombBustersState(List<CardState> cards, List<String> players, List<List<Double>> hands, List<List<Boolean>> revealed,
                            List<List<Double>> wrongHints, List<List<Integer>> differentLabels, List<List<Integer>> equalLabels, boolean gameStarted,
                            BombBustersStartOptions options, List<Double> deckNumbers, List<Integer> equipmentNumbers,
                            List<Integer> usedEquipmentNumbers, int mistakesRemaining,
                            int parentIndex, int turnIndex, Integer lastGuessTarget, Integer lastGuessPosition,
                            Boolean lastGuessCorrect, Integer lastDeclaredBy, Integer lastDeclaredBase,
                            boolean lastDeclaredYellow, String lastDeclaredMode,
                            Integer lastDeclaredBase2, boolean lastDeclaredYellow2,
                            Integer pendingFromIndex, Integer pendingTargetIndex,
                            Integer pendingPosition, Integer pendingTargetIndex2, Integer pendingPosition2, Integer pendingPosition3,
                            String pendingTargetMode,
                            Integer pendingOpponentRevealFrom, Integer pendingOpponentRevealPosition, Integer pendingOpponentRevealPosition2,
                            Integer pendingOpponentRevealPosition3, Integer pendingOpponentRevealBase, boolean pendingOpponentRevealYellow,
                            Integer pendingWrongTokenFrom, Integer pendingWrongTokenPosition, Integer pendingWrongTokenPosition2,
                            Integer pendingWrongTokenPosition3,
                            List<Boolean> detectorUsed, Integer pendingDetectorGuesser, Integer pendingDetectorBase,
                            boolean pendingDetectorYellow,
                            Integer pendingSelfRevealFrom, Integer pendingSelfRevealBase,
                            boolean pendingSelfRevealYellow, boolean preTokenPhase, int tokenTurnIndex,
                            boolean missionEnded, boolean missionSuccess,
                            Integer pendingEquipmentNumber, Integer pendingEquipmentFromPosition, Integer pendingEquipmentTargetPosition,
                            boolean pendingEquipmentWaitingTargetChoice, Integer equipmentInUseNumber, Integer equipmentInUseBy,
                            boolean swapPendingConfirmation, Integer swapHighlightPlayerA,
                            Integer swapHighlightPlayerB, Double swapHighlightValueA, Double swapHighlightValueB,
                            Integer swapHighlightPositionA, Integer swapHighlightPositionB,
                            Integer radarNumber, List<String> radarPlayers,
                            Integer iceActiveBy,
                            String lastAction, String lastUpdatedBy, long version) {
        this.cards = cards;
        this.players = players;
        this.hands = hands;
        this.revealed = revealed;
        this.wrongHints = wrongHints;
        this.differentLabels = differentLabels;
        this.equalLabels = equalLabels;
        this.gameStarted = gameStarted;
        this.options = options;
        this.deckNumbers = deckNumbers;
        this.equipmentNumbers = equipmentNumbers;
        this.usedEquipmentNumbers = usedEquipmentNumbers;
        this.mistakesRemaining = mistakesRemaining;
        this.parentIndex = parentIndex;
        this.turnIndex = turnIndex;
        this.lastGuessTarget = lastGuessTarget;
        this.lastGuessPosition = lastGuessPosition;
        this.lastGuessCorrect = lastGuessCorrect;
        this.lastDeclaredBy = lastDeclaredBy;
        this.lastDeclaredBase = lastDeclaredBase;
        this.lastDeclaredYellow = lastDeclaredYellow;
        this.lastDeclaredMode = lastDeclaredMode;
        this.lastDeclaredBase2 = lastDeclaredBase2;
        this.lastDeclaredYellow2 = lastDeclaredYellow2;
        this.pendingFromIndex = pendingFromIndex;
        this.pendingTargetIndex = pendingTargetIndex;
        this.pendingPosition = pendingPosition;
        this.pendingTargetIndex2 = pendingTargetIndex2;
        this.pendingPosition2 = pendingPosition2;
        this.pendingPosition3 = pendingPosition3;
        this.pendingTargetMode = pendingTargetMode;
        this.pendingOpponentRevealFrom = pendingOpponentRevealFrom;
        this.pendingOpponentRevealPosition = pendingOpponentRevealPosition;
        this.pendingOpponentRevealPosition2 = pendingOpponentRevealPosition2;
        this.pendingOpponentRevealPosition3 = pendingOpponentRevealPosition3;
        this.pendingOpponentRevealBase = pendingOpponentRevealBase;
        this.pendingOpponentRevealYellow = pendingOpponentRevealYellow;
        this.pendingWrongTokenFrom = pendingWrongTokenFrom;
        this.pendingWrongTokenPosition = pendingWrongTokenPosition;
        this.pendingWrongTokenPosition2 = pendingWrongTokenPosition2;
        this.pendingWrongTokenPosition3 = pendingWrongTokenPosition3;
        this.detectorUsed = detectorUsed;
        this.pendingDetectorGuesser = pendingDetectorGuesser;
        this.pendingDetectorBase = pendingDetectorBase;
        this.pendingDetectorYellow = pendingDetectorYellow;
        this.pendingSelfRevealFrom = pendingSelfRevealFrom;
        this.pendingSelfRevealBase = pendingSelfRevealBase;
        this.pendingSelfRevealYellow = pendingSelfRevealYellow;
        this.preTokenPhase = preTokenPhase;
        this.tokenTurnIndex = tokenTurnIndex;
        this.missionEnded = missionEnded;
        this.missionSuccess = missionSuccess;
        this.pendingEquipmentNumber = pendingEquipmentNumber;
        this.pendingEquipmentFromPosition = pendingEquipmentFromPosition;
        this.pendingEquipmentTargetPosition = pendingEquipmentTargetPosition;
        this.pendingEquipmentWaitingTargetChoice = pendingEquipmentWaitingTargetChoice;
        this.equipmentInUseNumber = equipmentInUseNumber;
        this.equipmentInUseBy = equipmentInUseBy;
        this.swapPendingConfirmation = swapPendingConfirmation;
        this.swapHighlightPlayerA = swapHighlightPlayerA;
        this.swapHighlightPlayerB = swapHighlightPlayerB;
        this.swapHighlightValueA = swapHighlightValueA;
        this.swapHighlightValueB = swapHighlightValueB;
        this.swapHighlightPositionA = swapHighlightPositionA;
        this.swapHighlightPositionB = swapHighlightPositionB;
        this.radarNumber = radarNumber;
        this.radarPlayers = radarPlayers;
        this.iceActiveBy = iceActiveBy;
        this.lastAction = lastAction;
        this.lastUpdatedBy = lastUpdatedBy;
        this.version = version;
    }

    public List<CardState> getCards() {
        return cards;
    }

    public void setCards(List<CardState> cards) {
        this.cards = cards;
    }

    public List<String> getPlayers() {
        return players;
    }

    public void setPlayers(List<String> players) {
        this.players = players;
    }

    public List<List<Double>> getHands() {
        return hands;
    }

    public void setHands(List<List<Double>> hands) {
        this.hands = hands;
    }

    public List<List<Boolean>> getRevealed() {
        return revealed;
    }

    public void setRevealed(List<List<Boolean>> revealed) {
        this.revealed = revealed;
    }

    public List<List<Double>> getWrongHints() {
        return wrongHints;
    }

    public void setWrongHints(List<List<Double>> wrongHints) {
        this.wrongHints = wrongHints;
    }

    public List<List<Integer>> getDifferentLabels() {
        return differentLabels;
    }

    public void setDifferentLabels(List<List<Integer>> differentLabels) {
        this.differentLabels = differentLabels;
    }

    public List<List<Integer>> getEqualLabels() {
        return equalLabels;
    }

    public void setEqualLabels(List<List<Integer>> equalLabels) {
        this.equalLabels = equalLabels;
    }

    public boolean isGameStarted() {
        return gameStarted;
    }

    public void setGameStarted(boolean gameStarted) {
        this.gameStarted = gameStarted;
    }

    public BombBustersStartOptions getOptions() {
        return options;
    }

    public void setOptions(BombBustersStartOptions options) {
        this.options = options;
    }

    public List<Double> getDeckNumbers() {
        return deckNumbers;
    }

    public void setDeckNumbers(List<Double> deckNumbers) {
        this.deckNumbers = deckNumbers;
    }

    public List<Integer> getEquipmentNumbers() {
        return equipmentNumbers;
    }

    public void setEquipmentNumbers(List<Integer> equipmentNumbers) {
        this.equipmentNumbers = equipmentNumbers;
    }

    public List<Integer> getUsedEquipmentNumbers() {
        return usedEquipmentNumbers;
    }

    public void setUsedEquipmentNumbers(List<Integer> usedEquipmentNumbers) {
        this.usedEquipmentNumbers = usedEquipmentNumbers;
    }

    public int getMistakesRemaining() {
        return mistakesRemaining;
    }

    public void setMistakesRemaining(int mistakesRemaining) {
        this.mistakesRemaining = mistakesRemaining;
    }

    public Integer getPendingEquipmentNumber() {
        return pendingEquipmentNumber;
    }

    public void setPendingEquipmentNumber(Integer pendingEquipmentNumber) {
        this.pendingEquipmentNumber = pendingEquipmentNumber;
    }

    public Integer getPendingEquipmentFromPosition() {
        return pendingEquipmentFromPosition;
    }

    public void setPendingEquipmentFromPosition(Integer pendingEquipmentFromPosition) {
        this.pendingEquipmentFromPosition = pendingEquipmentFromPosition;
    }

    public Integer getPendingEquipmentTargetPosition() {
        return pendingEquipmentTargetPosition;
    }

    public void setPendingEquipmentTargetPosition(Integer pendingEquipmentTargetPosition) {
        this.pendingEquipmentTargetPosition = pendingEquipmentTargetPosition;
    }

    public Integer getEquipmentInUseNumber() {
        return equipmentInUseNumber;
    }

    public void setEquipmentInUseNumber(Integer equipmentInUseNumber) {
        this.equipmentInUseNumber = equipmentInUseNumber;
    }

    public Integer getEquipmentInUseBy() {
        return equipmentInUseBy;
    }

    public void setEquipmentInUseBy(Integer equipmentInUseBy) {
        this.equipmentInUseBy = equipmentInUseBy;
    }

    public boolean isPendingEquipmentWaitingTargetChoice() {
        return pendingEquipmentWaitingTargetChoice;
    }

    public void setPendingEquipmentWaitingTargetChoice(boolean pendingEquipmentWaitingTargetChoice) {
        this.pendingEquipmentWaitingTargetChoice = pendingEquipmentWaitingTargetChoice;
    }

    public boolean isSwapPendingConfirmation() {
        return swapPendingConfirmation;
    }

    public void setSwapPendingConfirmation(boolean swapPendingConfirmation) {
        this.swapPendingConfirmation = swapPendingConfirmation;
    }

    public Integer getSwapHighlightPlayerA() {
        return swapHighlightPlayerA;
    }

    public void setSwapHighlightPlayerA(Integer swapHighlightPlayerA) {
        this.swapHighlightPlayerA = swapHighlightPlayerA;
    }

    public Integer getSwapHighlightPlayerB() {
        return swapHighlightPlayerB;
    }

    public void setSwapHighlightPlayerB(Integer swapHighlightPlayerB) {
        this.swapHighlightPlayerB = swapHighlightPlayerB;
    }

    public Double getSwapHighlightValueA() {
        return swapHighlightValueA;
    }

    public void setSwapHighlightValueA(Double swapHighlightValueA) {
        this.swapHighlightValueA = swapHighlightValueA;
    }

    public Double getSwapHighlightValueB() {
        return swapHighlightValueB;
    }

    public void setSwapHighlightValueB(Double swapHighlightValueB) {
        this.swapHighlightValueB = swapHighlightValueB;
    }

    public Integer getSwapHighlightPositionA() {
        return swapHighlightPositionA;
    }

    public void setSwapHighlightPositionA(Integer swapHighlightPositionA) {
        this.swapHighlightPositionA = swapHighlightPositionA;
    }

    public Integer getSwapHighlightPositionB() {
        return swapHighlightPositionB;
    }

    public void setSwapHighlightPositionB(Integer swapHighlightPositionB) {
        this.swapHighlightPositionB = swapHighlightPositionB;
    }

    public Integer getRadarNumber() {
        return radarNumber;
    }

    public void setRadarNumber(Integer radarNumber) {
        this.radarNumber = radarNumber;
    }

    public List<String> getRadarPlayers() {
        return radarPlayers;
    }

    public void setRadarPlayers(List<String> radarPlayers) {
        this.radarPlayers = radarPlayers;
    }

    public Integer getIceActiveBy() {
        return iceActiveBy;
    }

    public void setIceActiveBy(Integer iceActiveBy) {
        this.iceActiveBy = iceActiveBy;
    }

    public int getParentIndex() {
        return parentIndex;
    }

    public void setParentIndex(int parentIndex) {
        this.parentIndex = parentIndex;
    }

    public int getTurnIndex() {
        return turnIndex;
    }

    public void setTurnIndex(int turnIndex) {
        this.turnIndex = turnIndex;
    }

    public Integer getLastGuessTarget() {
        return lastGuessTarget;
    }

    public void setLastGuessTarget(Integer lastGuessTarget) {
        this.lastGuessTarget = lastGuessTarget;
    }

    public Integer getLastGuessPosition() {
        return lastGuessPosition;
    }

    public void setLastGuessPosition(Integer lastGuessPosition) {
        this.lastGuessPosition = lastGuessPosition;
    }

    public Boolean getLastGuessCorrect() {
        return lastGuessCorrect;
    }

    public void setLastGuessCorrect(Boolean lastGuessCorrect) {
        this.lastGuessCorrect = lastGuessCorrect;
    }

    public Integer getLastDeclaredBy() {
        return lastDeclaredBy;
    }

    public void setLastDeclaredBy(Integer lastDeclaredBy) {
        this.lastDeclaredBy = lastDeclaredBy;
    }

    public Integer getLastDeclaredBase() {
        return lastDeclaredBase;
    }

    public void setLastDeclaredBase(Integer lastDeclaredBase) {
        this.lastDeclaredBase = lastDeclaredBase;
    }

    public boolean isLastDeclaredYellow() {
        return lastDeclaredYellow;
    }

    public void setLastDeclaredYellow(boolean lastDeclaredYellow) {
        this.lastDeclaredYellow = lastDeclaredYellow;
    }

    public String getLastDeclaredMode() {
        return lastDeclaredMode;
    }

    public void setLastDeclaredMode(String lastDeclaredMode) {
        this.lastDeclaredMode = lastDeclaredMode;
    }

    public Integer getLastDeclaredBase2() {
        return lastDeclaredBase2;
    }

    public void setLastDeclaredBase2(Integer lastDeclaredBase2) {
        this.lastDeclaredBase2 = lastDeclaredBase2;
    }

    public boolean isLastDeclaredYellow2() {
        return lastDeclaredYellow2;
    }

    public void setLastDeclaredYellow2(boolean lastDeclaredYellow2) {
        this.lastDeclaredYellow2 = lastDeclaredYellow2;
    }

    public Integer getPendingFromIndex() {
        return pendingFromIndex;
    }

    public void setPendingFromIndex(Integer pendingFromIndex) {
        this.pendingFromIndex = pendingFromIndex;
    }

    public Integer getPendingTargetIndex() {
        return pendingTargetIndex;
    }

    public void setPendingTargetIndex(Integer pendingTargetIndex) {
        this.pendingTargetIndex = pendingTargetIndex;
    }

    public Integer getPendingPosition() {
        return pendingPosition;
    }

    public void setPendingPosition(Integer pendingPosition) {
        this.pendingPosition = pendingPosition;
    }

    public Integer getPendingTargetIndex2() {
        return pendingTargetIndex2;
    }

    public void setPendingTargetIndex2(Integer pendingTargetIndex2) {
        this.pendingTargetIndex2 = pendingTargetIndex2;
    }

    public Integer getPendingPosition2() {
        return pendingPosition2;
    }

    public void setPendingPosition2(Integer pendingPosition2) {
        this.pendingPosition2 = pendingPosition2;
    }

    public Integer getPendingPosition3() {
        return pendingPosition3;
    }

    public void setPendingPosition3(Integer pendingPosition3) {
        this.pendingPosition3 = pendingPosition3;
    }

    public String getPendingTargetMode() {
        return pendingTargetMode;
    }

    public void setPendingTargetMode(String pendingTargetMode) {
        this.pendingTargetMode = pendingTargetMode;
    }

    public Integer getPendingOpponentRevealFrom() {
        return pendingOpponentRevealFrom;
    }

    public void setPendingOpponentRevealFrom(Integer pendingOpponentRevealFrom) {
        this.pendingOpponentRevealFrom = pendingOpponentRevealFrom;
    }

    public Integer getPendingOpponentRevealPosition() {
        return pendingOpponentRevealPosition;
    }

    public void setPendingOpponentRevealPosition(Integer pendingOpponentRevealPosition) {
        this.pendingOpponentRevealPosition = pendingOpponentRevealPosition;
    }

    public Integer getPendingOpponentRevealPosition2() {
        return pendingOpponentRevealPosition2;
    }

    public void setPendingOpponentRevealPosition2(Integer pendingOpponentRevealPosition2) {
        this.pendingOpponentRevealPosition2 = pendingOpponentRevealPosition2;
    }

    public Integer getPendingOpponentRevealPosition3() {
        return pendingOpponentRevealPosition3;
    }

    public void setPendingOpponentRevealPosition3(Integer pendingOpponentRevealPosition3) {
        this.pendingOpponentRevealPosition3 = pendingOpponentRevealPosition3;
    }

    public Integer getPendingOpponentRevealBase() {
        return pendingOpponentRevealBase;
    }

    public void setPendingOpponentRevealBase(Integer pendingOpponentRevealBase) {
        this.pendingOpponentRevealBase = pendingOpponentRevealBase;
    }

    public boolean isPendingOpponentRevealYellow() {
        return pendingOpponentRevealYellow;
    }

    public void setPendingOpponentRevealYellow(boolean pendingOpponentRevealYellow) {
        this.pendingOpponentRevealYellow = pendingOpponentRevealYellow;
    }

    public Integer getPendingWrongTokenFrom() {
        return pendingWrongTokenFrom;
    }

    public void setPendingWrongTokenFrom(Integer pendingWrongTokenFrom) {
        this.pendingWrongTokenFrom = pendingWrongTokenFrom;
    }

    public Integer getPendingWrongTokenPosition() {
        return pendingWrongTokenPosition;
    }

    public void setPendingWrongTokenPosition(Integer pendingWrongTokenPosition) {
        this.pendingWrongTokenPosition = pendingWrongTokenPosition;
    }

    public Integer getPendingWrongTokenPosition2() {
        return pendingWrongTokenPosition2;
    }

    public void setPendingWrongTokenPosition2(Integer pendingWrongTokenPosition2) {
        this.pendingWrongTokenPosition2 = pendingWrongTokenPosition2;
    }

    public Integer getPendingWrongTokenPosition3() {
        return pendingWrongTokenPosition3;
    }

    public void setPendingWrongTokenPosition3(Integer pendingWrongTokenPosition3) {
        this.pendingWrongTokenPosition3 = pendingWrongTokenPosition3;
    }

    public List<Boolean> getDetectorUsed() {
        return detectorUsed;
    }

    public void setDetectorUsed(List<Boolean> detectorUsed) {
        this.detectorUsed = detectorUsed;
    }

    public Integer getPendingDetectorGuesser() {
        return pendingDetectorGuesser;
    }

    public void setPendingDetectorGuesser(Integer pendingDetectorGuesser) {
        this.pendingDetectorGuesser = pendingDetectorGuesser;
    }

    public Integer getPendingDetectorBase() {
        return pendingDetectorBase;
    }

    public void setPendingDetectorBase(Integer pendingDetectorBase) {
        this.pendingDetectorBase = pendingDetectorBase;
    }

    public boolean isPendingDetectorYellow() {
        return pendingDetectorYellow;
    }

    public void setPendingDetectorYellow(boolean pendingDetectorYellow) {
        this.pendingDetectorYellow = pendingDetectorYellow;
    }

    public Integer getPendingSelfRevealFrom() {
        return pendingSelfRevealFrom;
    }

    public void setPendingSelfRevealFrom(Integer pendingSelfRevealFrom) {
        this.pendingSelfRevealFrom = pendingSelfRevealFrom;
    }

    public Integer getPendingSelfRevealBase() {
        return pendingSelfRevealBase;
    }

    public void setPendingSelfRevealBase(Integer pendingSelfRevealBase) {
        this.pendingSelfRevealBase = pendingSelfRevealBase;
    }

    public boolean isPendingSelfRevealYellow() {
        return pendingSelfRevealYellow;
    }

    public void setPendingSelfRevealYellow(boolean pendingSelfRevealYellow) {
        this.pendingSelfRevealYellow = pendingSelfRevealYellow;
    }

    public boolean isPreTokenPhase() {
        return preTokenPhase;
    }

    public void setPreTokenPhase(boolean preTokenPhase) {
        this.preTokenPhase = preTokenPhase;
    }

    public int getTokenTurnIndex() {
        return tokenTurnIndex;
    }

    public void setTokenTurnIndex(int tokenTurnIndex) {
        this.tokenTurnIndex = tokenTurnIndex;
    }

    public boolean isMissionEnded() {
        return missionEnded;
    }

    public void setMissionEnded(boolean missionEnded) {
        this.missionEnded = missionEnded;
    }

    public boolean isMissionSuccess() {
        return missionSuccess;
    }

    public void setMissionSuccess(boolean missionSuccess) {
        this.missionSuccess = missionSuccess;
    }

    public String getLastAction() {
        return lastAction;
    }

    public void setLastAction(String lastAction) {
        this.lastAction = lastAction;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}
