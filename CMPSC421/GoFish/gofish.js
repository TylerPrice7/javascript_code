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
// TODO: If have a set, save it somewhere
// TODO: Set a score for the sets
// TODO: Draw card function
// TODO: Play Computer function

let deck = initDeck();
deck = shuffleDeck(deck);

let player_deck = [];
let computer_deck = [];
initPlayersDeck();

function initPlayersDeck() {
    for (let deal = 0; deal < 5; deal++) {
        player_deck.push(deck.pop());
        computer_deck.push(deck.pop());
    }
}

// Checks to see if the opposing player has the rank specified.
function checkForCard(card_hand, card_rank) {
    for (const card of card_hand) {
        if (card.rank == card_rank)
            return true;
    }
    return false;
}

function _testCheckForCard() {
    let random_hand = [
    {suit: "clubs", rank: "9"},
    {suit: "spades", rank: "7"},
    {suit: "hearts", rank: "K"},
    {suit: "hearts", rank: "Q"},
    {suit: "spades", rank: "5"} ]
    assert(checkForCard(random_hand, "K") === true); //true
    assert(!checkForCard(random_hand, "A") === false); //false
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
        {suit: "clubs", rank: "A"},
        {suit: "spades", rank: "A"},
        {suit: "hearts", rank: "9"},
        {suit: "hearts", rank: "A"},
        {suit: "diamonds", rank: "A"} ]
    console.log(checkForSets(random_hand));
}
_testCheckForSets();

console.log(deck);
console.log(player_deck);
console.log(computer_deck);

// Initialize a deck of cards
function initDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
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

