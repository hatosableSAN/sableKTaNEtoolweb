(() => {
    const playerLabel = document.getElementById("player-label");
    const connectionLabel = document.getElementById("connection-label");
    const lastAction = document.getElementById("last-action");
    const gameStatus = document.getElementById("game-status");
    const startButton = document.getElementById("start-button");
    const endButton = document.getElementById("end-button");
    const gameNote = document.getElementById("game-note");
    const notice = document.getElementById("notice");
    const equipmentTargetModal = document.getElementById("equipment-target-modal");
    const equipmentTargetButtons = document.getElementById("equipment-target-buttons");
    const equipmentTargetMessage = document.getElementById("equipment-target-message");
    const equipmentTargetCancel = document.getElementById("equipment-target-cancel");
    const equipmentTargetConfirm = document.getElementById("equipment-target-confirm");
    const themeToggle = document.getElementById("theme-toggle");
    const logoutButton = document.getElementById("logout-button");
    const guessPanel = document.getElementById("guess-panel");
    const guessTitle = document.getElementById("guess-title");
    const guessList = document.getElementById("guess-list");
    const actionPanel = document.getElementById("action-panel");
    const actionReveal4 = document.getElementById("action-reveal4");
    const actionReveal2 = document.getElementById("action-reveal2");
    const actionRevealReds = document.getElementById("action-reveal-reds");
    const actionTarget = document.getElementById("action-target");
    const actionSkip = document.getElementById("action-skip");
    const optionsPanel = document.getElementById("options-panel");
    const swapModal = document.getElementById("swap-modal");
    const swapModalMessage = document.getElementById("swap-modal-message");
    const swapModalConfirm = document.getElementById("swap-modal-confirm");
    const radarModal = document.getElementById("radar-modal");
    const radarModalMessage = document.getElementById("radar-modal-message");
    const radarModalConfirm = document.getElementById("radar-modal-confirm");
    let equipmentSelectionMode = null;
    const yellowMin = document.getElementById("yellow-min");
    const yellowMax = document.getElementById("yellow-max");
    const yellowPool = document.getElementById("yellow-pool");
    const yellowDraw = document.getElementById("yellow-draw");
    const redMin = document.getElementById("red-min");
    const redMax = document.getElementById("red-max");
    const redPool = document.getElementById("red-pool");
    const redDraw = document.getElementById("red-draw");
    const cardMin = document.getElementById("card-min");
    const cardMax = document.getElementById("card-max");
    const otherToggle = document.getElementById("other-toggle");
    const otherBody = document.getElementById("other-body");
    const excludeEquipmentChecks = Array.from(
        document.querySelectorAll("input[name='exclude-equipment']")
    );
    const deckList = document.getElementById("deck-list");
    const equipmentLabels = [
        document.querySelector("#equipment-1 .equipment-label"),
        document.querySelector("#equipment-2 .equipment-label"),
        document.querySelector("#equipment-3 .equipment-label"),
        document.querySelector("#equipment-4 .equipment-label"),
    ];
    const equipmentImages = [
        document.querySelector("#equipment-1 .equipment-image"),
        document.querySelector("#equipment-2 .equipment-image"),
        document.querySelector("#equipment-3 .equipment-image"),
        document.querySelector("#equipment-4 .equipment-image"),
    ];
    const detectorTooltipTitles = Array.from(
        document.querySelectorAll(".detector-tooltip .tooltip-title")
    );
    const detectorTooltipNumbers = Array.from(
        document.querySelectorAll(".detector-tooltip-number")
    );
    const detectorTooltipNames = Array.from(
        document.querySelectorAll(".detector-tooltip-name")
    );
    const detectorTooltipEffects = Array.from(
        document.querySelectorAll(".detector-tooltip-effect")
    );
    const detectorTooltipTimings = Array.from(
        document.querySelectorAll(".detector-tooltip-timing")
    );
    const parentIcons = [
        document.getElementById("parent-icon-1"),
        document.getElementById("parent-icon-2"),
        document.getElementById("parent-icon-3"),
        document.getElementById("parent-icon-4"),
    ];
    const handContainers = [
        document.getElementById("hand-container-1"),
        document.getElementById("hand-container-2"),
        document.getElementById("hand-container-3"),
        document.getElementById("hand-container-4"),
    ];
    const handLabels = [
        document.getElementById("hand-label-1"),
        document.getElementById("hand-label-2"),
        document.getElementById("hand-label-3"),
        document.getElementById("hand-label-4"),
    ];
    const equipmentButtons = [
        document.getElementById("equipment-1"),
        document.getElementById("equipment-2"),
        document.getElementById("equipment-3"),
        document.getElementById("equipment-4"),
    ];
    const tooltip = document.getElementById("equipment-tooltip");
    const tooltipTitle = document.getElementById("tooltip-title");
    const tooltipNumber = document.getElementById("tooltip-number");
    const tooltipName = document.getElementById("tooltip-name");
    const tooltipEffect = document.getElementById("tooltip-effect");
    const tooltipTiming = document.getElementById("tooltip-timing");
    const equipmentModal = document.getElementById("equipment-modal");
    const equipmentModalMessage = document.getElementById("equipment-modal-message");
    const equipmentModalConfirm = document.getElementById("equipment-modal-confirm");
    const equipmentModalCancel = document.getElementById("equipment-modal-cancel");
    const deckPanel = document.getElementById("deck-panel");
    const midPanel = document.getElementById("mid-panel");
    const mistValue = document.getElementById("mist-value");
    const nameSlots = [
        document.getElementById("player-name-1"),
        document.getElementById("player-name-2"),
        document.getElementById("player-name-3"),
        document.getElementById("player-name-4"),
    ];
    const detectorButtons = [
        document.getElementById("detector-1"),
        document.getElementById("detector-2"),
        document.getElementById("detector-3"),
        document.getElementById("detector-4"),
    ];
    let stompClient = null;
    let isConnected = false;
    let playerName = "";
    let playerIndex = -1;
    let isHost = false;
    let equipmentData = {};
    let actionMode = null;
    let selectedPositions = [];
    let selectedBase = null;
    let selectedType = null;
    let targetMode = "single";
    let detectorSelections = [];
    let equip1Selections = [];
    let equip12Selections = [];
    let equip3Selections = [];
    let equip3TargetIndex = null;
    let equip10Selections = [];
    let equip10ContextKey = null;
    let equip7Selections = [];
    let radarTimeoutId = null;
    let radarKey = null;
    let lastRedHintVersion = null;
    let lastEquip7Version = null;
    let lastState = null;
    const soundFiles = {
        correct: "/sfx/correct.mp3",
        incorrect: "/sfx/incorrect.mp3",
        last1: "/sfx/last1.mp3",
        equip: "/sfx/equip.mp3",
        token: "/sfx/token.mp3",
        reveal: "/sfx/reveal.mp3",
        start: "/sfx/start.mp3",
        boom: "/sfx/boom.mp3",
        clear: "/sfx/clear.mp3",
        battery: "/sfx/battery.mp3",
        exchange: "/sfx/exchange.mp3",
        ice: "/sfx/ice.mp3",
        radar: "/sfx/radar.mp3",
        recover: "/sfx/recover.mp3",
        yourturn: "/sfx/yourturn.mp3",
        skip: "/sfx/skip.mp3",
    };
    const sounds = {};
    const playSound = (key) => {
        const src = soundFiles[key];
        if (!src) {
            return;
        }
        if (!sounds[key]) {
            const audio = new Audio(src);
            audio.preload = "auto";
            audio.volume = 0.6;
            sounds[key] = audio;
        }
        const audio = sounds[key];
        try {
            audio.volume = 0.6;
            audio.currentTime = 0;
            const result = audio.play();
            if (result && typeof result.catch === "function") {
                result.catch(() => {});
            }
        } catch (error) {
            // ignore play errors
        }
    };
    let pendingEquipmentNumber = null;
    let activeEquipmentNumber = null;
    const clientUsedEquipmentNumbers = new Set();

    const applyTheme = (mode) => {
        if (mode === "light") {
            document.body.dataset.theme = "light";
            if (themeToggle) {
                themeToggle.checked = true;
            }
        } else {
            document.body.dataset.theme = "dark";
            if (themeToggle) {
                themeToggle.checked = false;
            }
        }
    };

    const initTheme = () => {
        const stored = window.localStorage ? localStorage.getItem("bb-theme") : null;
        const initial = stored === "light" || stored === "dark" ? stored : "dark";
        applyTheme(initial);
        if (themeToggle) {
            themeToggle.addEventListener("change", () => {
                const next = themeToggle.checked ? "light" : "dark";
                applyTheme(next);
                if (window.localStorage) {
                    localStorage.setItem("bb-theme", next);
                }
            });
        }
    };

    const updateConnectionLabel = (text, ok) => {
        connectionLabel.textContent = text;
        connectionLabel.style.color = ok ? "#ffb300" : "#b3c0d9";
    };


    const handSlots = [
        document.getElementById("hand-slot-1"),
        document.getElementById("hand-slot-2"),
        document.getElementById("hand-slot-3"),
        document.getElementById("hand-slot-4"),
    ];

    const positionLabels = "ABCDEFG";

    const getPositionLabel = (index) => {
        if (index < positionLabels.length) {
            return positionLabels[index];
        }
        return String.fromCharCode(65 + (index % 26));
    };

    const clearSelection = (keepPreview = false) => {
        actionMode = null;
        selectedPositions = [];
        selectedBase = null;
        selectedType = null;
        targetMode = "single";
        detectorSelections = [];
        equip1Selections = [];
        equip12Selections = [];
        equip3Selections = [];
        equip3TargetIndex = null;
        equip10Selections = [];
        equip10ContextKey = null;
        equip7Selections = [];
        document.querySelectorAll(".hand-card.selected").forEach((el) => el.classList.remove("selected"));
        if (!keepPreview) {
            document.querySelectorAll(".hand-card.preview-reveal").forEach((el) => el.classList.remove("preview-reveal"));
        }
    };

    const isDetectorSelected = (playerIdx, posIdx) =>
        detectorSelections.some((entry) => entry.playerIndex === playerIdx && entry.position === posIdx);

    const canUseDetectorNow = () => {
        if (!lastState || playerIndex < 0) {
            return false;
        }
        if (lastState.missionEnded || lastState.preTokenPhase || lastState.gameStarted !== true) {
            return false;
        }
        if (lastState.pendingWrongTokenFrom != null) {
            return false;
        }
        if (lastState.pendingTargetMode === "equip5" && lastState.pendingTargetIndex != null) {
            return false;
        }
        const pendingActive =
            lastState.pendingTargetIndex !== null &&
            lastState.pendingTargetIndex !== undefined &&
            lastState.pendingPosition !== null &&
            lastState.pendingPosition !== undefined;
        if (pendingActive || lastState.pendingSelfRevealFrom != null) {
            return false;
        }
        const used = Array.isArray(lastState.detectorUsed) ? lastState.detectorUsed[playerIndex] : false;
        if (used) {
            return false;
        }
        return playerIndex === lastState.turnIndex && actionMode === null;
    };

    const canSelectTargetNow = () => {
        if (!lastState || playerIndex < 0) {
            return false;
        }
        if (lastState.missionEnded || lastState.preTokenPhase || lastState.gameStarted !== true) {
            return false;
        }
        if (isAllRevealed(lastState, playerIndex)) {
            return false;
        }
        if (lastState.pendingWrongTokenFrom != null) {
            return false;
        }
        if (lastState.pendingTargetMode === "equip5" && lastState.pendingTargetIndex != null) {
            return false;
        }
        const pendingActive =
            lastState.pendingTargetIndex !== null &&
            lastState.pendingTargetIndex !== undefined &&
            lastState.pendingPosition !== null &&
            lastState.pendingPosition !== undefined;
        if (pendingActive || lastState.pendingSelfRevealFrom != null || lastState.pendingOpponentRevealFrom != null) {
            return false;
        }
        return playerIndex === lastState.turnIndex;
    };

    const canRevealSameCount = (count) => {
        if (playerIndex < 0) {
            return false;
        }
        const hand = Array.isArray(lastState?.hands) ? lastState.hands[playerIndex] : [];
        const revealRow = Array.isArray(lastState?.revealed) ? lastState.revealed[playerIndex] : [];
        const canRevealAllYellow = () => {
            if (!lastState || !Array.isArray(lastState.hands) || !Array.isArray(lastState.revealed)) {
                return false;
            }
            for (let p = 0; p < lastState.hands.length; p++) {
                const otherHand = lastState.hands[p] || [];
                const otherReveal = lastState.revealed[p] || [];
                for (let i = 0; i < otherHand.length; i++) {
                    if (otherReveal[i]) {
                        continue;
                    }
                    const value = otherHand[i];
                    const frac = Math.round((value - Math.floor(value)) * 10);
                    if (frac === 1 && p !== playerIndex) {
                        return false;
                    }
                }
            }
            return true;
        };
        const baseCounts = {};
        let yellowCount = 0;
        for (let i = 0; i < hand.length; i++) {
            if (revealRow && revealRow[i]) {
                continue;
            }
            const value = hand[i];
            const frac = Math.round((value - Math.floor(value)) * 10);
            if (frac === 5) {
                continue;
            }
            if (frac === 1) {
                yellowCount += 1;
                continue;
            }
            const base = Math.floor(value);
            baseCounts[base] = (baseCounts[base] || 0) + 1;
        }
        if (count === 4) {
            const yellowOk = yellowCount >= 4 && canRevealAllYellow();
            return yellowOk || Object.values(baseCounts).some((v) => v >= 4);
        }
        if (count === 2) {
            if (yellowCount >= 2 && canRevealAllYellow()) {
                return true;
            }
            return Object.values(baseCounts).some((v) => v >= 2) && countRevealedBaseInState(baseCounts, 2);
        }
        return false;
    };

    const getRevealEligiblePositions = (count) => {
        if (playerIndex < 0) {
            return new Set();
        }
        const hand = Array.isArray(lastState?.hands) ? lastState.hands[playerIndex] : [];
        const revealRow = Array.isArray(lastState?.revealed) ? lastState.revealed[playerIndex] : [];
        const canRevealAllYellow = () => {
            if (!lastState || !Array.isArray(lastState.hands) || !Array.isArray(lastState.revealed)) {
                return false;
            }
            for (let p = 0; p < lastState.hands.length; p++) {
                const otherHand = lastState.hands[p] || [];
                const otherReveal = lastState.revealed[p] || [];
                for (let i = 0; i < otherHand.length; i++) {
                    if (otherReveal[i]) {
                        continue;
                    }
                    const value = otherHand[i];
                    const frac = Math.round((value - Math.floor(value)) * 10);
                    if (frac === 1 && p !== playerIndex) {
                        return false;
                    }
                }
            }
            return true;
        };
        const baseCounts = {};
        const positionsByBase = {};
        const yellowPositions = [];
        for (let i = 0; i < hand.length; i++) {
            if (revealRow && revealRow[i]) {
                continue;
            }
            const value = hand[i];
            const frac = Math.round((value - Math.floor(value)) * 10);
            if (frac === 5) {
                continue;
            }
            if (frac === 1) {
                yellowPositions.push(i);
                continue;
            }
            const base = Math.floor(value);
            baseCounts[base] = (baseCounts[base] || 0) + 1;
            if (!positionsByBase[base]) {
                positionsByBase[base] = [];
            }
            positionsByBase[base].push(i);
        }
        const eligible = new Set();
        if (count === 4 && yellowPositions.length >= 4 && canRevealAllYellow()) {
            yellowPositions.forEach((pos) => eligible.add(pos));
        }
        if (count === 2 && yellowPositions.length >= 2 && canRevealAllYellow()) {
            yellowPositions.forEach((pos) => eligible.add(pos));
        }
        Object.keys(baseCounts).forEach((baseStr) => {
            const base = Number(baseStr);
            if (baseCounts[base] < count) {
                return;
            }
            if (count === 2 && !countRevealedBaseInState({ [base]: baseCounts[base] }, 2)) {
                return;
            }
            positionsByBase[base].forEach((pos) => eligible.add(pos));
        });
        return eligible;
    };

    const countRevealedBaseInState = (baseCounts, min) => {
        if (!lastState || !Array.isArray(lastState.hands) || !Array.isArray(lastState.revealed)) {
            return false;
        }
        for (const baseStr of Object.keys(baseCounts)) {
            if (baseCounts[baseStr] < min) {
                continue;
            }
            const base = Number(baseStr);
            let revealedCount = 0;
            lastState.hands.forEach((hand, idx) => {
                const revealRow = lastState.revealed[idx] || [];
                hand.forEach((value, pos) => {
                    const frac = Math.round((value - Math.floor(value)) * 10);
                    if (frac === 1 || frac === 5) {
                        return;
                    }
                    if (revealRow[pos] && Math.floor(value) === base) {
                        revealedCount += 1;
                    }
                });
            });
            if (revealedCount >= 2) {
                return true;
            }
        }
        return false;
    };

    const canRevealAllReds = () => {
        if (playerIndex < 0) {
            return false;
        }
        const hand = Array.isArray(lastState?.hands) ? lastState.hands[playerIndex] : [];
        const revealRow = Array.isArray(lastState?.revealed) ? lastState.revealed[playerIndex] : [];
        let hasUnrevealed = false;
        for (let i = 0; i < hand.length; i++) {
            if (revealRow && revealRow[i]) {
                continue;
            }
            hasUnrevealed = true;
            const value = hand[i];
            const frac = Math.round((value - Math.floor(value)) * 10);
            if (frac !== 5) {
                return false;
            }
        }
        return hasUnrevealed;
    };

    const isAllRevealed = (state, index) => {
        if (!state || index < 0) {
            return false;
        }
        const hand = Array.isArray(state.hands) ? state.hands[index] : [];
        const revealRow = Array.isArray(state.revealed) ? state.revealed[index] : [];
        if (!hand.length) {
            return false;
        }
        for (let i = 0; i < hand.length; i += 1) {
            if (!revealRow[i]) {
                return false;
            }
        }
        return true;
    };

    const countTokenHints = (state) => {
        if (!state || !Array.isArray(state.wrongHints)) {
            return 0;
        }
        let total = 0;
        state.wrongHints.forEach((row) => {
            if (!Array.isArray(row)) {
                return;
            }
            row.forEach((value) => {
                if (value !== null && value !== undefined) {
                    total += 1;
                }
            });
        });
        return total;
    };

    const renderState = (state) => {
        if (!state) {
            return;
        }
        const prevState = lastState;
        lastState = state;
        const started = state.gameStarted === true;
        gameStatus.textContent = started ? "進行中" : "準備中";
        if (!started || state.missionEnded) {
            activeEquipmentNumber = null;
            equip1Selections = [];
        }
        if (!started) {
            clientUsedEquipmentNumbers.clear();
        }
        if (started) {
            startButton.disabled = true;
            startButton.classList.add("hidden");
            endButton.disabled = !isHost;
            endButton.classList.remove("hidden");
            gameNote.textContent = "ゲーム進行中";
            if (optionsPanel) {
                optionsPanel.style.display = "none";
            }
            if (deckPanel) {
                deckPanel.style.display = "";
            }
            if (midPanel) {
                midPanel.style.display = "";
            }
        } else {
            startButton.disabled = !isHost;
            startButton.classList.remove("hidden");
            endButton.disabled = true;
            endButton.classList.add("hidden");
            if (optionsPanel) {
                optionsPanel.style.display = "";
            }
            if (deckPanel) {
                deckPanel.style.display = "none";
            }
            if (midPanel) {
                midPanel.style.display = "none";
            }
        }
        if (state.options) {
            applyOptions(state.options);
        }
        if (typeof state.mistakesRemaining === "number" && mistValue) {
            mistValue.textContent = String(state.mistakesRemaining);
        }
        const usedEquipmentNumbers = Array.isArray(state.usedEquipmentNumbers) ? state.usedEquipmentNumbers : [];
        const equipmentLocked = state.equipmentInUseNumber != null && state.equipmentInUseBy != null;
        const isSelfAllRevealed = isAllRevealed(state, playerIndex);
        const unlockedEquipmentNumbers = new Set();
        if (Array.isArray(state.hands) && Array.isArray(state.revealed)) {
            const revealedCounts = {};
            state.hands.forEach((hand, pIdx) => {
                const revealRow = state.revealed[pIdx] || [];
                hand.forEach((value, pos) => {
                    if (!revealRow[pos]) {
                        return;
                    }
                    const frac = Math.round((value - Math.floor(value)) * 10);
                    if (frac !== 0) {
                        return;
                    }
                    const base = Math.floor(value);
                    revealedCounts[base] = (revealedCounts[base] || 0) + 1;
                });
            });
            Object.keys(revealedCounts).forEach((baseStr) => {
                if (revealedCounts[baseStr] >= 2) {
                    unlockedEquipmentNumbers.add(Number(baseStr));
                }
            });
        }
        if (Array.isArray(state.equipmentNumbers)) {
            const maxSlots = Math.max(
                equipmentButtons.length,
                equipmentLabels.length,
                equipmentImages.length
            );
            for (let index = 0; index < maxSlots; index += 1) {
                const value = state.equipmentNumbers[index];
                const label = equipmentLabels[index];
                const image = equipmentImages[index];
                const button = equipmentButtons[index];
                const hasValue = typeof value === "number";
                if (label) {
                    label.textContent = hasValue ? String(value) : "-";
                }
                if (image) {
                    if (hasValue) {
                        image.src = `/img/image${value}.png`;
                        image.alt = `装備${value}`;
                    } else {
                        image.src = "";
                        image.alt = "装備なし";
                    }
                }
                if (button) {
                    if (hasValue) {
                        button.style.display = "";
                        button.dataset.equipmentNumber = String(value);
                        const used =
                            usedEquipmentNumbers.includes(value) ||
                            clientUsedEquipmentNumbers.has(value);
                        const unlocked = unlockedEquipmentNumbers.has(value);
                        button.disabled = used || !unlocked || state.preTokenPhase || equipmentLocked || isSelfAllRevealed;
                        button.classList.toggle("equipment-used", used);
                    } else {
                        button.style.display = "none";
                        button.disabled = true;
                        button.classList.remove("equipment-used");
                        button.removeAttribute("data-equipment-number");
                    }
                }
            }
        }
        const yellowDashed = state.options && state.options.yellow && state.options.yellow.pool !== state.options.yellow.draw;
        const redDashed = state.options && state.options.red && state.options.red.pool !== state.options.red.draw;
        const revealedBases = new Set();
        const revealedExact = new Set();
        if (Array.isArray(state.hands) && Array.isArray(state.revealed)) {
            const totalByBase = {};
            const revealedByBase = {};
            const totalByExact = {};
            const revealedByExact = {};
            state.hands.forEach((hand, pIdx) => {
                const revealRow = state.revealed[pIdx] || [];
                hand.forEach((value, pos) => {
                    const rounded = Math.round(value * 10) / 10;
                    const frac = Math.round((rounded - Math.floor(rounded)) * 10);
                    const key = rounded.toFixed(1);
                    if (frac !== 0) {
                        totalByExact[key] = (totalByExact[key] || 0) + 1;
                        if (revealRow[pos]) {
                            revealedByExact[key] = (revealedByExact[key] || 0) + 1;
                        }
                        return;
                    }
                    const base = Math.floor(rounded);
                    totalByBase[base] = (totalByBase[base] || 0) + 1;
                    if (revealRow[pos]) {
                        revealedByBase[base] = (revealedByBase[base] || 0) + 1;
                    }
                });
            });
            Object.keys(totalByBase).forEach((baseStr) => {
                const base = Number(baseStr);
                if (revealedByBase[base] === 4) {
                    revealedBases.add(base);
                }
            });
            Object.keys(totalByExact).forEach((key) => {
                if ((revealedByExact[key] || 0) === totalByExact[key]) {
                    revealedExact.add(key);
                }
            });
        }
        if (Array.isArray(state.deckNumbers) && deckList) {
            deckList.innerHTML = "";
            if (state.deckNumbers.length === 0) {
                const empty = document.createElement("li");
                empty.className = "deck-empty";
                empty.textContent = "未設定";
                deckList.appendChild(empty);
            } else {
                state.deckNumbers.forEach((value) => {
                    const item = document.createElement("li");
                    const rounded = Math.round(value * 10) / 10;
                    const frac = Math.round((rounded - Math.floor(rounded)) * 10);
                    const base = Math.floor(rounded);
                    if (frac === 1) {
                        item.classList.add("deck-yellow");
                        item.classList.add(yellowDashed ? "deck-dashed" : "deck-solid");
                    } else if (frac === 5) {
                        item.classList.add("deck-red");
                        item.classList.add(redDashed ? "deck-dashed" : "deck-solid");
                    } else {
                        item.classList.add("deck-solid");
                    }
                    if ((frac === 0 && revealedBases.has(base)) || (frac !== 0 && revealedExact.has(rounded.toFixed(1)))) {
                        item.classList.add("deck-complete");
                    }
                    item.textContent = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
                    deckList.appendChild(item);
                });
            }
        }
        const revealed = Array.isArray(state.revealed) ? state.revealed : [];
        const wrongHints = Array.isArray(state.wrongHints) ? state.wrongHints : [];
        const differentLabels = Array.isArray(state.differentLabels) ? state.differentLabels : [];
        const equalLabels = Array.isArray(state.equalLabels) ? state.equalLabels : [];
        let redHintBlocked = false;
        const equipmentInUseNumber = state.equipmentInUseNumber;
        const equipmentInUseBy = state.equipmentInUseBy;
        const pendingTarget = state.pendingTargetIndex;
        const pendingPosition = state.pendingPosition;
        const pendingTarget2 = state.pendingTargetIndex2;
        const pendingPosition2 = state.pendingPosition2;
        const pendingPosition3 = state.pendingPosition3;
        const pendingMode = state.pendingTargetMode || "single";
        const pendingWrongTokenFrom = state.pendingWrongTokenFrom;
        const pendingWrongTokenPosition = state.pendingWrongTokenPosition;
        const pendingWrongTokenPosition2 = state.pendingWrongTokenPosition2;
        const pendingWrongTokenPosition3 = state.pendingWrongTokenPosition3;
        const pendingOpponentRevealFrom = state.pendingOpponentRevealFrom;
        const pendingOpponentRevealPosition = state.pendingOpponentRevealPosition;
        const pendingOpponentRevealPosition2 = state.pendingOpponentRevealPosition2;
        const pendingOpponentRevealPosition3 = state.pendingOpponentRevealPosition3;
        const pendingOpponentRevealBase = state.pendingOpponentRevealBase;
        const pendingOpponentRevealYellow = state.pendingOpponentRevealYellow;
        const detectorUsed = Array.isArray(state.detectorUsed) ? state.detectorUsed : [];
        const pendingFrom = state.pendingFromIndex;
        const pendingSelfFrom = state.pendingSelfRevealFrom;
        const pendingSelfBase = state.pendingSelfRevealBase;
        const pendingSelfYellow = state.pendingSelfRevealYellow;
        const pendingActive =
            pendingTarget !== null &&
            pendingTarget !== undefined &&
            pendingPosition !== null &&
            pendingPosition !== undefined;
        const pendingEquipmentNumberState = state.pendingEquipmentNumber;
        const pendingEquipmentFromPositionState = state.pendingEquipmentFromPosition;
        const pendingEquipmentTargetPositionState = state.pendingEquipmentTargetPosition;
        const pendingEquipmentWaitingTargetChoiceState = state.pendingEquipmentWaitingTargetChoice;
        const radarNumber = state.radarNumber;
        const radarPlayers = Array.isArray(state.radarPlayers) ? state.radarPlayers : [];
        const iceActiveBy = state.iceActiveBy;
        const swapPendingConfirmationState = state.swapPendingConfirmation;
        const swapHighlightPlayerAState = state.swapHighlightPlayerA;
        const swapHighlightPlayerBState = state.swapHighlightPlayerB;
        const swapHighlightValueAState = state.swapHighlightValueA;
        const swapHighlightValueBState = state.swapHighlightValueB;
        const swapHighlightPositionAState = state.swapHighlightPositionA;
        const swapHighlightPositionBState = state.swapHighlightPositionB;
        const inTokenPhase = started && state.preTokenPhase;
        const tokenTurnIndex = state.tokenTurnIndex;
        const isTokenTurn = inTokenPhase && playerIndex === tokenTurnIndex;
        if (usedEquipmentNumbers.includes(1) && String(activeEquipmentNumber) === "1") {
            activeEquipmentNumber = null;
        }
        const equip4Active = String(activeEquipmentNumber) === "4";
        const equip1Active = String(activeEquipmentNumber) === "1";
        const equip12Active = String(activeEquipmentNumber) === "12";
        const equip11Active = String(activeEquipmentNumber) === "11";
        const equip3Active = String(activeEquipmentNumber) === "3";
        const equip5Active = String(activeEquipmentNumber) === "5";
        const equip10Active = String(activeEquipmentNumber) === "10";
        const equip4Available =
            equip4Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase &&
            !pendingActive &&
            pendingSelfFrom == null &&
            pendingOpponentRevealFrom == null;
        const equip1Available =
            equip1Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase;
        const equip12Available =
            equip12Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase;
        const equip11Available =
            equip11Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase;
        const equip3Available =
            equip3Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase &&
            !pendingActive &&
            pendingSelfFrom == null &&
            pendingOpponentRevealFrom == null;
        const equip5Available =
            equip5Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase &&
            !pendingActive &&
            pendingSelfFrom == null &&
            pendingOpponentRevealFrom == null;
        const equip10Available =
            equip10Active &&
            started &&
            !state.missionEnded &&
            !state.preTokenPhase &&
            !pendingActive &&
            pendingSelfFrom == null &&
            pendingOpponentRevealFrom == null &&
            pendingWrongTokenFrom == null &&
            playerIndex === state.turnIndex;
        const equipSpecialActive =
            equip1Available ||
            equip4Available ||
            equip12Available ||
            equip11Available ||
            equip3Available ||
            equip3Active ||
            equip5Available ||
            equip5Active ||
            equip10Available ||
            equip10Active;

        if (Array.isArray(state.players)) {
            state.players.forEach((name, index) => {
                const slot = nameSlots[index];
                if (slot) {
                    slot.textContent = name && name.trim() ? name : "未参加";
                }
            });
            if (playerName) {
                const normalized = playerName.trim();
                const foundIndex = state.players.findIndex((name) => name && name.trim() === normalized);
                if (foundIndex !== -1) {
                    playerIndex = foundIndex;
                    isHost = foundIndex === 0;
                    if (started) {
                        startButton.disabled = true;
                        startButton.classList.add("hidden");
                        endButton.disabled = !isHost;
                        endButton.classList.remove("hidden");
                    } else {
                        startButton.disabled = !isHost;
                        startButton.classList.remove("hidden");
                        endButton.disabled = true;
                        endButton.classList.add("hidden");
                    }
                    setOptionsDisabled(!isHost);
                }
            }
        }

        handLabels.forEach((label, index) => {
            if (!label) {
                return;
            }
            label.textContent = playerIndex === index ? "あなた" : "";
        });

        const actionsAllowed = started && !state.missionEnded && !inTokenPhase && pendingWrongTokenFrom == null;
        if (inTokenPhase && actionMode) {
            clearSelection();
        }
        const isMyTurn = actionsAllowed && playerIndex === state.turnIndex;
        const pendingGuessActive = pendingActive || (pendingMode === "equip5" && pendingTarget !== null && pendingTarget !== undefined);
        const canAct = isMyTurn && !pendingGuessActive && pendingSelfFrom == null && pendingOpponentRevealFrom == null;
        const canReveal4 = canAct && canRevealSameCount(4);
        const canReveal2 = canAct && canRevealSameCount(2);
        const canRevealReds = canAct && canRevealAllReds();
        const canSkip = canAct && isSelfAllRevealed;
        if (actionReveal4) {
            actionReveal4.style.display = canReveal4 ? "" : "none";
            actionReveal4.classList.toggle("is-active", canAct && actionMode === "reveal4");
        }
        if (actionReveal2) {
            actionReveal2.style.display = canReveal2 ? "" : "none";
            actionReveal2.classList.toggle("is-active", canAct && actionMode === "reveal2");
        }
        if (actionRevealReds) {
            actionRevealReds.style.display = canRevealReds ? "" : "none";
            actionRevealReds.classList.toggle("is-active", false);
        }
        detectorButtons.forEach((btn, index) => {
            if (!btn) {
                return;
            }
        const canUseDetector = canAct && index === playerIndex && !equipmentLocked && !isSelfAllRevealed;
            btn.style.display = canUseDetector ? "" : "none";
            if (targetMode === "detector" && canUseDetector) {
                btn.classList.add("is-active");
            } else {
                btn.classList.remove("is-active");
            }
        });
        if (actionTarget) {
            actionTarget.style.display = canAct && !isSelfAllRevealed ? "" : "none";
            actionTarget.classList.toggle("is-active", canAct && actionMode === null);
        }
        if (actionSkip) {
            actionSkip.style.display = canSkip ? "" : "none";
            actionSkip.classList.toggle("is-active", false);
        }
        if (notice) {
            let redHintMessage = "";
            let equip7Message = "";
            if (redHintBlocked) {
                const currentVersion = state.version;
                if (currentVersion != null && currentVersion !== lastRedHintVersion) {
                    redHintMessage = "⚠️ トークンを置こうとしましたが、実行できませんでした...。";
                    lastRedHintVersion = currentVersion;
                }
            }
            if (state.lastAction && state.lastAction.startsWith("装備7：")) {
                const currentVersion = state.version;
                if (currentVersion != null && currentVersion !== lastEquip7Version) {
                    equip7Message = state.lastAction.replace(/^装備7：/, "");
                    lastEquip7Version = currentVersion;
                }
            }
            if (state.missionEnded) {
                notice.textContent = state.missionSuccess ? "🎉ミッション成功！" : "💥ミッション失敗…";
            } else if (inTokenPhase && isTokenTurn) {
                notice.textContent = "🧩 初期トークン配置: 自分のコードから黄色/赤以外を1本選んでください。";
            } else if (inTokenPhase) {
                notice.textContent = "🧩 初期トークン配置: 隊長から順に配置中です。";
            } else if (started && pendingOpponentRevealFrom === playerIndex) {
                notice.textContent = "✅️ 相手があなたのコードを当てました！選ばれたコードを公開してください。";
            } else if (started && pendingOpponentRevealFrom !== null) {
                notice.textContent = "✅️ 正解です！相手の公開待ちです。";
            } else if (started && pendingSelfFrom === playerIndex) {
                notice.textContent = "✅️ 正解です！自分のコードを1本公開してください。";
            } else if (started && isMyTurn && targetMode === "detector") {
                notice.textContent = "🔍 個人装備: フツーノ探知機を使用します。任意のコードを2本選んでください（黄色は宣言不可）。";
            } else if (started && pendingWrongTokenFrom != null && playerIndex === pendingWrongTokenFrom) {
                notice.textContent = pendingWrongTokenPosition == null
                    ? "❌️ 失敗しました。自分のコードの任意の1本にトークンを置いてください。"
                    : (pendingWrongTokenPosition3 != null
                        ? "❌️ 失敗しました。3本のうち1本を選んでトークンを置いてください。"
                        : "❌️ 失敗しました。2本のうち1本を選んでトークンを置いてください。");
            } else if (started && pendingWrongTokenFrom != null) {
                notice.textContent = "⏳ 相手がトークンを選択中です。";
            } else if (started && pendingActive && playerIndex === pendingTarget) {
                if (pendingMode === "equip5") {
                    notice.textContent = "🎯 相手が数字を推測しています。";
                } else {
                    const labels = [getPositionLabel(pendingPosition)];
                    if (
                        pendingMode === "detector" &&
                        pendingTarget2 !== null &&
                        pendingPosition2 !== null &&
                        pendingTarget2 === playerIndex
                    ) {
                        labels.push(getPositionLabel(pendingPosition2));
                    }
                    if (pendingMode === "equip3" && pendingPosition2 !== null) {
                        labels.push(getPositionLabel(pendingPosition2));
                    }
                    if (pendingMode === "equip3" && pendingPosition3 !== null) {
                        labels.push(getPositionLabel(pendingPosition3));
                    }
                    notice.textContent = `🎯 あなたのコード${labels.join("&")}が選ばれました。相手が数字を推測しています。`;
                }
            } else if (
                started &&
                pendingEquipmentNumberState === 2 &&
                pendingEquipmentWaitingTargetChoiceState &&
                pendingTarget === playerIndex
            ) {
                notice.textContent = "🔁 交換するコードを1本選んでください。";
            } else if (started && pendingEquipmentNumberState === 2 && pendingEquipmentWaitingTargetChoiceState) {
                notice.textContent = "⏳ 相手の選択待ちです。";
            } else if (started && pendingEquipmentNumberState === 2 && pendingFrom === playerIndex) {
                notice.textContent = "🔧 装備2: 自分のコードを選択してください。";
            } else if (started && pendingEquipmentNumberState === 2 && pendingTarget === playerIndex) {
                notice.textContent = "🔁 交換相手に選ばれました。相手の選択待ちです。";
            } else if (started && pendingGuessActive && playerIndex === pendingFrom) {
                if (pendingMode === "equip5") {
                    notice.textContent = "🎯 数字を宣言してください（黄色は宣言不可）。";
                } else if (pendingMode === "equip10") {
                    notice.textContent = "🎯 2つの数字を宣言してください。";
                } else {
                    notice.textContent = "🎯 このコードの数字を宣言してください。";
                }
            } else if (started && pendingGuessActive) {
                notice.textContent = "⏳ 他プレイヤーの回答待ちです。";
            } else if (started && (equip1Available || equip4Available || equip12Available || equip11Available)) {
                if (equip1Available) {
                    notice.textContent = "🔧 装備1を使用中：自分の隣接する異なるコードを2本選んでください。";
                } else if (equip12Available) {
                    notice.textContent = "🔧 装備12を使用中：自分の隣接する同じコードを2本選んでください。";
                } else if (equip4Available) {
                    notice.textContent = "🔧 装備4を使用中：自分の非赤/非黄色のコードを1つ選択してください。";
                } else if (equip11Available) {
                    notice.textContent = "🔧 装備11を使用中：次の手番プレイヤーを選んでください。";
                }
            } else if (started && equip3Available) {
                notice.textContent = "🔧 装備3を使用中：同じ相手のコードを3本選んでください（黄色は宣言不可）。";
            } else if (started && equip5Available) {
                notice.textContent = "🔧 装備5を使用中：相手のプレイヤーを選んでください（黄色は宣言不可）。";
            } else if (started && equip10Available) {
                notice.textContent = "🔧 装備10を使用中：相手のコードを1本選んでください。";
            } else if (
                started &&
                equipmentInUseNumber != null &&
                equipmentInUseBy != null &&
                equipmentInUseBy !== playerIndex &&
                isMyTurn &&
                !pendingActive
            ) {
                notice.textContent = "⏳ 他のプレイヤーが装備を使用しています。";
            } else if (started && isMyTurn) {
                notice.textContent = "🕒 あなたの番です。相手のコードを1本選んでください。";
            } else if (started) {
                notice.textContent = "⏳ 他プレイヤーの番です。";
                if (redHintMessage) {
                    notice.textContent = `${redHintMessage} ${notice.textContent}`.trim();
                }
            } else {
                notice.textContent = "";
            }
            if (equip7Message && notice.textContent) {
                notice.textContent = `${equip7Message} ${notice.textContent}`.trim();
            }
            if (iceActiveBy !== null && iceActiveBy !== undefined && notice.textContent) {
                notice.textContent = `[🧊] ${notice.textContent}`;
            }
        }
        if (equipmentTargetModal && equipmentTargetButtons) {
            equipmentTargetButtons.innerHTML = "";
            if ((equipmentSelectionMode === 2 || equipmentSelectionMode === 11 || equipmentSelectionMode === 5 || equipmentSelectionMode === 7) && Array.isArray(state.players)) {
                equipmentTargetButtons.classList.add("target-buttons");
                let targetCount = 0;
                state.players.forEach((name, index) => {
                    if (equipmentSelectionMode === 7 && !detectorUsed[index]) {
                        return;
                    }
                    if (equipmentSelectionMode === 11 && index === playerIndex) {
                        return;
                    }
                    const fullyRevealedTarget = isAllRevealed(state, index);
                    if (fullyRevealedTarget) {
                        return;
                    }
                    const button = document.createElement("button");
                    button.type = "button";
                    button.className = "target-button";
                    button.textContent = name && name.trim() ? name : `プレイヤー${index + 1}`;
                    if (equipmentSelectionMode === 7 && equip7Selections.includes(index)) {
                        button.classList.add("is-active");
                        button.disabled = true;
                    }
                    targetCount += 1;
                    button.addEventListener("click", () => {
                        if (button.disabled) {
                            return;
                        }
                        if (equipmentSelectionMode === 2) {
                            stompClient.send(
                                "/app/equipment",
                                {},
                                JSON.stringify({ equipmentNumber: 2, action: "start", targetPlayerIndex: index })
                            );
                        } else if (equipmentSelectionMode === 5) {
                            stompClient.send(
                                "/app/target",
                                {},
                                JSON.stringify({
                                    targetPlayerIndex: index,
                                    targetPosition: -1,
                                    mode: "equip5",
                                })
                            );
                        } else if (equipmentSelectionMode === 7) {
                            if (!equip7Selections.includes(index)) {
                                equip7Selections.push(index);
                            }
                            if (equip7Selections.length < 2) {
                                if (equipmentTargetMessage) {
                                    equipmentTargetMessage.textContent = "もう1人選ぶか、完了を押してください。";
                                }
                                if (equipmentTargetConfirm) {
                                    equipmentTargetConfirm.style.display = "";
                                    equipmentTargetConfirm.disabled = false;
                                }
                                return;
                            }
                            if (stompClient && isConnected) {
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 7, targetPlayerIndexes: equip7Selections })
                                );
                            }
                        } else {
                            stompClient.send(
                                "/app/equipment",
                                {},
                                JSON.stringify({ equipmentNumber: 11, targetPlayerIndex: index })
                            );
                        }
                        equipmentSelectionMode = null;
                        activeEquipmentNumber = null;
                        equip7Selections = [];
                        if (equipmentTargetModal.contains(document.activeElement)) {
                            document.activeElement.blur();
                        }
                        equipmentTargetModal.classList.remove("is-visible");
                        equipmentTargetModal.setAttribute("aria-hidden", "true");
                        equipmentTargetModal.style.display = "";
                        clearSelection();
                    });
                    equipmentTargetButtons.appendChild(button);
                });
                if (equipmentTargetMessage) {
                    if (equipmentSelectionMode === 11) {
                        equipmentTargetMessage.textContent = "次の手番プレイヤーを選んでください。";
                    } else if (equipmentSelectionMode === 5) {
                        equipmentTargetMessage.textContent = "判定対象のプレイヤーを1人選んでください。";
                    } else if (equipmentSelectionMode === 7) {
                        equipmentTargetMessage.textContent = "再使用可能にする探知機の持ち主を1〜2人選んでください。";
                    } else {
                        equipmentTargetMessage.textContent = "交換先のプレイヤーを1人選んでください。";
                    }
                }
                if (equipmentTargetConfirm) {
                    if (equipmentSelectionMode === 7 && equip7Selections.length > 0) {
                        equipmentTargetConfirm.style.display = "";
                        equipmentTargetConfirm.disabled = false;
                    } else {
                        equipmentTargetConfirm.style.display = "none";
                        equipmentTargetConfirm.disabled = true;
                    }
                }
                if (equipmentSelectionMode === 7 && targetCount === 0) {
                    equipmentSelectionMode = null;
                    activeEquipmentNumber = null;
                    equip7Selections = [];
                    if (equipmentTargetModal.contains(document.activeElement)) {
                        document.activeElement.blur();
                    }
                    equipmentTargetModal.classList.remove("is-visible");
                    equipmentTargetModal.setAttribute("aria-hidden", "true");
                    equipmentTargetModal.style.display = "";
                    if (notice) {
                        notice.textContent = "使用済みの探知機がありません。";
                    }
                } else {
                    equipmentTargetModal.classList.add("is-visible");
                    equipmentTargetModal.setAttribute("aria-hidden", "false");
                    equipmentTargetModal.style.display = "flex";
                }
            } else {
                equipmentTargetModal.classList.remove("is-visible");
                equipmentTargetModal.setAttribute("aria-hidden", "true");
                equipmentTargetModal.style.display = "";
                if (equipmentTargetConfirm) {
                    equipmentTargetConfirm.style.display = "none";
                    equipmentTargetConfirm.disabled = true;
                }
            }
        }
        if (actionPanel) {
            actionPanel.style.display = actionsAllowed ? "flex" : "none";
        }
        if (Array.isArray(equipmentButtons)) {
            equipmentButtons.forEach((button) => {
                if (!button) {
                    return;
                }
                if (button.dataset.equipmentNumber === "11" || button.dataset.equipmentNumber === "3" || button.dataset.equipmentNumber === "5" || button.dataset.equipmentNumber === "9" || button.dataset.equipmentNumber === "10") {
                    button.disabled = button.disabled || !isMyTurn;
                }
            });
        }
        if (guessPanel) {
            if (!inTokenPhase && started && pendingGuessActive && playerIndex === pendingFrom) {
                guessPanel.style.display = "flex";
                const onTopRow = playerIndex === 0 || playerIndex === 1;
                guessPanel.style.order = onTopRow ? -1 : 2;
            } else {
                guessPanel.style.display = "none";
                guessPanel.style.order = "";
            }
        }
        handContainers.forEach((container, index) => {
            if (!container) {
                return;
            }
            const turnIndex = inTokenPhase ? tokenTurnIndex : state.turnIndex;
            if (started && turnIndex === index) {
                container.classList.add("is-turn");
            } else {
                container.classList.remove("is-turn");
            }
            const detectorButton = detectorButtons[index];
            if (detectorButton) {
                const alreadyUsed = !!detectorUsed[index];
                const enabled = canAct && index === playerIndex && !alreadyUsed && !isSelfAllRevealed;
                detectorButton.disabled = !enabled;
                if (targetMode === "detector" && enabled) {
                    detectorButton.classList.add("is-active");
                } else {
                    detectorButton.classList.remove("is-active");
                }
            }
        });
        parentIcons.forEach((icon, index) => {
            if (!icon) {
                return;
            }
            if (started && state.parentIndex === index) {
                icon.classList.add("is-parent");
            } else {
                icon.classList.remove("is-parent");
            }
        });

        if (Array.isArray(state.hands)) {
            state.hands.forEach((hand, index) => {
                const slot = handSlots[index];
                if (!slot) {
                    return;
                }
                slot.innerHTML = "";
                if (!state.gameStarted) {
                    const waiting = document.createElement("li");
                    waiting.className = "hand-empty";
                    waiting.textContent = "待機中";
                    slot.appendChild(waiting);
                    return;
                }
                if (!Array.isArray(hand) || hand.length === 0) {
                    const empty = document.createElement("li");
                    empty.className = "hand-empty";
                    empty.textContent = "未配布";
                    slot.appendChild(empty);
                    return;
                }
                hand.forEach((value, posIndex) => {
                    const item = document.createElement("li");
                    item.className = "hand-card";
                    item.dataset.playerIndex = String(index);
                    item.dataset.positionIndex = String(posIndex);
                    item.dataset.value = String(value);

                    const label = document.createElement("span");
                    label.className = "pos-label";
                    label.textContent = getPositionLabel(posIndex);

                    const valueSpan = document.createElement("span");
                    valueSpan.className = "card-value";
                    const isOwner = index === playerIndex;
                    const isRevealed = revealed[index] && revealed[index][posIndex];
                    if (isOwner || isRevealed) {
                        const rounded = Math.round(value * 10) / 10;
                        const frac = Math.round((rounded - Math.floor(rounded)) * 10);
                        if (frac === 1) {
                            valueSpan.classList.add("hand-yellow");
                        } else if (frac === 5) {
                            valueSpan.classList.add("hand-red");
                        }
                        valueSpan.textContent = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
                        if (isRevealed) {
                            item.classList.add("revealed-card");
                        }
                    } else {
                        valueSpan.classList.add("hand-hidden");
                        valueSpan.textContent = "?";
                    }

                    const hintValue = wrongHints[index] ? wrongHints[index][posIndex] : null;
                    let hintElement = null;
                    if (hintValue !== null && hintValue !== undefined) {
                        const hint = document.createElement("span");
                        hint.className = "hand-hint";
                        const numericHint = Number(hintValue);
                        if (Number.isNaN(numericHint)) {
                            hint.classList.add("hand-yellow");
                            hint.textContent = "■";
                        } else if (numericHint < 0) {
                            redHintBlocked = true;
                        } else {
                            const roundedHint = Math.round(numericHint * 10) / 10;
                            hint.textContent = Number.isInteger(roundedHint) ? String(roundedHint) : roundedHint.toFixed(1);
                        }
                        if (numericHint >= 0 || Number.isNaN(numericHint)) {
                            item.appendChild(hint);
                            hintElement = hint;
                        }
                    }

                    const labelCount = differentLabels[index] ? differentLabels[index][posIndex] : 0;
                    if (labelCount && labelCount > 0) {
                        const labelToken = document.createElement("span");
                        labelToken.className = "hand-label-token";
                        labelToken.textContent = "≠";
                        item.appendChild(labelToken);
                    }
                    const equalCount = equalLabels[index] ? equalLabels[index][posIndex] : 0;
                    if (equalCount && equalCount > 0) {
                        const equalToken = document.createElement("span");
                        equalToken.className = "hand-label-token is-equal";
                        equalToken.textContent = "＝";
                        item.appendChild(equalToken);
                    }
                    const labelTokens = item.querySelectorAll(".hand-label-token");
                    labelTokens.forEach((token, idx) => {
                        token.style.top = `${2 - idx * 18}px`;
                    });
                    if (hintElement && labelTokens.length > 0) {
                        hintElement.style.top = `${2 + labelTokens.length * 18}px`;
                    }
                    item.appendChild(label);
                    item.appendChild(valueSpan);

                    if (targetMode === "detector" && isDetectorSelected(index, posIndex)) {
                        item.classList.add("selected");
                    }

                    if (equip1Available && index === playerIndex) {
                        const hand = Array.isArray(state.hands) ? state.hands[index] : [];
                        item.classList.add("selectable");
                        item.addEventListener("click", () => {
                            if (equip1Selections.includes(posIndex)) {
                                equip1Selections = equip1Selections.filter((pos) => pos !== posIndex);
                                item.classList.remove("selected");
                                item.classList.remove("equip-selected");
                                return;
                            }
                            if (equip1Selections.length === 0) {
                                equip1Selections = [posIndex];
                                item.classList.add("selected");
                                item.classList.add("equip-selected");
                                return;
                            }
                            if (equip1Selections.length === 1) {
                                const firstPos = equip1Selections[0];
                                if (Math.abs(firstPos - posIndex) !== 1) {
                                    if (notice) {
                                        notice.textContent = "⚠️ 隣接していないコードを選んでいます。隣接する2本のコードを選んでください。";
                                    }
                                    return;
                                }
                                const valueA = Math.round(hand[firstPos] * 10) / 10;
                                const valueB = Math.round(hand[posIndex] * 10) / 10;
                                const fracA = Math.round((valueA - Math.floor(valueA)) * 10);
                                const fracB = Math.round((valueB - Math.floor(valueB)) * 10);
                                if ((fracA === 1 && fracB === 1) || (fracA === 5 && fracB === 5) || valueA === valueB) {
                                    if (notice) {
                                        notice.textContent = "⚠️ 数字が同じか、両方黄色/赤のコードを選んでいます。異なる数字のコードを選んでください。";
                                    }
                                    return;
                                }
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 1, positionA: firstPos, positionB: posIndex })
                                );
                                clearSelection();
                                activeEquipmentNumber = null;
                            }
                        });
                    }

                    if (equip12Available && index === playerIndex) {
                        const hand = Array.isArray(state.hands) ? state.hands[index] : [];
                        item.classList.add("selectable");
                        item.addEventListener("click", () => {
                            if (equip12Selections.includes(posIndex)) {
                                equip12Selections = equip12Selections.filter((pos) => pos !== posIndex);
                                item.classList.remove("selected");
                                item.classList.remove("equip-selected");
                                return;
                            }
                            if (equip12Selections.length === 0) {
                                equip12Selections = [posIndex];
                                item.classList.add("selected");
                                item.classList.add("equip-selected");
                                return;
                            }
                            if (equip12Selections.length === 1) {
                                const firstPos = equip12Selections[0];
                                if (Math.abs(firstPos - posIndex) !== 1) {
                                    if (notice) {
                                        notice.textContent = "⚠️ 隣接していないコードを選んでいます。隣接する2本のコードを選んでください。";
                                    }
                                    return;
                                }
                                const valueA = Math.round(hand[firstPos] * 10) / 10;
                                const valueB = Math.round(hand[posIndex] * 10) / 10;
                                const fracA = Math.round((valueA - Math.floor(valueA)) * 10);
                                const fracB = Math.round((valueB - Math.floor(valueB)) * 10);
                                const bothYellow = fracA === 1 && fracB === 1;
                                const bothRed = fracA === 5 && fracB === 5;
                                if (!bothYellow && !bothRed && valueA !== valueB) {
                                    if (notice) {
                                        notice.textContent = "⚠️ 数字が異なるコードを選んでいます。同じ数字の隣接コードを選んでください。(黄色/赤同士は同じ数字とみなす)";
                                    }
                                    return;
                                }
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 12, positionA: firstPos, positionB: posIndex })
                                );
                                clearSelection();
                                activeEquipmentNumber = null;
                            }
                        });
                    }

                    if (equip4Available && index === playerIndex) {
                        const value = Number(item.dataset.value);
                        const frac = Math.round((value - Math.floor(value)) * 10);
                        const isRevealed = revealed[index] && revealed[index][posIndex];
                        const hasHint = wrongHints[index] && wrongHints[index][posIndex] !== null && wrongHints[index][posIndex] !== undefined;
                        if (!isRevealed && !hasHint && frac !== 1 && frac !== 5) {
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 4, position: posIndex })
                                );
                                activeEquipmentNumber = null;
                                if (notice) {
                                    notice.textContent = "装備4：トークンを設置しました。";
                                }
                            });
                        }
                    }

                    if (equip3Available && index !== playerIndex) {
                        const targetFullyRevealed = isAllRevealed(state, index);
                        const isHidden = !(revealed[index] && revealed[index][posIndex]);
                        if (!targetFullyRevealed && isHidden) {
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                if (detectorSelections.some((e) => e.playerIndex === index && e.position === posIndex)) {
                                    detectorSelections = detectorSelections.filter(
                                        (e) => !(e.playerIndex === index && e.position === posIndex)
                                    );
                                    item.classList.remove("selected");
                                    item.classList.remove("equip-selected");
                                    if (detectorSelections.length === 0) {
                                        equip3TargetIndex = null;
                                    }
                                    return;
                                }
                                if (detectorSelections.length === 0) {
                                    equip3TargetIndex = index;
                                }
                                if (equip3TargetIndex !== index) {
                                    return;
                                }
                                if (detectorSelections.length >= 3) {
                                    return;
                                }
                                detectorSelections.push({ playerIndex: index, position: posIndex });
                                item.classList.add("selected");
                                item.classList.add("equip-selected");
                                if (detectorSelections.length === 3 && equip3TargetIndex !== null) {
                                    stompClient.send(
                                        "/app/target",
                                        {},
                                        JSON.stringify({
                                            targetPlayerIndex: equip3TargetIndex,
                                            targetPosition: detectorSelections[0].position,
                                            targetPosition2: detectorSelections[1].position,
                                            targetPosition3: detectorSelections[2].position,
                                            mode: "equip3",
                                        })
                                    );
                                    clearSelection();
                                    activeEquipmentNumber = null;
                                }
                            });
                        }
                    }

                    if (equip10Available && index !== playerIndex) {
                        const targetFullyRevealed = isAllRevealed(state, index);
                        const isHidden = !(revealed[index] && revealed[index][posIndex]);
                        if (!targetFullyRevealed && isHidden) {
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/target",
                                    {},
                                    JSON.stringify({
                                        targetPlayerIndex: index,
                                        targetPosition: posIndex,
                                        mode: "equip10",
                                    })
                                );
                                clearSelection();
                                activeEquipmentNumber = null;
                            });
                        }
                    }

                    if (!equipSpecialActive && inTokenPhase && isTokenTurn && index === playerIndex) {
                        const value = Number(item.dataset.value);
                        const frac = Math.round((value - Math.floor(value)) * 10);
                        const isRevealed = revealed[index] && revealed[index][posIndex];
                        const hasHint = wrongHints[index] && wrongHints[index][posIndex] !== null && wrongHints[index][posIndex] !== undefined;
                        if (!isRevealed && !hasHint && frac !== 1 && frac !== 5) {
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/token",
                                    {},
                                    JSON.stringify({ position: posIndex })
                                );
                            });
                        }
                    }

                    if (!equipSpecialActive && isMyTurn && !pendingActive && pendingSelfFrom == null && actionMode && index === playerIndex) {
                        const required = actionMode === "reveal4" ? 4 : 2;
                        const eligible = getRevealEligiblePositions(required);
                        if (eligible.has(posIndex)) {
                            item.classList.add("eligible-card");
                        }
                        item.classList.add("selectable");
                        item.addEventListener("click", () => {
                            const value = Number(item.dataset.value);
                            const base = Math.floor(value);
                            const frac = Math.round((value - Math.floor(value)) * 10);
                            if (!eligible.has(posIndex)) {
                                return;
                            }
                            if (actionMode === "reveal4") {
                                if (selectedType === null) {
                                    if (frac === 1 && getRevealEligiblePositions(4).size >= 4) {
                                        selectedType = "yellow";
                                    } else {
                                        selectedType = "base";
                                    }
                                }
                                if (selectedType === "yellow" && frac !== 1) {
                                    return;
                                }
                                if (selectedType === "base") {
                                    if (frac === 1) {
                                        return;
                                    }
                                    if (selectedBase !== null && selectedBase !== base) {
                                        return;
                                    }
                                }
                            } else {
                                if (selectedType === null) {
                                    selectedType = frac === 1 ? "yellow" : "base";
                                }
                                if (selectedType === "yellow" && frac !== 1) {
                                    return;
                                }
                                if (selectedType === "base") {
                                    if (frac === 1) {
                                        return;
                                    }
                                    if (selectedBase !== null && selectedBase !== base) {
                                        return;
                                    }
                                }
                            }
                            const key = `${index}:${posIndex}`;
                            if (selectedPositions.some((p) => p.key === key)) {
                                selectedPositions = selectedPositions.filter((p) => p.key !== key);
                                item.classList.remove("selected");
                                item.classList.remove("preview-reveal");
                                if (selectedPositions.length === 0) {
                                    selectedBase = null;
                                    selectedType = null;
                                }
                                return;
                            }
                            selectedBase = base;
                            if (selectedType === null) {
                                selectedType = frac === 1 ? "yellow" : "base";
                            }
                            selectedPositions.push({ key, pos: posIndex });
                            item.classList.add("selected");
                            item.classList.add("preview-reveal");
                            if (selectedPositions.length === required) {
                                stompClient.send(
                                    "/app/reveal",
                                    {},
                                    JSON.stringify({
                                        actionType: actionMode,
                                        positions: selectedPositions.map((p) => p.pos),
                                    })
                                );
                                clearSelection(true);
                            }
                        });
                    }

                    if (equip3Active || equip3Available || equip10Active || equip10Available || targetMode === "equip3") {
                        // prevent normal target selection while equip3 is active
                    } else if (pendingWrongTokenFrom != null && pendingWrongTokenFrom === playerIndex) {
                        const value = Number(item.dataset.value);
                        const frac = Math.round((value - Math.floor(value)) * 10);
                        const isAllowedPosition =
                            pendingWrongTokenPosition == null ||
                            posIndex === pendingWrongTokenPosition ||
                            posIndex === pendingWrongTokenPosition2 ||
                            posIndex === pendingWrongTokenPosition3;
                        const isRevealed = revealed[index] && revealed[index][posIndex];
                        if (index === playerIndex && isAllowedPosition && frac !== 5 && !isRevealed) {
                            item.classList.add("eligible-card");
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/wrongtoken",
                                    {},
                                    JSON.stringify({ position: posIndex })
                                );
                            });
                        }
                    } else if (!equipSpecialActive && !isSelfAllRevealed && isMyTurn && !pendingActive && pendingSelfFrom == null && pendingOpponentRevealFrom == null && !actionMode && index !== playerIndex) {
                        const targetFullyRevealed = isAllRevealed(state, index);
                        const isHidden = !(revealed[index] && revealed[index][posIndex]);
                        if (!targetFullyRevealed && isHidden) {
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                if (isAllRevealed(lastState, playerIndex)) {
                                    return;
                                }
                                if (isAllRevealed(lastState, index)) {
                                    return;
                                }
                                if (equipmentSelectionMode === 2) {
                                    return;
                                }
                                if (targetMode === "detector") {
                                    if (isDetectorSelected(index, posIndex)) {
                                        detectorSelections = detectorSelections.filter(
                                            (entry) => !(entry.playerIndex === index && entry.position === posIndex)
                                        );
                                        item.classList.remove("selected");
                                        return;
                                    }
                                    if (detectorSelections.length >= 2) {
                                        return;
                                    }
                                    detectorSelections.push({ playerIndex: index, position: posIndex });
                                    item.classList.add("selected");
                                    if (detectorSelections.length === 2) {
                                        const first = detectorSelections[0];
                                        const second = detectorSelections[1];
                                        stompClient.send(
                                            "/app/target",
                                            {},
                                            JSON.stringify({
                                                targetPlayerIndex: first.playerIndex,
                                                targetPosition: first.position,
                                                targetPlayerIndex2: second.playerIndex,
                                                targetPosition2: second.position,
                                                mode: "detector",
                                            })
                                        );
                                        clearSelection();
                                    }
                                } else {
                                    stompClient.send(
                                        "/app/target",
                                        {},
                                        JSON.stringify({
                                            targetPlayerIndex: index,
                                            targetPosition: posIndex,
                                            mode: "single",
                                        })
                                    );
                                    clearSelection();
                                }
                            });
                        }
                    }

                    if (pendingActive && pendingMode !== "equip5" && index === pendingTarget && posIndex === pendingPosition) {
                        item.classList.add("pending-target");
                    }
                    if (
                        pendingActive &&
                        pendingMode === "detector" &&
                        pendingTarget2 !== null &&
                        pendingPosition2 !== null &&
                        index === pendingTarget2 &&
                        posIndex === pendingPosition2
                    ) {
                        item.classList.add("pending-target");
                    }
                    if (
                        pendingActive &&
                        pendingMode === "equip3" &&
                        index === pendingTarget &&
                        pendingPosition2 !== null &&
                        posIndex === pendingPosition2
                    ) {
                        item.classList.add("pending-target");
                    }
                    if (
                        pendingActive &&
                        pendingMode === "equip3" &&
                        index === pendingTarget &&
                        pendingPosition3 !== null &&
                        posIndex === pendingPosition3
                    ) {
                        item.classList.add("pending-target");
                    }

                    // Equipment 2: initiator selects their own unrevealed wire
                    if (!equipSpecialActive && pendingEquipmentNumberState === 2 && pendingFrom === index && index === playerIndex && pendingEquipmentFromPositionState == null) {
                        const isRevealedSelf = revealed[index] && revealed[index][posIndex];
                        if (!isRevealedSelf) {
                            item.classList.add("eligible-card");
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 2, action: "selectSelfPosition", fromPosition: posIndex })
                                );
                            });
                        }
                    }

                    if (pendingSelfFrom === index && index === playerIndex) {
                        const value = Number(item.dataset.value);
                        const base = Math.floor(value);
                        const frac = Math.round((value - Math.floor(value)) * 10);
                        const isRevealed = revealed[index] && revealed[index][posIndex];
                        const canSelfReveal = pendingSelfYellow
                            ? frac === 1
                            : pendingSelfBase !== null && base === pendingSelfBase && frac === 0;
                        if (!isRevealed && canSelfReveal) {
                            item.classList.add("eligible-card");
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/selfreveal",
                                    {},
                                    JSON.stringify({ position: posIndex })
                                );
                            });
                        }
                    }

                    if (pendingOpponentRevealFrom === index && index === playerIndex) {
                        const value = Number(item.dataset.value);
                        const base = Math.floor(value);
                        const frac = Math.round((value - Math.floor(value)) * 10);
                        const isRevealed = revealed[index] && revealed[index][posIndex];
                        const isAllowedPosition =
                            pendingOpponentRevealPosition == null ||
                            posIndex === pendingOpponentRevealPosition ||
                            (pendingOpponentRevealPosition2 !== null && posIndex === pendingOpponentRevealPosition2) ||
                            (pendingOpponentRevealPosition3 !== null && posIndex === pendingOpponentRevealPosition3);
                        const isAllowed =
                            isAllowedPosition &&
                            ((pendingOpponentRevealYellow && frac === 1) ||
                                (!pendingOpponentRevealYellow && pendingOpponentRevealBase !== null && base === pendingOpponentRevealBase && frac === 0));
                        if (!isRevealed && isAllowed) {
                            item.classList.add("eligible-card");
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/opponentreveal",
                                    {},
                                    JSON.stringify({ position: posIndex })
                                );
                            });
                        }
                    }

                    // Equipment 2: target player chooses their unrevealed wire (when waiting)
                    if (pendingEquipmentNumberState === 2 && pendingEquipmentWaitingTargetChoiceState && pendingTarget === index && index === playerIndex) {
                        const isRevealedTarget = revealed[index] && revealed[index][posIndex];
                        if (!isRevealedTarget) {
                            item.classList.add("eligible-card");
                            item.classList.add("selectable");
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 2, action: "selectTargetPosition", targetPosition: posIndex })
                                );
                            });
                        }
                    }

                    // guess animation removed

                    // highlight swapped cards while confirmation is waiting
                    if (swapPendingConfirmationState) {
                        if (
                            (swapHighlightPlayerAState === index && Math.abs(Number(item.dataset.value) - (swapHighlightValueAState || 0)) < 0.0001) ||
                            (swapHighlightPlayerBState === index && Math.abs(Number(item.dataset.value) - (swapHighlightValueBState || 0)) < 0.0001)
                        ) {
                            item.classList.add("swapped");
                        }
                    }

                    slot.appendChild(item);
                });
            });
        }
        if (!isMyTurn) {
            clearSelection();
        }

        if (guessPanel && guessList) {
            if (pendingMode !== "equip10") {
                equip10Selections = [];
                equip10ContextKey = null;
            }
            const equip10Key = `${pendingFrom}-${pendingTarget}-${pendingPosition}-${pendingMode}`;
            if (pendingMode === "equip10" && equip10ContextKey !== equip10Key) {
                equip10Selections = [];
                equip10ContextKey = equip10Key;
            }
            guessList.innerHTML = "";
            if (actionsAllowed && pendingGuessActive && playerIndex === pendingFrom) {
                if (guessTitle) {
                    if (pendingMode === "equip10") {
                        guessTitle.textContent = "宣言する数字を2つ選択してください";
                    } else {
                        guessTitle.textContent = "宣言する数字を選択してください";
                    }
                }
                const hand = Array.isArray(state.hands) ? state.hands[playerIndex] : [];
                const revealRow = Array.isArray(state.revealed) ? state.revealed[playerIndex] : [];
                const values = [];
                let hasYellow = false;
                hand.forEach((value, idx) => {
                    if (revealRow && revealRow[idx]) {
                        return;
                    }
                    const rounded = Math.round(value * 10) / 10;
                    const frac = Math.round((rounded - Math.floor(rounded)) * 10);
                    if (frac === 1) {
                        hasYellow = true;
                    }
                    if (frac === 0) {
                        const base = Math.floor(rounded);
                        if (!values.includes(base)) {
                            values.push(base);
                        }
                    }
                });
                values.sort((a, b) => a - b);
                if (pendingMode === "equip10") {
                    const toggleEquip10 = (entry, button) => {
                        const index = equip10Selections.findIndex(
                            (item) => item.type === entry.type && item.value === entry.value
                        );
                        if (index !== -1) {
                            equip10Selections.splice(index, 1);
                            button.classList.remove("selected");
                            return;
                        }
                        if (equip10Selections.length >= 2) {
                            return;
                        }
                        equip10Selections.push(entry);
                        button.classList.add("selected");
                        if (equip10Selections.length === 2) {
                            const [first, second] = equip10Selections;
                            stompClient.send(
                                "/app/resolve",
                                {},
                                JSON.stringify({
                                    guessType: first.type,
                                    chosenNumber: first.value,
                                    guessType2: second.type,
                                    chosenNumber2: second.value,
                                    targetPlayerIndex: pendingTarget,
                                    targetPosition: pendingPosition,
                                })
                            );
                            equip10Selections = [];
                            equip10ContextKey = null;
                        }
                    };
                    if (hasYellow) {
                        const yellowBtn = document.createElement("button");
                        yellowBtn.type = "button";
                        yellowBtn.className = "guess-item hand-yellow";
                        yellowBtn.textContent = "黄色";
                        if (equip10Selections.some((item) => item.type === "yellow")) {
                            yellowBtn.classList.add("selected");
                        }
                        yellowBtn.addEventListener("click", () => {
                            toggleEquip10({ type: "yellow", value: null }, yellowBtn);
                        });
                        guessList.appendChild(yellowBtn);
                    }
                    values.forEach((value) => {
                        const item = document.createElement("button");
                        item.type = "button";
                        item.className = "guess-item";
                        item.textContent = String(value);
                        if (equip10Selections.some((entry) => entry.type === "number" && entry.value === value)) {
                            item.classList.add("selected");
                        }
                        item.addEventListener("click", () => {
                            toggleEquip10({ type: "number", value }, item);
                        });
                        guessList.appendChild(item);
                    });
                } else {
                if (hasYellow && pendingMode !== "detector" && pendingMode !== "equip5" && pendingMode !== "equip3") {
                        const yellowBtn = document.createElement("button");
                        yellowBtn.type = "button";
                        yellowBtn.className = "guess-item hand-yellow";
                        yellowBtn.textContent = "黄色";
                        yellowBtn.addEventListener("click", () => {
                            stompClient.send(
                                "/app/resolve",
                                {},
                                JSON.stringify({
                                    guessType: "yellow",
                                    targetPlayerIndex: pendingTarget,
                                    targetPosition: pendingPosition,
                                })
                            );
                        });
                        guessList.appendChild(yellowBtn);
                    }
                    values.forEach((value) => {
                        const item = document.createElement("button");
                        item.type = "button";
                        item.className = "guess-item";
                        item.textContent = String(value);
                        item.addEventListener("click", () => {
                            stompClient.send(
                                "/app/resolve",
                                {},
                                JSON.stringify({
                                    guessType: "number",
                                    chosenNumber: value,
                                    targetPlayerIndex: pendingTarget,
                                    targetPosition: pendingPosition,
                                })
                            );
                        });
                        guessList.appendChild(item);
                    });
                }
            }
        }

        // show swap confirmation modal if needed
        if (swapPendingConfirmationState) {
            if (swapModal) {
                const nameA = (state.players && state.players[swapHighlightPlayerAState]) || `プレイヤー${swapHighlightPlayerAState + 1}`;
                const nameB = (state.players && state.players[swapHighlightPlayerBState]) || `プレイヤー${swapHighlightPlayerBState + 1}`;
                const posA = swapHighlightPositionAState !== null && swapHighlightPositionAState !== undefined
                    ? getPositionLabel(swapHighlightPositionAState)
                    : "?";
                const posB = swapHighlightPositionBState !== null && swapHighlightPositionBState !== undefined
                    ? getPositionLabel(swapHighlightPositionBState)
                    : "?";
                swapModalMessage.textContent = `「${nameA}さんのコード${posA}」と「${nameB}さんのコード${posB}」が入れ替わりました。`;
                swapModal.classList.add("is-visible");
                swapModal.setAttribute("aria-hidden", "false");
            }
        } else {
            if (swapModal) {
                swapModal.classList.remove("is-visible");
                swapModal.setAttribute("aria-hidden", "true");
            }
        }

        if (radarNumber != null) {
            const names = radarPlayers.length
                ? radarPlayers.map((name) => name && name.trim() ? name : "未参加").join(", ")
                : "なし";
            const nextRadarKey = `${radarNumber}:${names}`;
            if (notice) {
                notice.textContent = `なんでもレーダー: ${radarNumber} を持っているプレイヤーは「 ${names}」です。(10秒後に、自動的に非表示になります)`;
            }
            if (nextRadarKey !== radarKey) {
                radarKey = nextRadarKey;
                if (radarTimeoutId) {
                    clearTimeout(radarTimeoutId);
                    radarTimeoutId = null;
                }
                handContainers.forEach((container, index) => {
                    if (!container) {
                        return;
                    }
                    const name = state.players && state.players[index] ? state.players[index].trim() : "";
                    const fallbackName = name ? name : `プレイヤー${index + 1}`;
                    const hasRadar = radarPlayers.includes(fallbackName);
                    let bubble = container.querySelector(".radar-bubble");
                    if (!bubble) {
                        bubble = document.createElement("span");
                        bubble.className = "radar-bubble";
                        bubble.textContent = "はい";
                        const nameSlot = nameSlots[index];
                        if (nameSlot) {
                            nameSlot.appendChild(bubble);
                        } else {
                            container.appendChild(bubble);
                        }
                    }
                    bubble.style.display = hasRadar ? "inline-flex" : "none";
                });
                radarTimeoutId = setTimeout(() => {
                    handContainers.forEach((container) => {
                        if (!container) {
                            return;
                        }
                        const bubble = container.querySelector(".radar-bubble");
                        if (bubble) {
                            bubble.style.display = "none";
                        }
                    });
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 8, action: "clearRadar" })
                        );
                    }
                    radarTimeoutId = null;
                    radarKey = null;
                }, 10000);
            }
        } else {
            if (radarTimeoutId) {
                clearTimeout(radarTimeoutId);
                radarTimeoutId = null;
            }
            radarKey = null;
            handContainers.forEach((container) => {
                if (!container) {
                    return;
                }
                const bubble = container.querySelector(".radar-bubble");
                if (bubble) {
                    bubble.style.display = "none";
                }
            });
        }

        if (state.lastAction) {
            const by = state.lastUpdatedBy ? ` (${state.lastUpdatedBy})` : "";
            lastAction.textContent = `${state.lastAction}${by}`;
        }

        if (radarModal) {
            radarModal.classList.remove("is-visible");
            radarModal.setAttribute("aria-hidden", "true");
        }

        if (prevState) {
            const actionChanged = state.lastAction && state.lastAction !== prevState.lastAction;
            const startedNow = !prevState.gameStarted && state.gameStarted;
            const endedNow = !prevState.missionEnded && state.missionEnded;
            if (startedNow) {
                playSound("start");
            }
            if (endedNow) {
                playSound(state.missionSuccess ? "clear" : "boom");
            }
            if (actionChanged && !endedNow) {
                if (state.lastAction === "正解") {
                    playSound("correct");
                } else if (state.lastAction === "不正解") {
                    if (prevState.mistakesRemaining === 2 && state.mistakesRemaining === 1) {
                        playSound("last1");
                    } else {
                        playSound("incorrect");
                    }
                } else if (state.lastAction === "初期トークン配置") {
                    playSound("token");
                } else if (state.lastAction.startsWith("装備1：")) {
                    playSound("token");
                } else if (state.lastAction.startsWith("装備12：")) {
                    playSound("token");
                } else if (state.lastAction.includes("トークン設置")) {
                    playSound("token");
                } else if (state.lastAction.startsWith("装備6：")) {
                    playSound("recover");
                } else if (state.lastAction.startsWith("装備7：")) {
                    playSound("battery");
                } else if (state.lastAction.startsWith("装備8：なんでもレーダー")) {
                    playSound("radar");
                } else if (state.lastAction.startsWith("装備9：")) {
                    playSound("ice");
                } else if (state.lastAction.startsWith("装備2：交換完了")) {
                    playSound("exchange");
                }
            }
            const prevTokenCount = countTokenHints(prevState);
            const nextTokenCount = countTokenHints(state);
            if (state.preTokenPhase && !prevState.preTokenPhase && nextTokenCount > 0) {
                playSound("token");
            } else if (state.preTokenPhase && prevState.preTokenPhase && nextTokenCount > prevTokenCount) {
                playSound("token");
            }
            if (Array.isArray(prevState.revealed) && Array.isArray(state.revealed)) {
                let revealedAdded = false;
                for (let p = 0; p < state.revealed.length; p += 1) {
                    const prevRow = prevState.revealed[p] || [];
                    const nextRow = state.revealed[p] || [];
                    for (let i = 0; i < nextRow.length; i += 1) {
                        if (nextRow[i] && !prevRow[i]) {
                            revealedAdded = true;
                            break;
                        }
                    }
                    if (revealedAdded) {
                        break;
                    }
                }
                if (revealedAdded) {
                    playSound("reveal");
                }
            }
            const prevIsMyTurn = prevState.gameStarted === true
                && !prevState.missionEnded
                && !prevState.preTokenPhase
                && playerIndex >= 0
                && playerIndex === prevState.turnIndex;
            const nextIsMyTurn = state.gameStarted === true
                && !state.missionEnded
                && !state.preTokenPhase
                && playerIndex >= 0
                && playerIndex === state.turnIndex;
            if (!prevIsMyTurn && nextIsMyTurn) {
                if (state.lastAction === "装備11：手番スキップ") {
                    playSound("skip");
                } else {
                    playSound("yourturn");
                }
            }
        }
    };

    const sendMove = (payload) => {
        if (!stompClient || !isConnected) {
            return;
        }
        stompClient.send("/app/move", {}, JSON.stringify(payload));
    };

    const connectSocket = () => {
        if (stompClient) {
            try {
                stompClient.disconnect(() => {});
            } catch (error) {
                // ignore
            }
        }
        const socket = new SockJS("/ws-bomb-busters");
        socket.onclose = () => {
            isConnected = false;
            updateConnectionLabel("切断", false);
        };
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.reconnect_delay = 2000;
        stompClient.connect(
            {},
            () => {
                isConnected = true;
                updateConnectionLabel("接続中", true);
                stompClient.subscribe("/topic/state", (message) => {
                    renderState(JSON.parse(message.body));
                });
                stompClient.send("/app/join", {}, "{}");
            },
            () => {
                updateConnectionLabel("エラー", false);
            }
        );
    };

    const fetchState = async () => {
        try {
            const response = await fetch("/bomb-busters-simutate/state");
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            renderState(data);
        } catch (error) {
            updateConnectionLabel("エラー", false);
        }
    };

    const fetchMe = async () => {
        try {
            const response = await fetch("/bomb-busters-simutate/me");
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            if (data) {
                playerIndex = typeof data.playerIndex === "number" ? data.playerIndex : -1;
                isHost = !!data.isHost;
            }
        } catch (error) {
            // ignore
        }
    };

    const loadEquipmentData = async () => {
        try {
            const response = await fetch("/data/equipment.json");
            if (!response.ok) {
                return;
            }
            equipmentData = await response.json();
            applyDetectorTooltip();
        } catch (error) {
            equipmentData = {};
        }
    };

    const showTooltip = (button) => {
        if (!tooltip || !button) {
            return;
        }
        const number = button.dataset.equipmentNumber;
        if (!number) {
            return;
        }
        const info = equipmentData[number] || {};
        tooltipTitle.textContent = number === "0" ? "個人装備" : `装備カード ${number}`;
        tooltipName.textContent = info.name || "-";
        tooltipEffect.textContent = info.effect || "-";
        tooltipTiming.textContent = info.timing || "-";
        tooltip.classList.add("is-visible");
        tooltip.setAttribute("aria-hidden", "false");
        requestAnimationFrame(() => {
            const panel = button.closest(".equipment-panel");
            if (!panel) {
                return;
            }
            const panelRect = panel.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const centerX = buttonRect.left + buttonRect.width / 2;
            let left = centerX - tooltipRect.width / 2 - panelRect.left;
            const minLeft = 0;
            const maxLeft = panelRect.width - tooltipRect.width;
            if (left < minLeft) {
                left = minLeft;
            } else if (left > maxLeft) {
                left = maxLeft;
            }
            const top = buttonRect.bottom - panelRect.top + 8;
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });
    };

    const hideTooltip = () => {
        if (!tooltip) {
            return;
        }
        tooltip.classList.remove("is-visible");
        tooltip.setAttribute("aria-hidden", "true");
    };

    const bindEquipmentHover = () => {
        equipmentButtons.forEach((button) => {
            if (!button) {
                return;
            }
            button.addEventListener("mouseenter", () => showTooltip(button));
            button.addEventListener("mouseleave", hideTooltip);
            button.addEventListener("focus", () => showTooltip(button));
            button.addEventListener("blur", hideTooltip);
            button.addEventListener("click", () => {
                if (button.disabled) {
                    return;
                }
                const number = button.dataset.equipmentNumber;
                if (!number) {
                    return;
                }
                openEquipmentModal(number);
            });
        });
    };

    const applyDetectorTooltip = () => {
        const info = equipmentData["0"];
        if (!info) {
            return;
        }
        detectorTooltipTitles.forEach((el) => {
            if (el) {
                el.textContent = "個人装備";
            }
        });
        detectorTooltipNumbers.forEach((el) => {
            if (el) {
                el.textContent = "0";
            }
        });
        detectorTooltipNames.forEach((el) => {
            if (el) {
                el.textContent = info.name || "フツーノ探知機";
            }
        });
        detectorTooltipEffects.forEach((el) => {
            if (el) {
                el.textContent = info.effect || "-";
            }
        });
        detectorTooltipTimings.forEach((el) => {
            if (el) {
                el.textContent = info.timing || "-";
            }
        });
    };

    const openEquipmentModal = (number) => {
        if (!equipmentModal || !equipmentModalMessage) {
            return;
        }
        pendingEquipmentNumber = number;
        const info = equipmentData[number] || {};
        const name = info.name || `装備${number}`;
        equipmentModalMessage.textContent = `${name} を使用しますか？`;
        equipmentModal.classList.add("is-visible");
        equipmentModal.setAttribute("aria-hidden", "false");
    };

    const openDetectorModal = () => {
        if (!equipmentModal || !equipmentModalMessage) {
            return;
        }
        pendingEquipmentNumber = "detector";
        equipmentModalMessage.textContent = "フツーノ探知機 を使用しますか？";
        equipmentModal.classList.add("is-visible");
        equipmentModal.setAttribute("aria-hidden", "false");
    };

    const closeEquipmentModal = () => {
        if (!equipmentModal) {
            return;
        }
        if (equipmentModal.contains(document.activeElement)) {
            document.activeElement.blur();
        }
        equipmentModal.classList.remove("is-visible");
        equipmentModal.setAttribute("aria-hidden", "true");
        pendingEquipmentNumber = null;
    };



    const startGame = async () => {
        startButton.disabled = true;
        try {
            const payload = buildOptionsPayload();
            const response = await fetch("/bomb-busters-simutate/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                gameNote.textContent = "開始に失敗しました。";
                return;
            }
            const data = await response.json();
            renderState(data);
        } catch (error) {
            gameNote.textContent = "開始に失敗しました。";
        } finally {
            startButton.disabled = !isHost;
        }
    };

    const endGame = async () => {
        endButton.disabled = true;
        try {
            const response = await fetch("/bomb-busters-simutate/end", { method: "POST" });
            if (!response.ok) {
                gameNote.textContent = "終了に失敗しました。";
                return;
            }
            const data = await response.json();
            renderState(data);
        } catch (error) {
            gameNote.textContent = "終了に失敗しました。";
        } finally {
            endButton.disabled = !isHost;
        }
    };

    const buildOptionsPayload = () => ({
        yellow: {
            min: Number(yellowMin.value),
            max: Number(yellowMax.value),
            pool: Number(yellowPool.value),
            draw: Number(yellowDraw.value),
        },
        red: {
            min: Number(redMin.value),
            max: Number(redMax.value),
            pool: Number(redPool.value),
            draw: Number(redDraw.value),
        },
        cardMin: cardMin ? Number(cardMin.value) : 1,
        cardMax: cardMax ? Number(cardMax.value) : 12,
        excludedEquipments: excludeEquipmentChecks
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => Number(checkbox.value)),
    });

    const applyOptions = (options) => {
        if (!options) {
            return;
        }
        if (options.yellow) {
            yellowMin.value = options.yellow.min;
            yellowMax.value = options.yellow.max;
            yellowPool.value = options.yellow.pool;
            yellowDraw.value = options.yellow.draw;
        }
        if (options.red) {
            redMin.value = options.red.min;
            redMax.value = options.red.max;
            redPool.value = options.red.pool;
            redDraw.value = options.red.draw;
        }
        if (cardMin && typeof options.cardMin === "number") {
            cardMin.value = options.cardMin;
        }
        if (cardMax && typeof options.cardMax === "number") {
            cardMax.value = options.cardMax;
        }
        if (excludeEquipmentChecks.length > 0) {
            const excluded = new Set(
                Array.isArray(options.excludedEquipments) ? options.excludedEquipments : []
            );
            excludeEquipmentChecks.forEach((checkbox) => {
                checkbox.checked = excluded.has(Number(checkbox.value));
            });
        }
    };

    let optionsTimer = null;
    const scheduleOptionsBroadcast = () => {
        if (!isHost || !stompClient || !isConnected) {
            return;
        }
        if (optionsTimer) {
            clearTimeout(optionsTimer);
        }
        optionsTimer = setTimeout(() => {
            const payload = buildOptionsPayload();
            stompClient.send("/app/options", {}, JSON.stringify(payload));
        }, 200);
    };

    const bindOptionInputs = () => {
        const inputs = [
            yellowMin,
            yellowMax,
            yellowPool,
            yellowDraw,
            redMin,
            redMax,
            redPool,
            redDraw,
            cardMin,
            cardMax,
        ];
        inputs.forEach((input) => {
            if (!input) {
                return;
            }
            input.addEventListener("input", scheduleOptionsBroadcast);
        });
        excludeEquipmentChecks.forEach((checkbox) => {
            checkbox.addEventListener("change", scheduleOptionsBroadcast);
        });
        if (yellowDraw) {
            yellowDraw.addEventListener("change", () => {
                const raw = Number(yellowDraw.value);
                if (Number.isNaN(raw)) {
                    return;
                }
                const min = Number(yellowDraw.min || 0);
                const max = Number(yellowDraw.max || raw);
                let even = Math.floor(raw / 2) * 2;
                if (even < min) {
                    even = min;
                }
                if (even > max) {
                    even = max;
                }
                yellowDraw.value = String(even);
                scheduleOptionsBroadcast();
            });
        }
    };
    const setOptionsDisabled = (disabled) => {
        const inputs = [
            yellowMin,
            yellowMax,
            yellowPool,
            yellowDraw,
            redMin,
            redMax,
            redPool,
            redDraw,
            cardMin,
            cardMax,
        ];
        inputs.forEach((input) => {
            if (input) {
                input.disabled = disabled;
            }
        });
        excludeEquipmentChecks.forEach((checkbox) => {
            checkbox.disabled = disabled;
        });
        const blocks = document.querySelectorAll(".option-yellow, .option-red");
        blocks.forEach((block) => {
            if (!block) {
                return;
            }
            block.classList.toggle("is-disabled", disabled);
        });
    };

    const loadSession = async () => {
        const presetName = document.body.dataset.playerName;
        if (presetName && presetName.trim()) {
            playerName = presetName.trim();
            playerLabel.textContent = playerName;
            await fetchMe();
            startButton.disabled = !isHost;
            endButton.disabled = !isHost;
            setOptionsDisabled(!isHost);
            if (!isHost) {
                gameNote.textContent = "プレイヤー1のみ開始できます。";
            }
            fetchState();
            connectSocket();
            return;
        }
        try {
            const response = await fetch("/bomb-busters-simutate/session");
            const data = await response.json();
            if (data && data.playerName) {
                playerName = data.playerName;
                playerLabel.textContent = playerName;
                await fetchMe();
                startButton.disabled = !isHost;
                endButton.disabled = !isHost;
                setOptionsDisabled(!isHost);
                if (!isHost) {
                    gameNote.textContent = "プレイヤー1のみ開始できます。";
                }
                fetchState();
                connectSocket();
                return;
            }
        } catch (error) {
            updateConnectionLabel("エラー", false);
        }
        updateConnectionLabel("セッションなし", false);
    };

    updateConnectionLabel("未接続", false);
    if (deckPanel) {
        deckPanel.style.display = "none";
    }
    if (midPanel) {
        midPanel.style.display = "none";
    }
    bindOptionInputs();
    bindEquipmentHover();
    loadEquipmentData();
    initTheme();
    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            try {
                await fetch("/bomb-busters-simutate/logout", { method: "POST" });
            } catch (error) {
                // ignore
            } finally {
                window.location.href = "/bomb-busters-simutate";
            }
        });
    }
    if (equipmentModalCancel) {
        equipmentModalCancel.addEventListener("click", closeEquipmentModal);
    }
    if (equipmentModalConfirm) {
        equipmentModalConfirm.addEventListener("click", () => {
            if (!pendingEquipmentNumber) {
                closeEquipmentModal();
                return;
            }
            const pendingKey = String(pendingEquipmentNumber);
            const equipSoundExcluded = new Set(["2", "6", "7", "8", "9"]);
            if (!equipSoundExcluded.has(pendingKey)) {
                playSound("equip");
            }
            // force close immediately
            if (equipmentModal) {
                if (equipmentModal.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
                equipmentModal.classList.remove("is-visible");
                equipmentModal.setAttribute("aria-hidden", "true");
                equipmentModal.style.display = "";
            }
            if (lastState?.preTokenPhase) {
                closeEquipmentModal();
                if (notice) {
                    notice.textContent = "プレトークン中は装備を使用できません。";
                }
                return;
            }
            switch (pendingKey) {
                case "1": {
                    activeEquipmentNumber = "1";
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 1, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備1を使用中：自分の隣接する異なるコードを2本選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "2": {
                    equipmentSelectionMode = 2;
                    closeEquipmentModal();
                    if (notice) {
                        notice.textContent = "相手のプレイヤーを1名選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    if (equipmentTargetModal) {
                        equipmentTargetModal.classList.add("is-visible");
                        equipmentTargetModal.setAttribute("aria-hidden", "false");
                        equipmentTargetModal.style.display = "flex";
                    }
                    return;
                }
                case "3": {
                    activeEquipmentNumber = "3";
                    targetMode = "equip3";
                    detectorSelections = [];
                    equip3TargetIndex = null;
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 3, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備3を使用中：同じ相手のコードを3本選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "4": {
                    activeEquipmentNumber = "4";
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 4, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備4を使用中：自分の非赤/非黄色のコードを1つ選択してください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "5": {
                    equipmentSelectionMode = 5;
                    activeEquipmentNumber = "5";
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 5, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備5を使用中：相手のプレイヤーを選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    if (equipmentTargetModal) {
                        if (equipmentTargetMessage) {
                            equipmentTargetMessage.textContent = "判定対象のプレイヤーを選んでください。";
                        }
                        equipmentTargetModal.classList.add("is-visible");
                        equipmentTargetModal.setAttribute("aria-hidden", "false");
                        equipmentTargetModal.style.display = "flex";
                    }
                    return;
                }
                case "6": {
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 6 })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備6を使用しました。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "7": {
                    const hasDetectorTarget = Array.isArray(lastState?.detectorUsed)
                        && lastState.detectorUsed.some((used, index) => used && index !== playerIndex);
                    if (!hasDetectorTarget) {
                        closeEquipmentModal();
                        if (notice) {
                            notice.textContent = "使用済みの探知機がありません。";
                        }
                        return;
                    }
                    equipmentSelectionMode = 7;
                    activeEquipmentNumber = "7";
                    equip7Selections = [];
                    closeEquipmentModal();
                    if (notice) {
                        notice.textContent = "装備7を使用中：再使用可能にする探知機の持ち主を選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    if (equipmentTargetModal) {
                        if (equipmentTargetMessage) {
                            equipmentTargetMessage.textContent = "再使用可能にする探知機の持ち主を選んでください。";
                        }
                        equipmentTargetModal.classList.add("is-visible");
                        equipmentTargetModal.setAttribute("aria-hidden", "false");
                        equipmentTargetModal.style.display = "flex";
                    }
                    return;
                }
                case "8": {
                    closeEquipmentModal();
                    if (notice) {
                        notice.textContent = "装備8を使用中：宣言する数字を選んでください。";
                    }
                    if (guessTitle) {
                        guessTitle.textContent = "宣言する数字を選択してください";
                    }
                    if (guessPanel) {
                        guessPanel.style.display = "flex";
                        guessPanel.style.order = "";
                    }
                    if (guessList) {
                        guessList.innerHTML = "";
                        for (let value = 1; value <= 12; value += 1) {
                            const item = document.createElement("button");
                            item.type = "button";
                            item.className = "guess-item";
                            item.textContent = String(value);
                            item.addEventListener("click", () => {
                                stompClient.send(
                                    "/app/equipment",
                                    {},
                                    JSON.stringify({ equipmentNumber: 8, action: "begin", targetPlayerIndex: value })
                                );
                            });
                            guessList.appendChild(item);
                        }
                    }
                    return;
                }
                case "9": {
                    closeEquipmentModal();
                    activeEquipmentNumber = "9";
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 9, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備9を使用中：この手番の失敗は無効化されます。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "10": {
                    activeEquipmentNumber = "10";
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 10, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備10を使用中：相手のコードを1本選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "11": {
                    equipmentSelectionMode = 11;
                    activeEquipmentNumber = "11";
                    closeEquipmentModal();
                    if (notice) {
                        notice.textContent = "装備11を使用中：次の手番プレイヤーを選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    if (equipmentTargetModal) {
                        if (equipmentTargetMessage) {
                            equipmentTargetMessage.textContent = "次の手番プレイヤーを選んでください。";
                        }
                        equipmentTargetModal.classList.add("is-visible");
                        equipmentTargetModal.setAttribute("aria-hidden", "false");
                        equipmentTargetModal.style.display = "flex";
                    }
                    return;
                }
                case "12": {
                    activeEquipmentNumber = "12";
                    closeEquipmentModal();
                    if (stompClient && isConnected) {
                        stompClient.send(
                            "/app/equipment",
                            {},
                            JSON.stringify({ equipmentNumber: 12, action: "begin" })
                        );
                    }
                    if (notice) {
                        notice.textContent = "装備12を使用中：自分の隣接する同じコードを2本選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                case "detector": {
                    closeEquipmentModal();
                    if (targetMode !== "detector") {
                        clearSelection();
                        targetMode = "detector";
                        detectorSelections = [];
                    } else {
                        clearSelection();
                    }
                    if (notice) {
                        notice.textContent = "フツーノ探知機を使用します。任意のコードを2本選んでください。";
                    }
                    if (lastState) {
                        renderState(lastState);
                    }
                    return;
                }
                default:
                    closeEquipmentModal();
                    return;
            }
        });
    }
    if (equipmentModal) {
        equipmentModal.addEventListener("click", (event) => {
            if (event.target === equipmentModal) {
                closeEquipmentModal();
            }
        });
    }
    if (equipmentTargetModal) {
        equipmentTargetModal.addEventListener("click", (event) => {
            if (event.target === equipmentTargetModal) {
                event.preventDefault();
            }
        });
    }
    if (equipmentTargetCancel) {
        equipmentTargetCancel.remove();
    }
    if (equipmentTargetConfirm) {
        equipmentTargetConfirm.addEventListener("click", () => {
            if (equipmentSelectionMode !== 7) {
                return;
            }
            if (equip7Selections.length > 0 && stompClient && isConnected) {
                stompClient.send(
                    "/app/equipment",
                    {},
                    JSON.stringify({ equipmentNumber: 7, targetPlayerIndexes: equip7Selections })
                );
            }
            equipmentSelectionMode = null;
            activeEquipmentNumber = null;
            equip7Selections = [];
            clearSelection();
            if (equipmentTargetModal) {
                if (equipmentTargetModal.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
                equipmentTargetModal.classList.remove("is-visible");
                equipmentTargetModal.setAttribute("aria-hidden", "true");
                equipmentTargetModal.style.display = "";
            }
        });
    }
    if (radarModalConfirm) {
        radarModalConfirm.addEventListener("click", () => {
            // modal is not used; keep listener as no-op
        });
    }
    if (actionTarget) {
        actionTarget.addEventListener("click", () => {
            if (!canSelectTargetNow()) {
                return;
            }
            clearSelection();
            actionMode = null;
            if (notice) {
                notice.textContent = "相手の位置を選んでください。";
            }
            if (lastState) {
                renderState(lastState);
            }
        });
    }
    if (actionSkip) {
        actionSkip.addEventListener("click", () => {
            if (!stompClient || !isConnected) {
                return;
            }
            stompClient.send("/app/skip", {}, "{}");
        });
    }

    if (swapModalConfirm) {
        swapModalConfirm.addEventListener("click", () => {
            if (!stompClient || !isConnected) {
                return;
            }
            stompClient.send(
                "/app/equipment",
                {},
                JSON.stringify({ equipmentNumber: 2, action: "confirmSwap" })
            );
            if (swapModal) {
                if (swapModal.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
                swapModal.classList.remove("is-visible");
                swapModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    if (swapModal) {
        swapModal.addEventListener("click", (event) => {
            // do not close when clicking overlay; require explicit OK
            if (event.target === swapModal) {
                // ignore
            }
        });
    }
    if (actionReveal4) {
        actionReveal4.addEventListener("click", () => {
            if (actionReveal4.disabled) {
                return;
            }
            clearSelection();
            actionMode = "reveal4";
            if (notice) {
                notice.textContent = "同じ数字4本を選択してください。";
            }
            if (lastState) {
                renderState(lastState);
            }
        });
    }
    if (actionReveal2) {
        actionReveal2.addEventListener("click", () => {
            if (actionReveal2.disabled) {
                return;
            }
            clearSelection();
            actionMode = "reveal2";
            if (notice) {
                notice.textContent = "同じ数字2本を選択してください。";
            }
            if (lastState) {
                renderState(lastState);
            }
        });
    }
    if (actionRevealReds) {
        actionRevealReds.addEventListener("click", () => {
            if (actionRevealReds.disabled) {
                return;
            }
            stompClient.send(
                "/app/reveal",
                {},
                JSON.stringify({
                    actionType: "revealReds",
                    positions: [],
                })
            );
            clearSelection();
        });
    }

    detectorButtons.forEach((btn, index) => {
        if (!btn) {
            return;
        }
        btn.addEventListener("click", () => {
            if (btn.disabled) {
                return;
            }
            if (playerIndex !== index || !canUseDetectorNow()) {
                return;
            }
            openDetectorModal();
        });
    });
    if (otherToggle && otherBody) {
        otherToggle.addEventListener("click", () => {
            const collapsed = otherBody.classList.toggle("is-collapsed");
            otherToggle.textContent = collapsed ? "表示" : "隠す";
            otherToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
        });
    }
    loadSession();
})();
