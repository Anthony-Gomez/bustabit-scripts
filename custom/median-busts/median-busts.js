var config = {
}

// Methods
function onGameEnded() {
    let lastGame = engine.history.first();
    let lastBust = lastGame.bust;
    if (lastBust) {
        busts.push(lastBust);
        log("Bust", lastBust, "added");
        log("Median :", calculateMedian(busts));
    }
}

function calculateMedian(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);
  
    if (sortedArr.length % 2 === 0) {
      // Even number of elements
      return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
      // Odd number of elements
      return sortedArr[mid];
    }
  }

// Run
var busts = [];
//  Entrypoint
engine.on("GAME_ENDED", onGameEnded);