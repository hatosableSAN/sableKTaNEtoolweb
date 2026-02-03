(() => {
    const board = document.getElementById("board");
    const joinPanel = document.getElementById("join-panel");
    const joinButton = document.getElementById("join-button");
    const nameInput = document.getElementById("player-name");
    const joinMessage = document.getElementById("join-message");
    const playerLabel = document.getElementById("player-label");
    const connectionLabel = document.getElementById("connection-label");
    const lastAction = document.getElementById("last-action");
    const playerSlots = [
        document.getElementById("player-slot-1"),
        document.getElementById("player-slot-2"),
        document.getElementById("player-slot-3"),
        document.getElementById("player-slot-4"),
    ];

    const cards = new Map();
    const cardSize = { width: 52, height: 72 };
    let stompClient = null;
    let isConnected = false;
    let playerName = "";
    let dragState = null;

    const updateConnectionLabel = (text, ok) => {
        connectionLabel.textContent = text;
        connectionLabel.style.color = ok ? "#ffb300" : "#b3c0d9";
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const ensureCard = (card) => {
        if (cards.has(card.id)) {
            return cards.get(card.id);
        }
        const cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.dataset.cardId = String(card.id);
        const valueEl = document.createElement("span");
        valueEl.className = "value";
        cardEl.appendChild(valueEl);
        cardEl.addEventListener("pointerdown", onDragStart);
        cardEl.addEventListener("dblclick", onFlip);
        board.appendChild(cardEl);
        cards.set(card.id, cardEl);
        return cardEl;
    };

    const renderState = (state) => {
        if (!state || !state.cards) {
            return;
        }
        if (Array.isArray(state.players)) {
            state.players.forEach((name, index) => {
                const slot = playerSlots[index];
                if (slot) {
                    slot.textContent = name && name.trim() ? name : "空席";
                }
            });
        }
        state.cards.forEach((card) => {
            const cardEl = ensureCard(card);
            cardEl.style.left = `${card.x}px`;
            cardEl.style.top = `${card.y}px`;
            cardEl.classList.toggle("face-down", card.faceDown);
            const valueEl = cardEl.querySelector(".value");
            if (valueEl) {
                valueEl.textContent = String(card.value);
            }
        });
        if (state.lastAction) {
            const by = state.lastUpdatedBy ? ` (${state.lastUpdatedBy})` : "";
            lastAction.textContent = `${state.lastAction}${by}`;
        }
    };

    const sendMove = (payload) => {
        if (!stompClient || !isConnected) {
            return;
        }
        stompClient.publish({ destination: "/app/move", body: JSON.stringify(payload) });
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
            joinMessage.textContent = "状態の取得に失敗しました。";
        }
    };

    const onFlip = (event) => {
        if (!isConnected) {
            return;
        }
        const cardEl = event.currentTarget;
        const id = Number(cardEl.dataset.cardId);
        const nextFaceDown = !cardEl.classList.contains("face-down");
        cardEl.classList.toggle("face-down", nextFaceDown);
        sendMove({ cardId: id, faceDown: nextFaceDown });
    };

    const onDragStart = (event) => {
        if (!isConnected) {
            return;
        }
        const cardEl = event.currentTarget;
        const rect = cardEl.getBoundingClientRect();
        dragState = {
            id: Number(cardEl.dataset.cardId),
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            cardEl,
        };
        cardEl.classList.add("dragging");
        cardEl.setPointerCapture(event.pointerId);
    };

    const onDragMove = (event) => {
        if (!dragState) {
            return;
        }
        const boardRect = board.getBoundingClientRect();
        const x = clamp(event.clientX - boardRect.left - dragState.offsetX, 0, boardRect.width - cardSize.width);
        const y = clamp(event.clientY - boardRect.top - dragState.offsetY, 0, boardRect.height - cardSize.height);
        dragState.cardEl.style.left = `${x}px`;
        dragState.cardEl.style.top = `${y}px`;
    };

    const onDragEnd = (event) => {
        if (!dragState) {
            return;
        }
        const boardRect = board.getBoundingClientRect();
        const x = clamp(event.clientX - boardRect.left - dragState.offsetX, 0, boardRect.width - cardSize.width);
        const y = clamp(event.clientY - boardRect.top - dragState.offsetY, 0, boardRect.height - cardSize.height);
        dragState.cardEl.classList.remove("dragging");
        if (event.pointerId !== undefined && dragState.cardEl.hasPointerCapture(event.pointerId)) {
            dragState.cardEl.releasePointerCapture(event.pointerId);
        }
        sendMove({ cardId: dragState.id, x, y });
        dragState = null;
    };

    const connectSocket = () => {
        if (stompClient) {
            stompClient.deactivate();
        }
        stompClient = new StompJs.Client({
            webSocketFactory: () => new SockJS("/ws-bomb-busters"),
            reconnectDelay: 2000,
        });
        stompClient.onConnect = () => {
            isConnected = true;
            updateConnectionLabel("接続中", true);
            stompClient.subscribe("/topic/state", (message) => {
                renderState(JSON.parse(message.body));
            });
            stompClient.publish({ destination: "/app/join", body: "{}" });
        };
        stompClient.onStompError = () => {
            updateConnectionLabel("エラー", false);
        };
        stompClient.onWebSocketClose = () => {
            isConnected = false;
            updateConnectionLabel("切断", false);
        };
        stompClient.activate();
    };

    const join = async () => {
        const name = nameInput.value.trim();
        if (!name) {
            joinMessage.textContent = "名前を入力してください。";
            return;
        }
        joinMessage.textContent = "";
        const response = await fetch("/bomb-busters-simutate/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        const data = await response.json();
        if (!response.ok) {
            joinMessage.textContent = data && data.message ? data.message : "ログインに失敗しました。";
            return;
        }
        playerName = data.playerName || name;
        playerLabel.textContent = playerName;
        joinMessage.textContent = "参加しました。";
        fetchState();
        connectSocket();
    };

    const loadSession = async () => {
        try {
            const response = await fetch("/bomb-busters-simutate/session");
            const data = await response.json();
            if (data && data.playerName) {
                playerName = data.playerName;
                playerLabel.textContent = playerName;
                nameInput.value = playerName;
                joinMessage.textContent = "参加中";
                fetchState();
                connectSocket();
                return;
            }
        } catch (error) {
            joinMessage.textContent = "セッション確認に失敗しました。";
        }
    };

    joinButton.addEventListener("click", () => {
        join();
    });

    nameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            join();
        }
    });

    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragEnd);
    window.addEventListener("pointercancel", onDragEnd);

    updateConnectionLabel("未接続", false);
    loadSession();
})();
