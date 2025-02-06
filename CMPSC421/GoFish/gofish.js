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

function main() {
    let deck_of_cards = initDeck();
    deck_of_cards = shuffleDeck(deck_of_cards);

    let player_deck = [];
    let player_sets = [];
    let computer_deck = [];
    let computer_sets = [];
    
    initPlayersDeck(deck_of_cards, player_deck, computer_deck);

    let random_hand = [
        {suit: "clubs", rank: "A"},
        {suit: "spades", rank: "A"},
        {suit: "hearts", rank: "A"},
        {suit: "hearts", rank: "Q"},
        {suit: "spades", rank: "A"} ];

    console.log(deck_of_cards);
    console.log(player_deck);
    console.log(computer_deck);
}

// Computer picks a random card from their hand and asks player if they have it.
// If they have the card, computer gets all of that rank.
function playComputer(computer_deck, player_deck) {
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
    let player1_deck = [   {suit: "clubs", rank: "A"},
                      {suit: "spades", rank: "A"},
                      {suit: "hearts", rank: "A"},
                      {suit: "hearts", rank: "Q"},
                      {suit: "spades", rank: "3"} ];
    let player2_deck = [   {suit: "clubs", rank: "Q"},
                        {suit: "spades", rank: "Q"},
                        {suit: "hearts", rank: "K"},
                        {suit: "hearts", rank: "Q"},
                        {suit: "spades", rank: "8"} ];
    takeCards(player1_deck, player2_deck, 'Q');
    console.log(player1_deck);
    console.log(player2_deck);
}

// Draws a card from the deck.
function drawCard(deck, hand) {
    hand.push(deck.pop());
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
        {suit: "clubs", rank: "A"},
        {suit: "spades", rank: "A"},
        {suit: "hearts", rank: "A"},
        {suit: "hearts", rank: "Q"},
        {suit: "spades", rank: "A"} ]
    let player_sets = [];
    moveSets(random_hand, player_sets);
    console.log(player_sets);
}

// Initializes both player's decks.
function initPlayersDeck(deck, player1_deck, player2_deck) {
    for (let deal = 0; deal < 5; deal++) {
        player1_deck.push(deck.pop());
        player2_deck.push(deck.pop());
    }
}

// Checks to see if the opposing player has the rank specified.
function checkForCardRank(card_hand, card_rank) {
    for (const card of card_hand) {
        if (card.rank == card_rank)
            return true;
    }
    return false;
}

function _testCheckForCardRank() {
    let random_hand = [
    {suit: "clubs", rank: "9"},
    {suit: "spades", rank: "7"},
    {suit: "hearts", rank: "K"},
    {suit: "hearts", rank: "Q"},
    {suit: "spades", rank: "5"} ]
    assert(checkForCardRank(random_hand, "K") === true); //true
    assert(!checkForCardRank(random_hand, "A") === false); //false
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

main();