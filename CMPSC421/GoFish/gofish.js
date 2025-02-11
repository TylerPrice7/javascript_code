// Tyler Price
// CMPSC 421
//
/*
    Have the player go first. Put all of the cards in an array, and 
    randomize the array. Give the player 5 cards, then the computer 5 cards.
    On one of the sides (left? top?), have a image of an example card you want.
    When clicked (on your turn), it will ask computer if they have it.
    If they do have it, give some kind of recognition, and add the card to the player's hand.
    The player's hand is done in small pictures of the deck. After every pickup,
    check to see if there are 4 of a card. If so, give some recognition, then remove them.
    On computer's turn, pick a random card that is in their hand, and ask for another.
    Card deck should be a stack (should be queue but doesn't matter).
    Once either the player or the computer runs out of cards, the game is done.
    (In the normal game, you would continue until all cards are down in stacks).
    There are 12 pairs of cards.
*/
// TODO: Set a score for the sets
const player_cards_container = document.getElementById("player_cards");
const computer_cards_container = document.getElementById("computer_cards");
const deck_container = document.getElementById("deck_of_cards");
const player_sets_id = document.getElementById("player_sets");
const computer_sets_id = document.getElementById("computer_sets");

function main() {
    let deck_of_cards = initDeck();
    deck_of_cards = shuffleDeck(deck_of_cards);

    let player_deck = [];
    let player_sets = [];
    let computer_deck = [];
    let computer_sets = [];

    initPlayersDeck(deck_of_cards, player_deck, computer_deck);
    displayPlayersCards(player_deck);
    displayComputersCards(computer_deck);
    displayDeckOfCards(deck_of_cards);

    document.querySelectorAll(".player-cards").forEach(card => {
        card.addEventListener("click", (e) => {
            let clicked_card = e.target.id;
           
            let card_rank = "";
            for (let char = 0; char < clicked_card.length; char++) {
                if (clicked_card[char] === "-") {
                    card_rank = (clicked_card).slice(0, char);
                    break;
                }
            }
            play(card_rank, player_deck, computer_deck, player_sets, computer_sets, deck_of_cards);
        });
    });
}

function play(card_rank, player_deck, computer_deck, player_sets, computer_sets, deck_of_cards) {
    if (checkForCardRank(computer_deck, card_rank))
        takeCards(player_deck, computer_deck, card_rank);
    else { drawCard(deck_of_cards, player_deck); }
    moveSets(player_deck, player_sets);

    displayDecks(player_deck, computer_deck, deck_of_cards, player_sets, computer_sets);
    playComputer(computer_deck, player_deck, deck_of_cards);
    moveSets(computer_deck, computer_sets);
    displayDecks(player_deck, computer_deck, deck_of_cards, player_sets, computer_sets);
    ifWinner(player_deck, computer_deck, player_sets, computer_sets, deck_of_cards);
}

// Checks to see if the game is over. The game is over when all cards are gone.
function ifWinner(player_deck, computer_deck, player_sets, computer_sets, deck_of_cards) {
    if (player_deck.length === 0) {
        while (computer_deck.length > 0)
            playComputer(computer_deck, player_deck, deck_of_cards);
    }
    if (player_deck.length === 0 && computer_deck.length === 0 && deck_of_cards.length === 0) {
        let num_player_sets = player_sets.length;
        let num_computer_sets = computer_sets.length;

        console.log("Here");
        // If player has more sets than computer, player wins.
        if (num_player_sets > num_computer_sets) {
            const player_win = document.querySelector(".winner");
            player_win.style.visibility = "visible";
            return true;
        }
        else if (num_player_sets < num_computer_sets) {
            const player_lose = document.querySelector(".loser");
            player_lose.style.visibility = "visible";
            return true;
        }
    }
}

function displayDecks(player_deck, computer_deck, deck_of_cards, player_sets, computer_sets) {
    displayPlayersCards(player_deck);
    displayComputersCards(computer_deck);
    displayDeckOfCards(deck_of_cards);
    displaySets(player_sets, computer_sets);
}

function displaySets(player_sets, computer_sets) {
    player_sets_id.innerHTML = "Player's Sets: " + player_sets.length;
    computer_sets_id.innerHTML = "Computer's Sets: " + computer_sets.length;
}

// Displays text of how many cards are left.
function displayDeckOfCards(deck_of_cards) {
    let cards_remaining = deck_of_cards.length;
    const text = document.querySelector("h2");
    if (cards_remaining > 1)
        text.innerHTML = cards_remaining + " cards<br>remain";
    else if (cards_remaining == 1)
        text.innerHTML = "1 card<br>remains";
    else {
        text.innerHTML = "No cards<br>remain";
    }
}

// Displays the computers cards face-down.
function displayComputersCards(computer_deck) {
    removeOldCards(".back-card .cards");
    for (const {} of computer_deck) {
        let new_img = document.createElement("img");
        new_img.setAttribute("class", "cards");
        new_img.src = "PNG-cards/back.png";
        computer_cards_container.append(new_img);
    }
}

// Removes old cards from the display using a query.
function removeOldCards(querySelector) {
    const old_cards = document.querySelectorAll(querySelector);
    old_cards.forEach(card => { // There are no old cards the first run.
        card.remove();
    })
}

// Displays the players cards face-up.
function displayPlayersCards(player_deck) {
    removeOldCards(".player-cards .cards");
    for (const card of player_deck) {
        let new_img = document.createElement("img");
        new_img.id = card.rank + "-of-" + card.suit;
        new_img.setAttribute("class", "cards");
        let suit = card.suit;
        let rank = card.rank;
        if (rank === "jack" || rank === "queen" || rank === "king")
            new_img.src = "PNG-cards/" + rank + "_of_" + suit + "2.png";
        else {
            new_img.src = "PNG-cards/" + rank + "_of_" + suit + ".png";
        }
        player_cards_container.append(new_img);
    }
}

// Computer picks a random card from their hand and asks player if they have it.
// If they have the card, computer gets all of that rank.
function playComputer(computer_deck, player_deck, deck_of_cards) {
    if (computer_deck.length === 0)
        return;
    let deck_size = computer_deck.length;
    let random_idx = Math.floor(Math.random() * deck_size);
    let random_card_rank = computer_deck[random_idx].rank;
    if (checkForCardRank(player_deck, random_card_rank))
        takeCards(computer_deck, player_deck, random_card_rank); // Player has at least one of that card. Take all of them.
    else {
        drawCard(deck_of_cards, computer_deck);
    }
}

// Take specified card rank from the opposing player's deck and add it to yours.
function takeCards(your_deck, their_deck, card_rank) {
    for (const card of their_deck) {
        if (card.rank === card_rank)
            your_deck.push(card);
    }
    removeRankFromHand(their_deck, card_rank);
}

function _takeCards() {
    let player1_deck = [   {suit: "clubs", rank: "ace"},
                      {suit: "spades", rank: "ace"},
                      {suit: "hearts", rank: "ace"},
                      {suit: "hearts", rank: "queen"},
                      {suit: "spades", rank: "3"} ];
    let player2_deck = [   {suit: "clubs", rank: "queen"},
                        {suit: "spades", rank: "queen"},
                        {suit: "hearts", rank: "king"},
                        {suit: "hearts", rank: "queen"},
                        {suit: "spades", rank: "8"} ];
    takeCards(player1_deck, player2_deck, 'queen');
}

// Draws a card from the deck.
function drawCard(card_deck, hand) {
    hand.push(card_deck.pop());
}

// If there are any sets in the player's deck, move the cards into sets array.
function moveSets(deck, sets) {
    let new_set = checkForSets(deck);
    if (new_set.length >= 1) { // If there is more than 1 set
        for (const set of new_set) {
            removeRankFromHand(deck, set); // Removes set of 4 from hand
            sets.push(set);          // and pushes it to their set pile.
        }
    }
}

// Removes a specified rank from a deck.
function removeRankFromHand(deck, rank) {
    // Splices out all cards that have the rank as the set being taken out.
    for (let card_idx = deck.length-1; card_idx >= 0; card_idx--) {
        if (deck[card_idx].rank === rank)
            deck.splice(card_idx, 1); // Starting from this index, remove 1 element.
    }
}

function _moveSets() {
    let random_hand = [
        {suit: "clubs", rank: "ace"},
        {suit: "spades", rank: "ace"},
        {suit: "hearts", rank: "ace"},
        {suit: "hearts", rank: "queen"},
        {suit: "spades", rank: "ace"} ]
    let player_sets = [];
    moveSets(random_hand, player_sets);
}

// Initializes both player's decks.
function initPlayersDeck(deck, player1_deck, player2_deck) {
    for (let deal = 0; deal < 5; deal++) {
        player1_deck.push(deck.pop());
        player2_deck.push(deck.pop());
    }
}

// Checks to see if the opposing player has the rank specified.
function checkForCardRank(their_hand, card_rank) {
    for (const card of their_hand) {
        if (card.rank == card_rank)
            return true;
    }
    return false;
}

function _testCheckForCardRank() {
    let random_hand = [
    {suit: "clubs", rank: "9"},
    {suit: "spades", rank: "7"},
    {suit: "hearts", rank: "king"},
    {suit: "hearts", rank: "queen"},
    {suit: "spades", rank: "5"} ]
    assert(checkForCardRank(random_hand, "king") === true); //true
    assert(!checkForCardRank(random_hand, "ace") === false); //false
}

// Checks to see if the player has any sets (4 of the same rank).
// Returns the rank of the cards that they have sets of 4 for (shouldn't they only have 1 set at a time?)
function checkForSets(card_hand) {
    let sets = [];
    let freq_ranks = {};
    for (const card of card_hand) {
        let rank = card.rank;
        freq_ranks[rank] = (freq_ranks[rank] || 0) + 1 // If key exists, increment by 1. Otherwise, make key and make 1.
        if (freq_ranks[rank] === 4)
            sets.push(rank);
    }
    return sets
}

function _testCheckForSets() {
    let random_hand = [
        {suit: "clubs", rank: "ace"},
        {suit: "spades", rank: "ace"},
        {suit: "hearts", rank: "9"},
        {suit: "hearts", rank: "ace"},
        {suit: "diamonds", rank: "ace"} ]
}

// Initialize a deck of cards
function initDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    let deck = [];

    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }

    return deck;
}

// Shuffle the deck of cards
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

main();