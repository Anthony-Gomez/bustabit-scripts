var config = {
    wager: {
        value: 1,
        type: "balance",
        label: "Initial bet",
    },
    payout: {
        value: 1.98,
        type: "multiplier",
        label: "Bust limit",
    },
};

var wager = config.wager.value;

// Try to wagered immediately when script starts
if (engine.gameState === "GAME_STARTING" || engine.gameState === "GAME_ENDED") {
    makeBet();
}

engine.on("GAME_STARTING", onGameStarted);
engine.on("GAME_ENDED", onGameEnded);

// ------------------------------ Methods

function onGameStarted() {
    makeBet();
}

function makeBet() {
    engine.bet(wager, config.payout.value);
    log("Placing bet", wager / 100);
}

function onGameEnded() {
    var lastGame = engine.history.first();

    // If we waggered, it means we played
    if (!lastGame.wager) {
        return;
    }

    if (lastGame.cashedAt) {
        // win
        log("✅ Bust ", lastGame.bust, ">", config.payout.value)
        wager = config.wager.value;
        log("Next bet", wager / 100)
    } else {
        // lost
        log("❌ Bust", lastGame.bust, "<", config.payout.value)
        wager = wager * 2;
        log("Next wager", wager / 100)
    }
}
