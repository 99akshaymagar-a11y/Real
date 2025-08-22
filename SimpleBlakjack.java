import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class SimpleBlackjack {

    static class Card {
        String suit;
        String rank;
        int value;

        Card(String suit, String rank, int value) {
            this.suit = suit;
            this.rank = rank;
            this.value = value;
        }

        @Override
        public String toString() {
            return rank + " of " + suit;
        }
    }

    static class Deck {
        private List<Card> cards = new ArrayList<>();

        Deck() {
            String[] suits = {"Hearts", "Diamonds", "Clubs", "Spades"};
            String[] ranks = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"};
            int[] values = {2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11};

            for (String suit : suits) {
                for (int i = 0; i < ranks.length; i++) {
                    cards.add(new Card(suit, ranks[i], values[i]));
                }
            }
            Collections.shuffle(cards);
        }

        Card drawCard() {
            return cards.remove(cards.size() - 1);
        }
    }

    static int calculateHandValue(List<Card> hand) {
        int value = 0;
        int aceCount = 0;
        for (Card card : hand) {
            value += card.value;
            if (card.rank.equals("Ace")) {
                aceCount++;
            }
        }
        // Adjust Ace value from 11 to 1 if bust
        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount--;
        }
        return value;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Deck deck = new Deck();

        List<Card> playerHand = new ArrayList<>();
        List<Card> dealerHand = new ArrayList<>();

        // Initial deal
        playerHand.add(deck.drawCard());
        playerHand.add(deck.drawCard());
        dealerHand.add(deck.drawCard());
        dealerHand.add(deck.drawCard());

        System.out.println("Welcome to Simple Blackjack!");
        boolean playerTurn = true;
        while (playerTurn) {
            System.out.println("\nYour hand: " + playerHand + " (Total: " + calculateHandValue(playerHand) + ")");
            System.out.println("Dealer shows: " + dealerHand.get(0));

            if (calculateHandValue(playerHand) == 21) {
                System.out.println("Blackjack! You win!");
                return;
            } else if (calculateHandValue(playerHand) > 21) {
                System.out.println("Bust! You lose!");
                return;
            }

            System.out.print("Hit (h) or Stand (s)? ");
            String choice = scanner.nextLine().toLowerCase();
            if (choice.equals("h")) {
                playerHand.add(deck.drawCard());
            } else if (choice.equals("s")) {
                playerTurn = false;
            } else {
                System.out.println("Invalid input, please enter 'h' or 's'.");
            }
        }

        // Dealer's turn
        System.out.println("\nDealer's hand: " + dealerHand + " (Total: " + calculateHandValue(dealerHand) + ")");
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.add(deck.drawCard());
            System.out.println("Dealer hits: " + dealerHand + " (Total: " + calculateHandValue(dealerHand) + ")");
        }

        int playerValue = calculateHandValue(playerHand);
        int dealerValue = calculateHandValue(dealerHand);

        System.out.println("\nFinal hands:");
        System.out.println("Player: " + playerHand + " (Total: " + playerValue + ")");
        System.out.println("Dealer: " + dealerHand + " (Total: " + dealerValue + ")");

        if (dealerValue > 21 || playerValue > dealerValue) {
            System.out.println("You win!");
        } else if (playerValue == dealerValue) {
            System.out.println("It's a tie!");
        } else {
            System.out.println("Dealer wins!");
        }

        scanner.close();
    }
}
