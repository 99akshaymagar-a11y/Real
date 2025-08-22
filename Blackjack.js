class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = [
      "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "Jack", "Queen", "King", "Ace"
    ];
    const values = [2,3,4,5,6,7,8,9,10,10,10,10,11];

    for (const suit of suits) {
      for (let i = 0; i < ranks.length; i++) {
        this.cards.push(new Card(suit, ranks[i], values[i]));
      }
    }

    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.pop();
  }
}

function calculateHandValue(hand) {
  let total = 0;
  let aceCount = 0;

  for (const card of hand) {
    total += card.value;
    if (card.rank === "Ace") aceCount++;
  }

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
}

function handToString(hand, hideFirstCard = false) {
  if (hideFirstCard) {
    return `[Hidden], ${hand.slice(1).map(card => card.toString()).join(", ")}`;
  }
  return hand.map(card => card.toString()).join(", ");
}

function blackjackGame() {
  const deck = new Deck();
  let playerHand = [deck.draw(), deck.draw()];
  let dealerHand = [deck.draw(), deck.draw()];

  alert("Welcome to Simple Blackjack!");

  // Player's turn
  let playerTurn = true;

  while (playerTurn) {
    let playerValue = calculateHandValue(playerHand);
    alert(`Your hand: ${handToString(playerHand)} (Total: ${playerValue})\nDealer shows: ${dealerHand[1].toString()}`);

    if (playerValue === 21) {
      alert("Blackjack! You win!");
      return;
    }

    if (playerValue > 21) {
      alert("Bust! You lose!");
      return;
    }

    let choice = prompt("Do you want to Hit (h) or Stand (s)?").toLowerCase();
    if (choice === "h") {
      playerHand.push(deck.draw());
      alert(`You drew a ${playerHand[playerHand.length - 1].toString()}`);
    } else if (choice === "s") {
      playerTurn = false;
    } else {
      alert("Invalid input. Please enter 'h' or 's'.");
    }
  }

  // Dealer's turn
  alert(`Dealer's hand: ${handToString(dealerHand)} (Total: ${calculateHandValue(dealerHand)})`);
  while (calculateHandValue(dealerHand) < 17) {
    let card = deck.draw();
    dealerHand.push(card);
    alert(`Dealer draws: ${card.toString()} (Total: ${calculateHandValue(dealerHand)})`);
  }

  let playerTotal = calculateHandValue(playerHand);
  let dealerTotal = calculateHandValue(dealerHand);

  let resultMessage = `Final Hands:\nPlayer: ${handToString(playerHand)} (Total: ${playerTotal})\nDealer: ${handToString(dealerHand)} (Total: ${dealerTotal})\n`;

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    resultMessage += "You win!";
  } else if (playerTotal === dealerTotal) {
    resultMessage += "It's a tie!";
  } else {
    resultMessage += "Dealer wins!";
  }

  alert(resultMessage);
}

// Start the game
blackjackGame();
