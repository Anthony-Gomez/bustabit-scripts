var config = {
    bet: {
        value: 1,
        type: "balance",
        label: "Initial bet",
    },
    payout: {
        value: 1.98,
        type: "multiplier",
        label: "Bust limit",
    }
};

var bet = config.bet.value;

// Try to bet immediately when script starts
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
    engine.bet(bet, config.payout.value);
    log("Placing bet", bet / 100);
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
        bet = config.bet.value;
        log("Next bet", bet / 100)
    } else {
        // lost
        log("❌ Bust", lastGame.bust, "<", config.payout.value)
        bet = bet * 2;
        log("Next bet", bet / 100)
    }
}
