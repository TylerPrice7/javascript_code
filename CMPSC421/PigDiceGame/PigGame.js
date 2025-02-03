// Tyler Price
// CMPSC 421
// Feburary 1st, 2025

/*
    Randomly choose who goes first: player or computer
    When player goes: ask to roll or pass.
    If roll, roll and show value.
    If we get a 1, show 1. After a delay, pass to other player.
    If computers turn, do a random roll for 0 or 1.
        If 0, pass. If 1, roll the die. Have a bit of delay between each move.

    When someone hits >= 100, stop the game and show the winner.
*/
let game_over = false;
let player_score = 0;
let computer_score = 0;

let turn_score = 0;
let player_turn = false;
let computer_turn = false;
let first_roller = Math.random();
if (first_roller >= 0.5) {
    player_turn = true; // player goes first
    let turn = document.getElementById("turn");
    turn.textContent = "Turn: Player";
}
else {
    computer_turn = true; // computer goes first
    let turn = document.getElementById("turn");
    turn.textContent = "Turn: Computer";
    playComputer();
}

// Draws the scores of the current game and the current round.
function drawScore(player, score_type, score_number) {
    if (player === "player") {
        if (score_type === "total") {
            document.getElementById("player_score").textContent = "Player Score: " + score_number;
            turn_score = 0;
            score_number = 0;
        }
        document.getElementById("player_turn_score").textContent = "Turn Score: " + score_number;
    }
    else {
        if (score_type === "total") {
            document.getElementById("computer_score").textContent = "Computer Score: " + score_number;
            score_number = 0;
            turn_score = 0;
        }
        document.getElementById("computer_turn_score").textContent = "Turn Score: " + score_number;
    }
}

// Draws the dice with the number given to it, between 1-6
function drawD6(number) {
    if (number > 6 || number < 1) {
        return
    }
    let dice_image = document.getElementById("dice_face");
    switch(number) {
        case 1:
            dice_image.alt = "dice with face 1";
            dice_image.src = "Dice/dice1.png";
            break;
        case 2:
            dice_image.alt = "dice with face 2";
            dice_image.src = "Dice/dice2.png";
            break;
        case 3:
            dice_image.alt = "dice with face 3";
            dice_image.src = "Dice/dice3.png";
            break;
        case 4:
            dice_image.alt = "dice with face 4";
            dice_image.src = "Dice/dice4.png";
            break;
        case 5:
            dice_image.alt = "dice with face 5";
            dice_image.src = "Dice/dice5.png";
            break;
        case 6:
            dice_image.alt = "dice with face 6";
            dice_image.src = "Dice/dice6.png";
            break;
    }
    dice_image.style.visibility = "visible";
}

// Calculates the dice roll.
function rollD6() {
    let roll = Math.floor(Math.random() * 6 + 1);
    return roll;
}

// Switches turns between the player and the computer
function switchTurns() {
    if (player_turn) {
        player_turn = false;
        computer_turn = true;
        let turn = document.getElementById("turn");
        turn.textContent = "Turn: Computer";
        playComputer();
    }
    else {
        player_turn = true;
        computer_turn = false;
        let turn = document.getElementById("turn");
        turn.textContent = "Turn: Player";
    }
}

// Plays a standard game of pig. When someone rolls a 1, their turn is discarded
// and it switches turns to the other player. First person to hit 100 wins.
function playTurn(current_score) {
    let rolled_score = rollD6();
    drawD6(rolled_score);

    // If a 1 is rolled, wait 3 seconds, then switch turns.
    if (rolled_score === 1) {
        turn_score = 0;
        if (player_turn)
            drawScore("player", "turn", turn_score);
        else { drawScore("computer", "turn", turn_score); }
        switchTurns();
        return;
    }
    // Add dice roll to turn score.
    turn_score += rolled_score;
    if (player_turn)
        drawScore("player", "turn", turn_score);
    else {
        drawScore("computer", "turn", turn_score);
    }
    if (turn_score + current_score >= 100) {
        current_score += turn_score;
        if (player_turn) {
            showWinner("player");
            drawScore("player", "total", current_score);
        }
        else {
            showWinner("computer");
            drawScore("computer", "total", current_score);
        }
    }
}

// Declares the winner of the game.
function showWinner(winner) {
    if (winner === "player")
        document.getElementById("winner").textContent = "YOU WON!!!";
    else {
        document.getElementById("winner").textContent = "YOU LOST...";
    }
    document.getElementById("winner").style.visibility = "visible";
    game_over = true;
    player_turn = 0;
    computer_turn = 0;
}

// Checks if the player wants to roll dice.
document.getElementById("roll_dice").addEventListener("mousedown", e => {
    if (player_turn) {
        playTurn(player_score);
    }
});

// Checks if the player wants to end their turn.
document.getElementById("end_turn").addEventListener("mousedown", e => {
    if (player_turn) {
        player_score += turn_score;
        drawScore("player", "total", player_score);
        switchTurns();
        playComputer();
    }
});

// The functions behind the computer. Has a 50/50 chance of rolling or ending turn.
function playComputer(computer_score) {
    while (computer_turn) {
        let choose_turn = Math.random();
        if (choose_turn >= .5) {
            playTurn(computer_score);
        }
        else {
            computer_score += turn_score;
            drawScore("computer", "total", computer_score);
            switchTurns();
        }
    }
}