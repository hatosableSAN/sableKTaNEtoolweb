package servlet;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class BombBustersGameService {
    private final List<CardState> cards = new ArrayList<>();
    private final String[] slotSessions = new String[4];
    private final String[] slotNames = new String[4];
    private final List<List<Double>> hands = new ArrayList<>();
    private final List<List<Boolean>> revealed = new ArrayList<>();
    private final List<List<Double>> wrongHints = new ArrayList<>();
    private final List<List<Integer>> differentLabels = new ArrayList<>();
    private final List<List<Integer>> equalLabels = new ArrayList<>();
    private boolean gameStarted = false;
    private BombBustersStartOptions currentOptions = new BombBustersStartOptions();
    private List<Double> currentDeckNumbers = new ArrayList<>();
    private List<Integer> equipmentNumbers = new ArrayList<>();
    private final List<Integer> usedEquipmentNumbers = new ArrayList<>();
    private int mistakesRemaining = 4;
    private int parentIndex = -1;
    private int turnIndex = -1;
    private Integer lastGuessTarget = null;
    private Integer lastGuessPosition = null;
    private Boolean lastGuessCorrect = null;
    private Integer pendingFromIndex = null;
    private Integer pendingTargetIndex = null;
    private Integer pendingPosition = null;
    private Integer pendingTargetIndex2 = null;
    private Integer pendingPosition2 = null;
    private Integer pendingPosition3 = null;
    private String pendingTargetMode = "single";
    private Integer pendingOpponentRevealFrom = null;
    private Integer pendingOpponentRevealPosition = null;
    private Integer pendingOpponentRevealPosition2 = null;
    private Integer pendingOpponentRevealPosition3 = null;
    private Integer pendingOpponentRevealBase = null;
    private boolean pendingOpponentRevealYellow = false;
    private Integer pendingWrongTokenFrom = null;
    private Integer pendingWrongTokenPosition = null;
    private Integer pendingWrongTokenPosition2 = null;
    private final boolean[] detectorUsed = new boolean[4];
    private Integer pendingDetectorGuesser = null;
    private Integer pendingDetectorBase = null;
    private boolean pendingDetectorYellow = false;
    private Integer pendingSelfRevealFrom = null;
    private Integer pendingSelfRevealBase = null;
    private boolean pendingSelfRevealYellow = false;
    private boolean preTokenPhase = false;
    private int tokenTurnIndex = -1;
    private final boolean[] tokenPlaced = new boolean[4];

    private boolean missionEnded = false;
    private boolean missionSuccess = false;

    private Integer pendingEquipmentNumber = null;
    private Integer pendingEquipmentFromPosition = null;
    private Integer pendingEquipmentTargetPosition = null;
    private boolean pendingEquipmentWaitingTargetChoice = false;
    private Integer equipmentInUseNumber = null;
    private Integer equipmentInUseBy = null;

    private boolean swapPendingConfirmation = false;
    private Integer swapHighlightPlayerA = null;
    private Integer swapHighlightPlayerB = null;
    private Double swapHighlightValueA = null;
    private Double swapHighlightValueB = null;
    private Integer swapHighlightPositionA = null;
    private Integer swapHighlightPositionB = null;

    private long version = 0;
    private String lastAction = "待機中";
    private String lastUpdatedBy = "";

    public BombBustersGameService() {
        initializeCards();
    }

    public synchronized BombBustersState getState() {
        return new BombBustersState(
                cloneCards(),
                snapshotPlayers(),
                snapshotHands(),
                snapshotRevealed(),
                snapshotWrongHints(),
                snapshotDifferentLabels(),
                snapshotEqualLabels(),
                gameStarted,
                cloneOptions(currentOptions),
                snapshotDeckNumbers(),
                snapshotEquipmentNumbers(),
                snapshotUsedEquipmentNumbers(),
                mistakesRemaining,
                parentIndex,
                turnIndex,
                lastGuessTarget,
                lastGuessPosition,
                lastGuessCorrect,
                pendingFromIndex,
                pendingTargetIndex,
                pendingPosition,
                pendingTargetIndex2,
                pendingPosition2,
                pendingPosition3,
                pendingTargetMode,
                pendingOpponentRevealFrom,
                pendingOpponentRevealPosition,
                pendingOpponentRevealPosition2,
                pendingOpponentRevealPosition3,
                pendingOpponentRevealBase,
                pendingOpponentRevealYellow,
                pendingWrongTokenFrom,
                pendingWrongTokenPosition,
                pendingWrongTokenPosition2,
                snapshotDetectorUsed(),
                pendingDetectorGuesser,
                pendingDetectorBase,
                pendingDetectorYellow,
                pendingSelfRevealFrom,
                pendingSelfRevealBase,
                pendingSelfRevealYellow,
                preTokenPhase,
                tokenTurnIndex,
                missionEnded,
                missionSuccess,
                pendingEquipmentNumber,
                pendingEquipmentFromPosition,
                pendingEquipmentTargetPosition,
                pendingEquipmentWaitingTargetChoice,
                equipmentInUseNumber,
                equipmentInUseBy,
                swapPendingConfirmation,
                swapHighlightPlayerA,
                swapHighlightPlayerB,
                swapHighlightValueA,
                swapHighlightValueB,
                swapHighlightPositionA,
                swapHighlightPositionB,
                lastAction,
                lastUpdatedBy,
                version
        );
    }

    public synchronized BombBustersState moveCard(BombBustersMoveRequest request, String playerName) {
        if (request == null) {
            return getState();
        }
        for (CardState card : cards) {
            if (card.getId() == request.getCardId()) {
                if (request.getX() != null) {
                    card.setX(request.getX());
                }
                if (request.getY() != null) {
                    card.setY(request.getY());
                }
                if (request.getFaceDown() != null) {
                    card.setFaceDown(request.getFaceDown());
                }
                version += 1;
                lastUpdatedBy = playerName;
                lastAction = buildActionMessage(card, request);
                break;
            }
        }
        return getState();
    }

    public synchronized BombBustersState joinPlayer(String sessionId, String playerName) {
        if (sessionId == null || sessionId.isEmpty()) {
            return getState();
        }
        Integer existingSlot = findSlotBySession(sessionId);
        if (existingSlot != null) {
            slotNames[existingSlot] = playerName;
            lastAction = "再接続";
            lastUpdatedBy = playerName;
            version += 1;
            return getState();
        }
        int emptySlot = findEmptySlot();
        if (emptySlot == -1) {
            lastAction = "満員";
            lastUpdatedBy = playerName;
            return getState();
        }
        slotSessions[emptySlot] = sessionId;
        slotNames[emptySlot] = playerName;
        lastAction = "参加";
        lastUpdatedBy = playerName;
        version += 1;
        return getState();
    }

    public synchronized BombBustersState leavePlayer(String sessionId) {
        if (sessionId == null || sessionId.isEmpty()) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot != null) {
            String name = slotNames[slot];
            slotSessions[slot] = null;
            slotNames[slot] = null;
            lastAction = "退出";
            lastUpdatedBy = name;
            version += 1;
        }
        return getState();
    }

    public synchronized BombBustersState startGame(String sessionId, BombBustersStartOptions options) {
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot != 0) {
            lastAction = "開始不可";
            lastUpdatedBy = slot == null ? "不明" : slotNames[slot];
            return getState();
        }
        List<Integer> active = getActivePlayerIndices();
        if (active.isEmpty()) {
            lastAction = "開始不可";
            lastUpdatedBy = "不明";
            return getState();
        }
        currentOptions = sanitizeOptions(options);
        initializeHands(currentOptions);
        initializeRevealed();
        initializeWrongHints();
        initializeDifferentLabels();
        initializeEqualLabels();
        equipmentNumbers = generateEquipmentNumbers(currentOptions);
        usedEquipmentNumbers.clear();
        equipmentInUseNumber = null;
        equipmentInUseBy = null;
        mistakesRemaining = 4;
        parentIndex = active.get((int) (Math.random() * active.size()));
        turnIndex = parentIndex;
        preTokenPhase = true;
        tokenTurnIndex = parentIndex;
        lastGuessTarget = null;
        lastGuessPosition = null;
        lastGuessCorrect = null;
        pendingFromIndex = null;
        pendingTargetIndex = null;
        pendingPosition = null;
        pendingTargetIndex2 = null;
        pendingPosition2 = null;
        pendingPosition3 = null;
        pendingTargetMode = "single";
        pendingOpponentRevealFrom = null;
        pendingOpponentRevealPosition = null;
        pendingOpponentRevealPosition2 = null;
        pendingOpponentRevealPosition3 = null;
        pendingOpponentRevealBase = null;
        pendingOpponentRevealYellow = false;
        pendingWrongTokenFrom = null;
        pendingWrongTokenPosition = null;
        pendingWrongTokenPosition2 = null;
        pendingDetectorGuesser = null;
        pendingDetectorBase = null;
        pendingDetectorYellow = false;
        pendingWrongTokenFrom = null;
        pendingWrongTokenPosition = null;
        pendingWrongTokenPosition2 = null;
        for (int i = 0; i < detectorUsed.length; i++) {
            detectorUsed[i] = false;
        }
        pendingSelfRevealFrom = null;
        pendingSelfRevealBase = null;
        pendingSelfRevealYellow = false;
        for (int i = 0; i < tokenPlaced.length; i++) {
            tokenPlaced[i] = false;
        }
        if (active.size() <= 1) {
            preTokenPhase = false;
            tokenTurnIndex = -1;
        }
        missionEnded = false;
        missionSuccess = false;
        gameStarted = true;
        lastAction = "ゲーム開始";
        lastUpdatedBy = slotNames[0] == null ? "プレイヤー1" : slotNames[0];
        version += 1;
        return getState();
    }

    public synchronized Integer getPlayerIndex(String sessionId) {
        Integer slot = findSlotBySession(sessionId);
        return slot == null ? -1 : slot;
    }

    public synchronized BombBustersState updateOptions(String sessionId, BombBustersStartOptions options) {
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot != 0) {
            return getState();
        }
        currentOptions = sanitizeOptions(options);
        lastAction = "設定変更";
        lastUpdatedBy = slotNames[0] == null ? "プレイヤー1" : slotNames[0];
        version += 1;
        return getState();
    }

    public synchronized BombBustersState endGame(String sessionId) {
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot != 0) {
            lastAction = "終了不可";
            lastUpdatedBy = slot == null ? "不明" : slotNames[slot];
            return getState();
        }
        for (int i = 0; i < revealed.size(); i++) {
            List<Boolean> row = revealed.get(i);
            for (int j = 0; j < row.size(); j++) {
                row.set(j, true);
            }
        }
        gameStarted = false;
        currentDeckNumbers = new ArrayList<>();
        equipmentNumbers = new ArrayList<>();
        usedEquipmentNumbers.clear();
        mistakesRemaining = 4;
        parentIndex = -1;
        turnIndex = -1;
        lastGuessTarget = null;
        lastGuessPosition = null;
        lastGuessCorrect = null;
        pendingFromIndex = null;
        pendingTargetIndex = null;
        pendingPosition = null;
        pendingTargetIndex2 = null;
        pendingPosition2 = null;
        pendingPosition3 = null;
        pendingTargetMode = "single";
        pendingOpponentRevealFrom = null;
        pendingOpponentRevealPosition = null;
        pendingOpponentRevealPosition2 = null;
        pendingOpponentRevealPosition3 = null;
        pendingOpponentRevealBase = null;
        pendingOpponentRevealYellow = false;
        pendingWrongTokenFrom = null;
        pendingWrongTokenPosition = null;
        pendingWrongTokenPosition2 = null;
        pendingDetectorGuesser = null;
        pendingDetectorBase = null;
        pendingDetectorYellow = false;
        for (int i = 0; i < detectorUsed.length; i++) {
            detectorUsed[i] = false;
        }
        pendingSelfRevealFrom = null;
        pendingSelfRevealBase = null;
        pendingSelfRevealYellow = false;
        preTokenPhase = false;
        tokenTurnIndex = -1;
        for (int i = 0; i < tokenPlaced.length; i++) {
            tokenPlaced[i] = false;
        }
        equipmentInUseNumber = null;
        equipmentInUseBy = null;
        missionEnded = false;
        missionSuccess = false;
        lastAction = "ゲーム終了";
        lastUpdatedBy = slotNames[0] == null ? "プレイヤー1" : slotNames[0];
        version += 1;
        return getState();
    }

    private String buildActionMessage(CardState card, BombBustersMoveRequest request) {
        if (request.getFaceDown() != null) {
            return card.getValue() + " のカードを" + (request.getFaceDown() ? "裏向き" : "表向き") + "に変更";
        }
        return card.getValue() + " のカードを移動";
    }

    private void initializeCards() {
        double startX = 18;
        double startY = 400;
        double gapX = 6;
        double cardW = 40;
        double cardH = 56;
        int columns = 13;
        for (int i = 0; i < 13; i++) {
            int row = i / columns;
            int col = i % columns;
            double x = startX + col * (cardW + gapX);
            double y = startY + row * (cardH + gapX);
            cards.add(new CardState(i + 1, i + 1, x, y, false));
        }
    }

    private void initializeHands(BombBustersStartOptions options) {
        hands.clear();
        List<Double> deck = new ArrayList<>();
        int min = 1;
        int max = 12;
        if (options != null) {
            min = Math.max(1, options.getCardMin());
            max = Math.min(12, options.getCardMax());
        }
        if (min > max) {
            int tmp = min;
            min = max;
            max = tmp;
        }
        for (int value = min; value <= max; value++) {
            for (int i = 0; i < 4; i++) {
                deck.add((double) value);
            }
        }
        if (options != null) {
            addSpecialNumbers(deck, options.getYellow(), 0.1);
            addSpecialNumbers(deck, options.getRed(), 0.5);
        }
        currentDeckNumbers = buildDeckNumbers(deck);
        Collections.shuffle(deck);
        for (int i = 0; i < 4; i++) {
            hands.add(new ArrayList<>());
        }
        for (int i = 0; i < deck.size(); i++) {
            hands.get(i % 4).add(deck.get(i));
        }
        for (List<Double> hand : hands) {
            Collections.sort(hand);
        }
    }

    private void initializeRevealed() {
        revealed.clear();
        for (List<Double> hand : hands) {
            List<Boolean> row = new ArrayList<>();
            for (int i = 0; i < hand.size(); i++) {
                row.add(false);
            }
            revealed.add(row);
        }
    }

    private void initializeWrongHints() {
        wrongHints.clear();
        for (List<Double> hand : hands) {
            List<Double> row = new ArrayList<>();
            for (int i = 0; i < hand.size(); i++) {
                row.add(null);
            }
            wrongHints.add(row);
        }
    }

    private void initializeDifferentLabels() {
        differentLabels.clear();
        for (List<Double> hand : hands) {
            List<Integer> row = new ArrayList<>();
            for (int i = 0; i < hand.size(); i++) {
                row.add(0);
            }
            differentLabels.add(row);
        }
    }

    private void initializeEqualLabels() {
        equalLabels.clear();
        for (List<Double> hand : hands) {
            List<Integer> row = new ArrayList<>();
            for (int i = 0; i < hand.size(); i++) {
                row.add(0);
            }
            equalLabels.add(row);
        }
    }


    private List<CardState> cloneCards() {
        List<CardState> snapshot = new ArrayList<>();
        for (CardState card : cards) {
            snapshot.add(new CardState(card.getId(), card.getValue(), card.getX(), card.getY(), card.isFaceDown()));
        }
        return Collections.unmodifiableList(snapshot);
    }

    private List<String> snapshotPlayers() {
        List<String> players = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            players.add(slotNames[i] == null ? "" : slotNames[i]);
        }
        return Collections.unmodifiableList(players);
    }

    private List<List<Boolean>> snapshotRevealed() {
        List<List<Boolean>> snapshot = new ArrayList<>();
        for (List<Boolean> row : revealed) {
            snapshot.add(Collections.unmodifiableList(new ArrayList<>(row)));
        }
        return Collections.unmodifiableList(snapshot);
    }

    private List<List<Double>> snapshotWrongHints() {
        List<List<Double>> snapshot = new ArrayList<>();
        for (List<Double> row : wrongHints) {
            snapshot.add(Collections.unmodifiableList(new ArrayList<>(row)));
        }
        return Collections.unmodifiableList(snapshot);
    }

    private List<List<Integer>> snapshotDifferentLabels() {
        List<List<Integer>> snapshot = new ArrayList<>();
        for (List<Integer> row : differentLabels) {
            snapshot.add(Collections.unmodifiableList(new ArrayList<>(row)));
        }
        return Collections.unmodifiableList(snapshot);
    }

    private List<List<Integer>> snapshotEqualLabels() {
        List<List<Integer>> snapshot = new ArrayList<>();
        for (List<Integer> row : equalLabels) {
            snapshot.add(Collections.unmodifiableList(new ArrayList<>(row)));
        }
        return Collections.unmodifiableList(snapshot);
    }

    private List<List<Double>> snapshotHands() {
        List<List<Double>> snapshot = new ArrayList<>();
        if (hands.isEmpty()) {
            for (int i = 0; i < 4; i++) {
                snapshot.add(Collections.unmodifiableList(new ArrayList<>()));
            }
            return Collections.unmodifiableList(snapshot);
        }
        for (List<Double> hand : hands) {
            snapshot.add(Collections.unmodifiableList(new ArrayList<>(hand)));
        }
        return Collections.unmodifiableList(snapshot);
    }

    private void addSpecialNumbers(List<Double> deck, BombBustersStartOptions.RangeOption option, double delta) {
        if (option == null) {
            return;
        }
        int min = clamp(option.getMin(), 1, 11);
        int max = clamp(option.getMax(), min, 11);
        int pool = clamp(option.getPool(), 0, max - min + 1);
        List<Integer> candidates = new ArrayList<>();
        for (int value = min; value <= max; value++) {
            candidates.add(value);
        }
        Collections.shuffle(candidates);
        List<Integer> poolNumbers = new ArrayList<>(candidates.subList(0, pool));
        for (int value : poolNumbers) {
            deck.add(value + delta);
        }
    }

    private int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }

    private BombBustersStartOptions sanitizeOptions(BombBustersStartOptions options) {
        BombBustersStartOptions sanitized = new BombBustersStartOptions();
        sanitized.setYellow(sanitizeRange(options == null ? null : options.getYellow(), 4));
        sanitized.setRed(sanitizeRange(options == null ? null : options.getRed(), 3));
        int cardMin = 1;
        int cardMax = 12;
        if (options != null) {
            cardMin = options.getCardMin();
            cardMax = options.getCardMax();
        }
        cardMin = clamp(cardMin, 1, 12);
        cardMax = clamp(cardMax, 1, 12);
        if (cardMin > cardMax) {
            int tmp = cardMin;
            cardMin = cardMax;
            cardMax = tmp;
        }
        sanitized.setCardMin(cardMin);
        sanitized.setCardMax(cardMax);
        List<Integer> excluded = new ArrayList<>();
        if (options != null && options.getExcludedEquipments() != null) {
            for (Integer value : options.getExcludedEquipments()) {
                if (value == null) {
                    continue;
                }
                int number = value;
                if (number < 1 || number > 12) {
                    continue;
                }
                if (!excluded.contains(number)) {
                    excluded.add(number);
                }
            }
        }
        Collections.sort(excluded);
        sanitized.setExcludedEquipments(excluded);
        return sanitized;
    }

    private BombBustersStartOptions.RangeOption sanitizeRange(BombBustersStartOptions.RangeOption range, int poolLimit) {
        BombBustersStartOptions.RangeOption result = new BombBustersStartOptions.RangeOption();
        if (range == null) {
            return result;
        }
        result.setMin(range.getMin());
        result.setMax(range.getMax());
        int pool = range.getPool();
        if (poolLimit > 0) {
            pool = Math.min(pool, poolLimit);
        }
        result.setPool(pool);
        int draw = range.getDraw();
        if (poolLimit > 0) {
            draw = Math.min(draw, poolLimit);
        }
        if (pool >= 0) {
            draw = Math.min(draw, pool);
        }
        result.setDraw(draw);
        return result;
    }

    private BombBustersStartOptions cloneOptions(BombBustersStartOptions options) {
        return sanitizeOptions(options);
    }

    private List<Double> buildDeckNumbers(List<Double> deck) {
        List<Double> numbers = new ArrayList<>();
        for (Double value : deck) {
            if (!numbers.contains(value)) {
                numbers.add(value);
            }
        }
        Collections.sort(numbers);
        return numbers;
    }

    private List<Double> snapshotDeckNumbers() {
        return Collections.unmodifiableList(new ArrayList<>(currentDeckNumbers));
    }

    private List<Integer> generateEquipmentNumbers(BombBustersStartOptions options) {
        List<Integer> numbers = new ArrayList<>();
        List<Integer> excluded = options == null ? Collections.emptyList() : options.getExcludedEquipments();
        for (int value = 1; value <= 12; value++) {
            if (excluded != null && excluded.contains(value)) {
                continue;
            }
            numbers.add(value);
        }
        Collections.shuffle(numbers);
        int count = Math.min(4, numbers.size());
        List<Integer> picked = new ArrayList<>(numbers.subList(0, count));
        Collections.sort(picked);
        return picked;
    }

    private List<Integer> snapshotEquipmentNumbers() {
        return Collections.unmodifiableList(new ArrayList<>(equipmentNumbers));
    }

    private List<Integer> snapshotUsedEquipmentNumbers() {
        return Collections.unmodifiableList(new ArrayList<>(usedEquipmentNumbers));
    }

    private List<Integer> getActivePlayerIndices() {
        List<Integer> active = new ArrayList<>();
        for (int i = 0; i < slotSessions.length; i++) {
            if (slotSessions[i] != null && !slotSessions[i].isEmpty()) {
                active.add(i);
            }
        }
        return active;
    }

    private int nextActiveIndex(int current) {
        int[] order = {0, 1, 3, 2};
        List<Integer> active = getActivePlayerIndices();
        if (active.isEmpty()) {
            return current;
        }
        int startIdx = -1;
        for (int i = 0; i < order.length; i++) {
            if (order[i] == current) {
                startIdx = i;
                break;
            }
        }
        for (int step = 1; step <= order.length; step++) {
            int candidate = order[(startIdx + step + order.length) % order.length];
            if (slotSessions[candidate] != null && !slotSessions[candidate].isEmpty()) {
                return candidate;
            }
        }
        return current;
    }

    private boolean equalsValue(double a, double b) {
        return Math.abs(a - b) < 0.0001;
    }

    private boolean isYellowValue(double value) {
        return Math.abs(value - Math.floor(value) - 0.1) < 0.0001;
    }

    private boolean isRedValue(double value) {
        return Math.abs(value - Math.floor(value) - 0.5) < 0.0001;
    }

    private Double tokenHintValue(Double value) {
        if (value == null) {
            return null;
        }
        if (isYellowValue(value)) {
            return Double.NaN;
        }
        if (isRedValue(value)) {
            return -1.0;
        }
        return value;
    }

    private boolean allRevealed() {
        for (List<Boolean> row : revealed) {
            for (Boolean value : row) {
                if (!Boolean.TRUE.equals(value)) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean allUnrevealedAreRed(int playerIndex) {
        List<Double> hand = hands.get(playerIndex);
        List<Boolean> revealRow = revealed.get(playerIndex);
        boolean hasUnrevealed = false;
        for (int i = 0; i < hand.size(); i++) {
            if (Boolean.TRUE.equals(revealRow.get(i))) {
                continue;
            }
            hasUnrevealed = true;
            double value = hand.get(i);
            boolean isRed = Math.abs(value - Math.floor(value) - 0.5) < 0.0001;
            if (!isRed) {
                return false;
            }
        }
        return hasUnrevealed;
    }

    private void revealAllUnrevealed(int playerIndex) {
        List<Boolean> revealRow = revealed.get(playerIndex);
        List<Double> hintRow = wrongHints.get(playerIndex);
        for (int i = 0; i < revealRow.size(); i++) {
            if (!Boolean.TRUE.equals(revealRow.get(i))) {
                revealRow.set(i, true);
                hintRow.set(i, null);
            }
        }
    }

    private int countInHand(int playerIndex, int base) {
        int count = 0;
        for (double value : hands.get(playerIndex)) {
            if (isYellowValue(value) || isRedValue(value)) {
                continue;
            }
            if ((int) Math.floor(value) == base) {
                count++;
            }
        }
        return count;
    }

    private int countRevealedBase(int base) {
        int count = 0;
        for (int p = 0; p < hands.size(); p++) {
            List<Double> hand = hands.get(p);
            List<Boolean> revealRow = revealed.get(p);
            for (int i = 0; i < hand.size(); i++) {
                double value = hand.get(i);
                if (isYellowValue(value) || isRedValue(value)) {
                    continue;
                }
                if (Boolean.TRUE.equals(revealRow.get(i)) && (int) Math.floor(value) == base) {
                    count++;
                }
            }
        }
        return count;
    }

    private boolean allUnrevealedYellowInHand(int playerIndex) {
        for (int p = 0; p < hands.size(); p++) {
            List<Double> hand = hands.get(p);
            List<Boolean> revealRow = revealed.get(p);
            for (int i = 0; i < hand.size(); i++) {
                if (Boolean.TRUE.equals(revealRow.get(i))) {
                    continue;
                }
                double value = hand.get(i);
                if (isYellowValue(value) && p != playerIndex) {
                    return false;
                }
            }
        }
        return true;
    }

    public synchronized BombBustersState placeToken(String sessionId, BombBustersTokenRequest request) {
        if (request == null || !gameStarted || missionEnded || !preTokenPhase) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot.intValue() != tokenTurnIndex) {
            return getState();
        }
        if (hasToken(slot)) {
            return getState();
        }
        int pos = request.getPosition();
        List<Double> hand = hands.get(slot);
        if (pos < 0 || pos >= hand.size()) {
            return getState();
        }
        if (Boolean.TRUE.equals(revealed.get(slot).get(pos))) {
            return getState();
        }
        if (wrongHints.get(slot).get(pos) != null) {
            return getState();
        }
        double value = hand.get(pos);
        if (isYellowValue(value) || isRedValue(value)) {
            return getState();
        }
        wrongHints.get(slot).set(pos, value);
        tokenPlaced[slot] = true;
        lastAction = "初期トークン配置";
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        if (allTokensPlaced()) {
            preTokenPhase = false;
            tokenTurnIndex = -1;
            turnIndex = parentIndex;
            lastAction = "初期トークン配置完了";
        } else {
            tokenTurnIndex = nextTokenIndex(slot);
        }
        version += 1;
        return getState();
    }

    private boolean hasToken(int playerIndex) {
        if (playerIndex < 0 || playerIndex >= tokenPlaced.length) {
            return false;
        }
        return tokenPlaced[playerIndex];
    }

    private boolean isActiveSlot(int index) {
        if (index < 0 || index >= slotSessions.length) {
            return false;
        }
        String session = slotSessions[index];
        return session != null && !session.isEmpty();
    }

    private boolean allTokensPlaced() {
        for (int i = 0; i < slotSessions.length; i++) {
            if (isActiveSlot(i) && !hasToken(i)) {
                return false;
            }
        }
        return true;
    }

    private int nextTokenIndex(int fromIndex) {
        int current = fromIndex;
        for (int i = 0; i < slotSessions.length; i++) {
            current = nextActiveIndex(current);
            if (isActiveSlot(current) && !hasToken(current)) {
                return current;
            }
        }
        return -1;
    }

    private List<Boolean> snapshotDetectorUsed() {
        List<Boolean> snapshot = new ArrayList<>();
        for (boolean used : detectorUsed) {
            snapshot.add(used);
        }
        return Collections.unmodifiableList(snapshot);
    }

    public synchronized BombBustersState submitTarget(String sessionId, BombBustersTargetRequest request) {
        if (request == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot != turnIndex) {
            return getState();
        }
        if (pendingWrongTokenFrom != null) {
            return getState();
        }
        if (pendingTargetIndex != null) {
            return getState();
        }
        int targetPlayer = request.getTargetPlayerIndex();
        int targetPosition = request.getTargetPosition();
        String mode = request.getMode();
        boolean detectorMode = "detector".equalsIgnoreCase(mode);
        boolean equip3Mode = "equip3".equalsIgnoreCase(mode);
        boolean equip5Mode = "equip5".equalsIgnoreCase(mode);
        Integer targetPlayer2 = request.getTargetPlayerIndex2();
        Integer targetPosition2 = request.getTargetPosition2();
        Integer targetPosition3 = request.getTargetPosition3();
        if (targetPlayer < 0 || targetPlayer >= hands.size()) {
            return getState();
        }
        if (targetPlayer == slot) {
            return getState();
        }
        List<Double> targetHand = hands.get(targetPlayer);
        if (!equip5Mode) {
            if (targetPosition < 0 || targetPosition >= targetHand.size()) {
                return getState();
            }
            if (revealed.get(targetPlayer).get(targetPosition)) {
                return getState();
            }
        }
        if (detectorMode) {
            if (detectorUsed[slot]) {
                return getState();
            }
            if (targetPlayer2 == null || targetPosition2 == null) {
                return getState();
            }
        }
        if (equip3Mode) {
            if (targetPosition2 == null || targetPosition3 == null) {
                return getState();
            }
            if (targetPosition2 == targetPosition || targetPosition3 == targetPosition || targetPosition3 == targetPosition2) {
                return getState();
            }
            if (targetPosition2 < 0 || targetPosition2 >= targetHand.size()) {
                return getState();
            }
            if (targetPosition3 < 0 || targetPosition3 >= targetHand.size()) {
                return getState();
            }
            if (revealed.get(targetPlayer).get(targetPosition2) || revealed.get(targetPlayer).get(targetPosition3)) {
                return getState();
            }
        }
        if (detectorMode && targetPlayer2 != null && targetPosition2 != null) {
            if (targetPlayer2 < 0 || targetPlayer2 >= hands.size()) {
                return getState();
            }
            if (targetPlayer2 == slot) {
                return getState();
            }
            if (targetPlayer2 == targetPlayer && targetPosition2 == targetPosition) {
                return getState();
            }
            List<Double> targetHand2 = hands.get(targetPlayer2);
            if (targetPosition2 < 0 || targetPosition2 >= targetHand2.size()) {
                return getState();
            }
            if (revealed.get(targetPlayer2).get(targetPosition2)) {
                return getState();
            }
        }
        pendingFromIndex = slot;
        pendingTargetIndex = targetPlayer;
        pendingPosition = equip5Mode ? null : targetPosition;
        if (detectorMode) {
            pendingTargetIndex2 = targetPlayer2;
            pendingPosition2 = targetPosition2;
            pendingTargetMode = "detector";
            detectorUsed[slot] = true;
            pendingPosition3 = null;
        } else if (equip3Mode) {
            pendingTargetIndex2 = targetPlayer;
            pendingPosition2 = targetPosition2;
            pendingPosition3 = targetPosition3;
            pendingTargetMode = "equip3";
        } else if (equip5Mode) {
            pendingTargetIndex2 = null;
            pendingPosition2 = null;
            pendingPosition3 = null;
            pendingTargetMode = "equip5";
        } else {
            pendingTargetIndex2 = null;
            pendingPosition2 = null;
            pendingPosition3 = null;
            pendingTargetMode = "single";
        }
        pendingOpponentRevealFrom = null;
        pendingOpponentRevealPosition = null;
        pendingOpponentRevealPosition2 = null;
        pendingOpponentRevealBase = null;
        pendingOpponentRevealPosition3 = null;
        pendingOpponentRevealYellow = false;
        pendingDetectorGuesser = null;
        pendingDetectorBase = null;
        pendingDetectorYellow = false;
        lastAction = "指名";
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        version += 1;
        return getState();
    }

    public synchronized BombBustersState resolveGuess(String sessionId, BombBustersResolveRequest request) {
        if (request == null || pendingTargetIndex == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot.intValue() != pendingFromIndex.intValue()) {
            return getState();
        }
        int targetIdx = pendingTargetIndex;
        int pos1 = pendingPosition;
        Integer pos2 = pendingPosition2;
        Integer pos3 = pendingPosition3;
        String guessType = request.getGuessType();
        Double chosenNumber = request.getChosenNumber();
        boolean isYellowGuess = "yellow".equalsIgnoreCase(guessType);
        boolean detectorMode = "detector".equalsIgnoreCase(pendingTargetMode);
        boolean equip3Mode = "equip3".equalsIgnoreCase(pendingTargetMode);
        boolean equip5Mode = "equip5".equalsIgnoreCase(pendingTargetMode);
        if (equip5Mode) {
            if (request.getTargetPlayerIndex() != pendingTargetIndex) {
                return getState();
            }
        } else {
            if (pendingPosition == null) {
                return getState();
            }
            if (request.getTargetPlayerIndex() != pendingTargetIndex || request.getTargetPosition() != pendingPosition) {
                return getState();
            }
        }
        if (detectorMode && isYellowGuess) {
            return getState();
        }
        if (!isYellowGuess && chosenNumber == null) {
            return getState();
        }
        List<Double> targetHand = hands.get(pendingTargetIndex);
        double actual = 0;
        boolean actualYellow = false;
        boolean actualRed = false;
        if (!equip5Mode) {
            if (pendingPosition < 0 || pendingPosition >= targetHand.size()) {
                return getState();
            }
            actual = targetHand.get(pendingPosition);
            actualYellow = Math.abs(actual - Math.floor(actual) - 0.1) < 0.0001;
            actualRed = Math.abs(actual - Math.floor(actual) - 0.5) < 0.0001;
        }
        boolean correct;
        Double actual2 = null;
        boolean actual2Yellow = false;
        boolean actual2Red = false;
        Double actual3 = null;
        boolean actual3Yellow = false;
        boolean actual3Red = false;
        if (detectorMode || equip3Mode) {
            if (pendingTargetIndex2 != null && pendingPosition2 != null) {
                List<Double> targetHand2 = hands.get(pendingTargetIndex2);
                if (pendingPosition2 < 0 || pendingPosition2 >= targetHand2.size()) {
                    return getState();
                }
                actual2 = targetHand2.get(pendingPosition2);
                actual2Yellow = Math.abs(actual2 - Math.floor(actual2) - 0.1) < 0.0001;
                actual2Red = Math.abs(actual2 - Math.floor(actual2) - 0.5) < 0.0001;
            }
            if (equip3Mode && pendingPosition3 != null) {
                if (pendingPosition3 < 0 || pendingPosition3 >= targetHand.size()) {
                    return getState();
                }
                actual3 = targetHand.get(pendingPosition3);
                actual3Yellow = Math.abs(actual3 - Math.floor(actual3) - 0.1) < 0.0001;
                actual3Red = Math.abs(actual3 - Math.floor(actual3) - 0.5) < 0.0001;
            }
            boolean match1 = !actualRed && !isYellowGuess && equalsValue(actual, chosenNumber);
            boolean match2 = actual2 != null && !actual2Red && !isYellowGuess && equalsValue(actual2, chosenNumber);
            boolean match3 = actual3 != null && !actual3Red && !isYellowGuess && equalsValue(actual3, chosenNumber);
            boolean matchYellow = isYellowGuess && (actualYellow || actual2Yellow || actual3Yellow);
            correct = matchYellow || match1 || match2 || match3;
        } else if (equip5Mode) {
            if (isYellowGuess) {
                correct = false;
                for (Double value : targetHand) {
                    if (isYellowValue(value) && !isRedValue(value)) {
                        correct = true;
                        break;
                    }
                }
            } else {
                correct = false;
                for (Double value : targetHand) {
                    if (isYellowValue(value) || isRedValue(value)) {
                        continue;
                    }
                    if (equalsValue(value, chosenNumber)) {
                        correct = true;
                        break;
                    }
                }
            }
        } else if (actualRed) {
            correct = false;
            mistakesRemaining = 0;
        } else if (isYellowGuess) {
            correct = actualYellow;
        } else {
            correct = equalsValue(actual, chosenNumber);
        }
        int guessTarget = pendingTargetIndex;
        Integer guessPosition = pendingPosition;
        if (equip3Mode) {
            if (isYellowGuess) {
                if (actualYellow) {
                    guessTarget = pendingTargetIndex;
                    guessPosition = pendingPosition;
                } else if (actual2Yellow) {
                    guessTarget = pendingTargetIndex;
                    guessPosition = pendingPosition2;
                } else if (actual3Yellow) {
                    guessTarget = pendingTargetIndex;
                    guessPosition = pendingPosition3;
                }
            } else {
                boolean match1 = !actualRed && equalsValue(actual, chosenNumber);
                boolean match2 = actual2 != null && !actual2Red && equalsValue(actual2, chosenNumber);
                boolean match3 = actual3 != null && !actual3Red && equalsValue(actual3, chosenNumber);
                if (!match1 && match2) {
                    guessTarget = pendingTargetIndex;
                    guessPosition = pendingPosition2;
                } else if (!match1 && !match2 && match3) {
                    guessTarget = pendingTargetIndex;
                    guessPosition = pendingPosition3;
                }
            }
        } else if (detectorMode && actual2 != null) {
            boolean match1 = !actualRed && equalsValue(actual, chosenNumber);
            boolean match2 = !actual2Red && equalsValue(actual2, chosenNumber);
            if (!match1 && match2) {
                guessTarget = pendingTargetIndex2;
                guessPosition = pendingPosition2;
            }
        } else if (equip5Mode) {
            guessPosition = null;
        }
        if (correct) {
            if (detectorMode) {
                pendingOpponentRevealFrom = pendingTargetIndex;
                pendingOpponentRevealPosition = pendingPosition;
                pendingOpponentRevealPosition2 = pendingPosition2;
                pendingOpponentRevealPosition3 = null;
                pendingOpponentRevealBase = chosenNumber == null ? null : (int) Math.floor(chosenNumber);
                pendingOpponentRevealYellow = false;
                pendingDetectorGuesser = pendingFromIndex;
                pendingDetectorBase = chosenNumber == null ? null : (int) Math.floor(chosenNumber);
                pendingDetectorYellow = false;
                lastAction = "正解";
            } else if (equip5Mode) {
                pendingOpponentRevealFrom = pendingTargetIndex;
                pendingOpponentRevealPosition = null;
                pendingOpponentRevealPosition2 = null;
                pendingOpponentRevealPosition3 = null;
                pendingOpponentRevealBase = isYellowGuess ? null : (int) Math.floor(chosenNumber);
                pendingOpponentRevealYellow = isYellowGuess;
                pendingDetectorGuesser = pendingFromIndex;
                pendingDetectorBase = isYellowGuess ? null : (int) Math.floor(chosenNumber);
                pendingDetectorYellow = isYellowGuess;
                lastAction = "正解";
            } else if (equip3Mode) {
                lastAction = "正解";
            } else {
                int revealTarget = pendingTargetIndex;
                int revealPos = pendingPosition;
                revealed.get(revealTarget).set(revealPos, true);
                wrongHints.get(revealTarget).set(revealPos, null);
                lastAction = "正解";
            }
        } else {
            if (equip5Mode) {
                pendingWrongTokenFrom = pendingTargetIndex;
                pendingWrongTokenPosition = null;
                pendingWrongTokenPosition2 = null;
                mistakesRemaining = Math.max(0, mistakesRemaining - 1);
            } else if (detectorMode && actual2 != null) {
                pendingWrongTokenFrom = pendingTargetIndex;
                pendingWrongTokenPosition = pendingPosition;
                pendingWrongTokenPosition2 = pendingPosition2;
                if (actualRed || actual2Red) {
                    mistakesRemaining = 0;
                } else {
                    mistakesRemaining = Math.max(0, mistakesRemaining - 1);
                }
            } else if (equip3Mode && actual2 != null) {
                if (equip3Mode && isYellowGuess) {
                    if (actualRed) {
                        wrongHints.get(pendingTargetIndex).set(pendingPosition, tokenHintValue(actual));
                        mistakesRemaining = 0;
                    } else {
                        wrongHints.get(pendingTargetIndex).set(pendingPosition, Double.NaN);
                    }
                    if (actual2Red) {
                        wrongHints.get(pendingTargetIndex).set(pendingPosition2, tokenHintValue(actual2));
                        mistakesRemaining = 0;
                    } else {
                        wrongHints.get(pendingTargetIndex).set(pendingPosition2, Double.NaN);
                    }
                    if (actual3 != null && pendingPosition3 != null) {
                        if (actual3Red) {
                            wrongHints.get(pendingTargetIndex).set(pendingPosition3, tokenHintValue(actual3));
                            mistakesRemaining = 0;
                        } else {
                            wrongHints.get(pendingTargetIndex).set(pendingPosition3, Double.NaN);
                        }
                    }
                    if (!actualRed && !actual2Red && !(actual3 != null && actual3Red)) {
                        mistakesRemaining = Math.max(0, mistakesRemaining - 1);
                    }
                } else {
                    wrongHints.get(pendingTargetIndex).set(pendingPosition, tokenHintValue(actual));
                    wrongHints.get(pendingTargetIndex2).set(pendingPosition2, tokenHintValue(actual2));
                    if (equip3Mode && actual3 != null && pendingPosition3 != null) {
                        wrongHints.get(pendingTargetIndex).set(pendingPosition3, tokenHintValue(actual3));
                    }
                    if (actualRed || actual2Red || (actual3 != null && actual3Red)) {
                        mistakesRemaining = 0;
                    } else {
                        mistakesRemaining = Math.max(0, mistakesRemaining - 1);
                    }
                }
            } else {
                if (actualRed) {
                    wrongHints.get(pendingTargetIndex).set(pendingPosition, tokenHintValue(actual));
                } else if (isYellowGuess && !actualYellow) {
                    wrongHints.get(pendingTargetIndex).set(pendingPosition, Double.NaN);
                } else {
                    wrongHints.get(pendingTargetIndex).set(pendingPosition, tokenHintValue(actual));
                }
                if (!actualRed) {
                    mistakesRemaining = Math.max(0, mistakesRemaining - 1);
                }
            }
            lastAction = "不正解";
        }
        lastGuessTarget = guessTarget;
        lastGuessPosition = guessPosition;
        lastGuessCorrect = correct;
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        if (correct && !detectorMode && !equip3Mode) {
            pendingSelfRevealFrom = pendingFromIndex;
            if (detectorMode && actual2 != null) {
                boolean match1 = !actualRed && equalsValue(actual, chosenNumber);
                boolean match2 = !actual2Red && equalsValue(actual2, chosenNumber);
                if (!match1 && match2) {
                    pendingSelfRevealYellow = actual2Yellow;
                    pendingSelfRevealBase = actual2Yellow ? null : (int) Math.floor(actual2);
                } else {
                    pendingSelfRevealYellow = actualYellow;
                    pendingSelfRevealBase = actualYellow ? null : (int) Math.floor(actual);
                }
            } else {
                pendingSelfRevealYellow = actualYellow;
                pendingSelfRevealBase = actualYellow ? null : (int) Math.floor(actual);
            }
        } else if (correct && equip3Mode) {
            pendingSelfRevealFrom = pendingFromIndex;
            if (isYellowGuess) {
                pendingSelfRevealYellow = true;
                pendingSelfRevealBase = null;
            } else {
                pendingSelfRevealYellow = false;
                pendingSelfRevealBase = chosenNumber == null ? null : (int) Math.floor(chosenNumber);
            }
        } else if (!correct) {
            pendingSelfRevealFrom = null;
            pendingSelfRevealBase = null;
            pendingSelfRevealYellow = false;
            if (!(detectorMode && actual2 != null) && !equip5Mode) {
                turnIndex = nextActiveIndex(turnIndex);
            }
        }
        pendingFromIndex = null;
        pendingTargetIndex = null;
        pendingPosition = null;
        pendingTargetIndex2 = null;
        pendingPosition2 = null;
        pendingPosition3 = null;
        pendingTargetMode = "single";
        if (correct && detectorMode) {
            pendingSelfRevealFrom = null;
            pendingSelfRevealBase = null;
            pendingSelfRevealYellow = false;
        } else if (correct && equip3Mode) {
            pendingOpponentRevealFrom = targetIdx;
            pendingOpponentRevealPosition = pos1;
            pendingOpponentRevealPosition2 = pos2;
            pendingOpponentRevealPosition3 = pos3;
            pendingOpponentRevealBase = isYellowGuess ? null : (int) Math.floor(chosenNumber);
            pendingOpponentRevealYellow = isYellowGuess;
            pendingDetectorGuesser = slot;
            pendingDetectorBase = isYellowGuess ? null : (int) Math.floor(chosenNumber);
            pendingDetectorYellow = isYellowGuess;
            pendingSelfRevealFrom = null;
            pendingSelfRevealBase = null;
            pendingSelfRevealYellow = false;
        } else if (correct && equip5Mode) {
            pendingSelfRevealFrom = null;
            pendingSelfRevealBase = null;
            pendingSelfRevealYellow = false;
        } else if (correct && !equip3Mode) {
            pendingOpponentRevealFrom = null;
            pendingOpponentRevealPosition = null;
            pendingOpponentRevealPosition2 = null;
            pendingOpponentRevealBase = null;
            pendingDetectorGuesser = null;
            pendingDetectorBase = null;
        }
        if (mistakesRemaining == 0) {
            missionEnded = true;
            missionSuccess = false;
            lastAction = "ミッション失敗";
            pendingWrongTokenFrom = null;
            pendingWrongTokenPosition = null;
            pendingWrongTokenPosition2 = null;
        } else if (allRevealed()) {
            missionEnded = true;
            missionSuccess = true;
            lastAction = "ミッション成功";
        }
        version += 1;
        return getState();
    }

    public synchronized BombBustersState revealSelf(String sessionId, BombBustersSelfRevealRequest request) {
        if (request == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || pendingSelfRevealFrom == null) {
            return getState();
        }
        if (slot.intValue() != pendingSelfRevealFrom.intValue()) {
            return getState();
        }
        int pos = request.getPosition();
        List<Double> hand = hands.get(slot);
        if (pos < 0 || pos >= hand.size()) {
            return getState();
        }
        if (Boolean.TRUE.equals(revealed.get(slot).get(pos))) {
            return getState();
        }
        double value = hand.get(pos);
        int base = (int) Math.floor(value);
        if (pendingSelfRevealYellow) {
            if (!isYellowValue(value)) {
                return getState();
            }
        } else {
            if (pendingSelfRevealBase == null || base != pendingSelfRevealBase.intValue()) {
                return getState();
            }
            if (isYellowValue(value) || isRedValue(value)) {
                return getState();
            }
        }
        revealed.get(slot).set(pos, true);
        wrongHints.get(slot).set(pos, null);
        lastAction = "自己公開";
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        pendingSelfRevealFrom = null;
        pendingSelfRevealBase = null;
        pendingSelfRevealYellow = false;
        pendingDetectorGuesser = null;
        pendingDetectorBase = null;
        turnIndex = nextActiveIndex(turnIndex);
        if (allRevealed()) {
            missionEnded = true;
            missionSuccess = true;
            lastAction = "ミッション成功";
        }
        version += 1;
        return getState();
    }

    public synchronized BombBustersState placeWrongToken(String sessionId, BombBustersWrongTokenRequest request) {
        if (request == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        if (pendingWrongTokenFrom == null) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot.intValue() != pendingWrongTokenFrom.intValue()) {
            return getState();
        }
        int pos = request.getPosition();
        if (pendingWrongTokenPosition != null) {
            if (pos != pendingWrongTokenPosition.intValue() &&
                (pendingWrongTokenPosition2 == null || pos != pendingWrongTokenPosition2.intValue())) {
                return getState();
            }
        }
        List<Double> hand = hands.get(slot);
        if (pos < 0 || pos >= hand.size()) {
            return getState();
        }
        if (Boolean.TRUE.equals(revealed.get(slot).get(pos))) {
            return getState();
        }
        double value = hand.get(pos);
        if (isRedValue(value)) {
            return getState();
        }
        wrongHints.get(slot).set(pos, tokenHintValue(value));
        pendingWrongTokenFrom = null;
        pendingWrongTokenPosition = null;
        pendingWrongTokenPosition2 = null;
        turnIndex = nextActiveIndex(turnIndex);
        lastAction = "トークン設置";
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        if (mistakesRemaining == 0) {
            missionEnded = true;
            missionSuccess = false;
            lastAction = "ミッション失敗";
        } else if (allRevealed()) {
            missionEnded = true;
            missionSuccess = true;
            lastAction = "ミッション成功";
        }
        version += 1;
        return getState();
    }

    public synchronized BombBustersState executeEquipment(String sessionId, BombBustersEquipmentRequest request) {
        if (request == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null) {
            return getState();
        }
        Integer eq = request.getEquipmentNumber();
        String action = request.getAction();
        if (eq == null) {
            return getState();
        }
        if ("begin".equalsIgnoreCase(action)) {
            if (eq == 1 || eq == 4 || eq == 12) {
                if (usedEquipmentNumbers.contains(eq)) {
                    return getState();
                }
                equipmentInUseNumber = eq;
                equipmentInUseBy = slot;
                lastAction = "装備使用中";
                lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
                version += 1;
                return getState();
            }
            if (eq == 3) {
                if (usedEquipmentNumbers.contains(eq)) {
                    return getState();
                }
                usedEquipmentNumbers.add(eq);
                lastAction = "装備3：ミッツケル探知機";
                lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
                version += 1;
                return getState();
            }
            if (eq == 5) {
                if (slot.intValue() != turnIndex) {
                    return getState();
                }
                if (usedEquipmentNumbers.contains(eq)) {
                    return getState();
                }
                usedEquipmentNumbers.add(eq);
                lastAction = "装備5：スーパー探知機";
                lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
                version += 1;
                return getState();
            }
            return getState();
        }
        if (usedEquipmentNumbers.contains(eq) && (eq != 2 || "start".equalsIgnoreCase(action) || action == null)) {
            return getState();
        }
        if (eq == 1) {
            Integer posA = request.getPositionA();
            Integer posB = request.getPositionB();
            if (posA == null || posB == null) {
                return getState();
            }
            if (Math.abs(posA - posB) != 1) {
                return getState();
            }
            List<Double> hand = hands.get(slot);
            List<Boolean> revealRow = revealed.get(slot);
            if (posA < 0 || posA >= hand.size() || posB < 0 || posB >= hand.size()) {
                return getState();
            }
            if (Boolean.TRUE.equals(revealRow.get(posA)) && Boolean.TRUE.equals(revealRow.get(posB))) {
                return getState();
            }
            double valueA = Math.round(hand.get(posA) * 10) / 10.0;
            double valueB = Math.round(hand.get(posB) * 10) / 10.0;
            int fracA = (int) Math.round((valueA - Math.floor(valueA)) * 10);
            int fracB = (int) Math.round((valueB - Math.floor(valueB)) * 10);
            if ((fracA == 1 && fracB == 1) || (fracA == 5 && fracB == 5)) {
                return getState();
            }
            if (Double.compare(valueA, valueB) == 0) {
                return getState();
            }
            differentLabels.get(slot).set(posA, differentLabels.get(slot).get(posA) + 1);
            differentLabels.get(slot).set(posB, differentLabels.get(slot).get(posB) + 1);
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            equipmentInUseNumber = null;
            equipmentInUseBy = null;
            lastAction = "装備1：コトナルラベル";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        if (eq == 12) {
            Integer posA = request.getPositionA();
            Integer posB = request.getPositionB();
            if (posA == null || posB == null) {
                return getState();
            }
            if (Math.abs(posA - posB) != 1) {
                return getState();
            }
            List<Double> hand = hands.get(slot);
            List<Boolean> revealRow = revealed.get(slot);
            if (posA < 0 || posA >= hand.size() || posB < 0 || posB >= hand.size()) {
                return getState();
            }
            if (Boolean.TRUE.equals(revealRow.get(posA)) && Boolean.TRUE.equals(revealRow.get(posB))) {
                return getState();
            }
            double valueA = Math.round(hand.get(posA) * 10) / 10.0;
            double valueB = Math.round(hand.get(posB) * 10) / 10.0;
            int fracA = (int) Math.round((valueA - Math.floor(valueA)) * 10);
            int fracB = (int) Math.round((valueB - Math.floor(valueB)) * 10);
            boolean bothYellow = fracA == 1 && fracB == 1;
            boolean bothRed = fracA == 5 && fracB == 5;
            if (!bothYellow && !bothRed && Double.compare(valueA, valueB) != 0) {
                return getState();
            }
            equalLabels.get(slot).set(posA, equalLabels.get(slot).get(posA) + 1);
            equalLabels.get(slot).set(posB, equalLabels.get(slot).get(posB) + 1);
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            equipmentInUseNumber = null;
            equipmentInUseBy = null;
            lastAction = "装備12：イコールラベル";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        if (eq == 4) {
            Integer pos = request.getPosition();
            if (pos == null) {
                return getState();
            }
            List<Double> hand = hands.get(slot);
            if (pos < 0 || pos >= hand.size()) {
                return getState();
            }
            if (Boolean.TRUE.equals(revealed.get(slot).get(pos))) {
                return getState();
            }
            double value = hand.get(pos);
            if (isYellowValue(value) || isRedValue(value)) {
                return getState();
            }
            wrongHints.get(slot).set(pos, value);
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            equipmentInUseNumber = null;
            equipmentInUseBy = null;
            lastAction = "装備4：トークン設置";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        if (eq == 6) {
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            mistakesRemaining += 1;
            lastAction = "装備6：失敗帳消し機";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        if (eq == 7) {
            Integer target = request.getTargetPlayerIndex();
            if (target == null || target < 0 || target >= detectorUsed.length) {
                return getState();
            }
            if (!detectorUsed[target]) {
                return getState();
            }
            detectorUsed[target] = false;
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            lastAction = "装備7：非常電池";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        if (eq == 11) {
            if (slot.intValue() != turnIndex) {
                return getState();
            }
            Integer target = request.getTargetPlayerIndex();
            if (target == null || target < 0 || target >= hands.size()) {
                return getState();
            }
            if (target.intValue() == slot.intValue()) {
                return getState();
            }
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            turnIndex = target;
            lastAction = "装備11：手番スキップ";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        if (eq != 2) {
            return getState();
        }
        if ("start".equalsIgnoreCase(action)) {
            if (!usedEquipmentNumbers.contains(eq)) {
                usedEquipmentNumbers.add(eq);
            }
            Integer target = request.getTargetPlayerIndex();
            if (target == null || target < 0 || target >= hands.size()) {
                return getState();
            }
            if (target.intValue() == slot.intValue()) {
                return getState();
            }
            // init equipment flow
            pendingFromIndex = slot;
            pendingTargetIndex = target;
            pendingPosition = null;
            pendingTargetIndex2 = null;
            pendingPosition2 = null;
            pendingTargetMode = "equipment2";
            pendingEquipmentNumber = 2;
            pendingEquipmentFromPosition = null;
            pendingEquipmentTargetPosition = null;
            pendingEquipmentWaitingTargetChoice = false;
            lastAction = "装備2：指名";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        } else if ("selectSelfPosition".equalsIgnoreCase(action)) {
            if (pendingEquipmentNumber == null || pendingEquipmentNumber != 2) {
                return getState();
            }
            if (slot.intValue() != pendingFromIndex.intValue()) {
                return getState();
            }
            Integer pos = request.getFromPosition();
            if (pos == null) {
                return getState();
            }
            List<Double> hand = hands.get(slot);
            List<Boolean> revealRow = revealed.get(slot);
            if (pos < 0 || pos >= hand.size()) {
                return getState();
            }
            if (Boolean.TRUE.equals(revealRow.get(pos))) {
                return getState();
            }
            pendingEquipmentFromPosition = pos;
            pendingEquipmentWaitingTargetChoice = true;
            lastAction = "装備2：発動者がワイヤ選択";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        } else if ("selectTargetPosition".equalsIgnoreCase(action)) {
            if (pendingEquipmentNumber == null || pendingEquipmentNumber != 2) {
                return getState();
            }
            if (!pendingEquipmentWaitingTargetChoice) {
                return getState();
            }
            if (slot.intValue() != pendingTargetIndex.intValue()) {
                return getState();
            }
            Integer pos = request.getTargetPosition();
            if (pos == null) {
                return getState();
            }
            List<Double> handA = hands.get(pendingFromIndex);
            List<Boolean> revealA = revealed.get(pendingFromIndex);
            List<Double> hintsA = wrongHints.get(pendingFromIndex);
            List<Integer> labelsA = differentLabels.get(pendingFromIndex);
            List<Integer> equalA = equalLabels.get(pendingFromIndex);
            List<Double> handB = hands.get(pendingTargetIndex);
            List<Boolean> revealB = revealed.get(pendingTargetIndex);
            List<Double> hintsB = wrongHints.get(pendingTargetIndex);
            List<Integer> labelsB = differentLabels.get(pendingTargetIndex);
            List<Integer> equalB = equalLabels.get(pendingTargetIndex);
            if (pendingEquipmentFromPosition == null) {
                return getState();
            }
            int aPos = pendingEquipmentFromPosition.intValue();
            int bPos = pos.intValue();
            if (aPos < 0 || aPos >= handA.size() || bPos < 0 || bPos >= handB.size()) {
                return getState();
            }
            if (Boolean.TRUE.equals(revealA.get(aPos)) || Boolean.TRUE.equals(revealB.get(bPos))) {
                return getState();
            }
            // values and associated meta
            double valA = handA.get(aPos);
            double valB = handB.get(bPos);
            boolean revA = Boolean.TRUE.equals(revealA.get(aPos));
            boolean revB = Boolean.TRUE.equals(revealB.get(bPos));
            Double hintA = hintsA.get(aPos);
            Double hintB = hintsB.get(bPos);
            Integer labelA = labelsA.get(aPos);
            Integer labelB = labelsB.get(bPos);
            Integer eqLabelA = equalA.get(aPos);
            Integer eqLabelB = equalB.get(bPos);
            // swap in-place
            handA.set(aPos, valB);
            hintsA.set(aPos, hintB);
            revealA.set(aPos, revB);
            labelsA.set(aPos, labelB);
            equalA.set(aPos, eqLabelB);
            handB.set(bPos, valA);
            hintsB.set(bPos, hintA);
            revealB.set(bPos, revA);
            labelsB.set(bPos, labelA);
            equalB.set(bPos, eqLabelA);
            // set swap highlight
            swapPendingConfirmation = true;
            swapHighlightPlayerA = pendingFromIndex;
            swapHighlightPlayerB = pendingTargetIndex;
            swapHighlightValueA = valA;
            swapHighlightValueB = valB;
            swapHighlightPositionA = aPos;
            swapHighlightPositionB = bPos;
            // clear pending equipment
            pendingEquipmentNumber = null;
            pendingEquipmentFromPosition = null;
            pendingEquipmentTargetPosition = null;
            pendingEquipmentWaitingTargetChoice = false;
            pendingFromIndex = null;
        pendingTargetIndex = null;
        pendingPosition = null;
        pendingTargetIndex2 = null;
        pendingPosition2 = null;
        pendingPosition3 = null;
        pendingTargetMode = "single";
            lastAction = "装備2：交換完了（確認待ち）";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        } else if ("confirmSwap".equalsIgnoreCase(action)) {
            if (!swapPendingConfirmation) {
                return getState();
            }
            // any player can confirm
            swapPendingConfirmation = false;
            swapHighlightPlayerA = null;
            swapHighlightPlayerB = null;
            swapHighlightValueA = null;
            swapHighlightValueB = null;
            swapHighlightPositionA = null;
            swapHighlightPositionB = null;
            lastAction = "装備2：交換確認";
            lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
            version += 1;
            return getState();
        }
        return getState();
    }


    public synchronized BombBustersState revealOpponent(String sessionId, BombBustersOpponentRevealRequest request) {
        if (request == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        if (pendingOpponentRevealFrom == null) {
            return getState();
        }
        if (pendingOpponentRevealBase == null && !pendingOpponentRevealYellow) {
            return getState();
        }
        if (pendingDetectorGuesser == null) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot.intValue() != pendingOpponentRevealFrom.intValue()) {
            return getState();
        }
        int pos = request.getPosition();
        if (pendingOpponentRevealPosition != null) {
            if (pos != pendingOpponentRevealPosition.intValue() &&
                (pendingOpponentRevealPosition2 == null || pos != pendingOpponentRevealPosition2.intValue()) &&
                (pendingOpponentRevealPosition3 == null || pos != pendingOpponentRevealPosition3.intValue())) {
                return getState();
            }
        }
        List<Double> hand = hands.get(slot);
        if (pos < 0 || pos >= hand.size()) {
            return getState();
        }
        if (Boolean.TRUE.equals(revealed.get(slot).get(pos))) {
            return getState();
        }
        double value = hand.get(pos);
        int base = (int) Math.floor(value);
        boolean isYellow = isYellowValue(value);
        boolean isRed = isRedValue(value);
        if (pendingOpponentRevealYellow) {
            if (!isYellow || isRed) {
                return getState();
            }
        } else {
            if (isYellow || isRed || base != pendingOpponentRevealBase.intValue()) {
                return getState();
            }
        }
        revealed.get(slot).set(pos, true);
        wrongHints.get(slot).set(pos, null);
        lastAction = "相手公開";
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        pendingOpponentRevealFrom = null;
        pendingOpponentRevealPosition = null;
        pendingOpponentRevealPosition2 = null;
        pendingOpponentRevealPosition3 = null;
        pendingOpponentRevealBase = null;
        pendingOpponentRevealYellow = false;
        pendingWrongTokenFrom = null;
        pendingWrongTokenPosition = null;
        pendingWrongTokenPosition2 = null;
        pendingSelfRevealFrom = pendingDetectorGuesser;
        pendingSelfRevealBase = pendingDetectorBase;
        pendingSelfRevealYellow = pendingDetectorYellow;
        pendingDetectorGuesser = null;
        pendingDetectorBase = null;
        pendingDetectorYellow = false;
        if (allRevealed()) {
            missionEnded = true;
            missionSuccess = true;
            lastAction = "ミッション成功";
        }
        version += 1;
        return getState();
    }

    public synchronized BombBustersState revealAction(String sessionId, BombBustersRevealRequest request) {
        if (request == null || !gameStarted || missionEnded || preTokenPhase) {
            return getState();
        }
        Integer slot = findSlotBySession(sessionId);
        if (slot == null || slot != turnIndex || pendingTargetIndex != null) {
            return getState();
        }
        String action = request.getActionType();
        if ("revealReds".equalsIgnoreCase(action)) {
            if (!allUnrevealedAreRed(slot)) {
                return getState();
            }
            revealAllUnrevealed(slot);
            lastAction = "赤のみ公開";
        } else if ("reveal4".equalsIgnoreCase(action) || "reveal2".equalsIgnoreCase(action)) {
            List<Integer> positions = request.getPositions();
            int required = "reveal4".equalsIgnoreCase(action) ? 4 : 2;
            if (positions == null || positions.size() != required) {
                return getState();
            }
            List<Double> hand = hands.get(slot);
            List<Boolean> revealRow = revealed.get(slot);
            int base = -1;
            boolean allYellow = true;
            boolean allSameBase = true;
            boolean anyYellow = false;
            boolean anyNonYellow = false;
            for (int pos : positions) {
                if (pos < 0 || pos >= hand.size()) {
                    return getState();
                }
                if (Boolean.TRUE.equals(revealRow.get(pos))) {
                    return getState();
                }
                double value = hand.get(pos);
                int currentBase = (int) Math.floor(value);
                if (isRedValue(value)) {
                    return getState();
                }
                if (!isYellowValue(value)) {
                    allYellow = false;
                    anyNonYellow = true;
                } else {
                    anyYellow = true;
                }
                if (base == -1) {
                    base = currentBase;
                } else if (base != currentBase) {
                    allSameBase = false;
                }
            }
            if (base == -1) {
                return getState();
            }
            if (anyYellow && anyNonYellow) {
                return getState();
            }
            if (allYellow && !allUnrevealedYellowInHand(slot)) {
                return getState();
            }
            if (required == 4) {
                if (!allYellow && !allSameBase) {
                    return getState();
                }
            } else if (!allYellow && !allSameBase) {
                return getState();
            }
            int totalInHand = countInHand(slot, base);
            if (!allYellow) {
                if (required == 4 && totalInHand < 4) {
                    return getState();
                }
                if (required == 2) {
                    if (totalInHand < 2) {
                        return getState();
                    }
                    if (countRevealedBase(base) < 2) {
                        return getState();
                    }
                }
            }
            for (int pos : positions) {
                revealRow.set(pos, true);
                wrongHints.get(slot).set(pos, null);
            }
            lastAction = required == 4 ? "4枚公開" : "2枚公開";
        } else {
            return getState();
        }
        lastUpdatedBy = slotNames[slot] == null ? "プレイヤー" : slotNames[slot];
        lastGuessTarget = null;
        lastGuessPosition = null;
        lastGuessCorrect = null;
        turnIndex = nextActiveIndex(turnIndex);
        if (allRevealed()) {
            missionEnded = true;
            missionSuccess = true;
            lastAction = "ミッション成功";
        }
        version += 1;
        return getState();
    }

    private Integer findSlotBySession(String sessionId) {
        for (int i = 0; i < slotSessions.length; i++) {
            if (sessionId.equals(slotSessions[i])) {
                return i;
            }
        }
        return null;
    }

    private int findEmptySlot() {
        for (int i = 0; i < slotSessions.length; i++) {
            if (slotSessions[i] == null || slotSessions[i].isEmpty()) {
                return i;
            }
        }
        return -1;
    }
}
