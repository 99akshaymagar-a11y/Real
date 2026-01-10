let wallet = 1000;
let currentBet = 0;

function setBet() {
    const betInput = document.getElementById("bet").value;
    if (betInput > 0 && betInput <= wallet) {
        currentBet = Number(betInput);
        document.getElementById("currentBet").innerText = currentBet;
    } else {
        alert("Invalid bet amount");
    }
}

function updateWallet(amount) {
    wallet += amount;
    document.getElementById("wallet").innerText = wallet;
}

// Roulette: 50/50 win or lose
function playRoulette() {
    if (currentBet === 0) return alert("Set a bet first");
    const win = Math.random() < 0.5;
    if (win) {
        updateWallet(currentBet);
        document.getElementById("rouletteResult").innerText = "You won!";
    } else {
        updateWallet(-currentBet);
        document.getElementById("rouletteResult").innerText = "You lost!";
    }
}

// Dice: Win if roll is 4,5,6
function playDice() {
    if (currentBet === 0) return alert("Set a bet first");
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll >= 4) {
        updateWallet(currentBet);
        document.getElementById("diceResult").innerText = `Rolled ${roll} - You won!`;
    } else {
        updateWallet(-currentBet);
        document.getElementById("diceResult").innerText = `Rolled ${roll} - You lost!`;
    }
}

// Plinko: Random multiplier
function playPlinko() {
    if (currentBet === 0) return alert("Set a bet first");
    const multipliers = [0, 0.5, 1, 2, 3];
    const result = multipliers[Math.floor(Math.random() * multipliers.length)];
    const winAmount = Math.floor(currentBet * result) - currentBet;
    updateWallet(winAmount);
    document.getElementById("plinkoResult").innerText = `Multiplier: x${result}`;
}
