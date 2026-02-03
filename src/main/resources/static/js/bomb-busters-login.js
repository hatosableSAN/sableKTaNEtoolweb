(() => {
    const joinButton = document.getElementById("join-button");
    const nameInput = document.getElementById("player-name");
    const joinMessage = document.getElementById("join-message");

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
        window.location.href = "/bomb-busters-simutate/play";
    };

    const checkSession = async () => {
        try {
            const response = await fetch("/bomb-busters-simutate/session");
            const data = await response.json();
            if (data && data.playerName) {
                window.location.href = "/bomb-busters-simutate/play";
            }
        } catch (error) {
            // ignore
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

    checkSession();
})();
