var config = {
}

// Methods
function onGameEnded() {
    let lastGame = engine.history.first();
    let lastBust = lastGame.bust;
    if (lastBust) {
        busts.push(lastBust);
        log("Bust", lastBust, "added");
        log("Average :", calculateAverage(busts));
    }
}

function calculateAverage(numbers) {
    // Check if the array is empty
    if (numbers.length === 0) {
        return 0;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    return average;
}

// Run
var busts = [];
//  Entrypoint
engine.on("GAME_ENDED", onGameEnded);