function runCasino() {
    let balance = 10000;
    let history = [balance];
    let wins = 0;

    for (let i = 0; i < 1000; i++) {
        let bet = 100;
        let spin = Math.floor(Math.random() * 37);

        if (spin === 7) {  // choose fixed number
            balance += bet * 35;
            wins++;
        } else {
            balance -= bet;
        }

        if (balance <= 0) break;
        history.push(balance);
    }

    const ctx = document.getElementById('casinoChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map((_, i) => i),
            datasets: [{
                label: 'Bankroll',
                data: history,
                borderWidth: 2
            }]
        }
    });

    document.getElementById("casinoStats").innerHTML =
        "Final Balance: ₹" + balance +
        "<br>Wins: " + wins +
        "<br>Win Rate: " + (wins/1000*100).toFixed(2) + "%";
}