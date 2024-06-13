/*
    First, we need to make the black canvas and the player's handle.
    For now, let's make it so the player can move it's handle up and down.
*/

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

const paddle_width = 10;
const paddle_height = 50;
const player_xcoord = 35;
const ai_xcoord = width - 35;

let player_ycoord = (height / 2) - (paddle_height / 2);
let ai_ycoord = (height / 2) - (paddle_height / 2);
let ai_speed = 5;

let pong_size = 10;
let pong_xcoord = width / 2 - pong_size / 2;
let pong_ycoord = height / 2 - pong_size / 2;
let pong_xspeed = 2;
let pong_yspeed = 4;

let player_score = 0;
let ai_score = 0;
const reset_xpoint = pong_xcoord;
const reset_ypoint = pong_ycoord;
const reset_xspeed = pong_xspeed;
const reset_yspeed = pong_yspeed;

paused = false;
prev_xspeed = pong_xspeed;
prev_yspeed = pong_yspeed;

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();
}

function drawPlayer(size=player_height) {
    ctx.fillStyle = "red";
    ctx.fillRect(player_xcoord, player_ycoord, paddle_width, size);
    ctx.fill();
}

function drawAI() {
    ctx.fillStyle = "blue";
    ctx.fillRect(ai_xcoord, ai_ycoord, paddle_width, paddle_height);
    ctx.fill();
}

function drawPong(size=pong_size) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(pong_xcoord, pong_ycoord, size, size);
}

// Displays the current score. 
// Note that drawScore does not have a fillStyle,
// so it will copy whatever fillStyle is currently enabled.
function drawScore() {
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    ctx.fillText(player_score.toString(), 50, 50);
    ctx.textAlign = "right";
    ctx.fillText(ai_score.toString(), width - 50, 50);
    ctx.fill();
}

// Updates position of the ball. Currently, it begins by moving top-left. 
function updateBall() {
    pong_xcoord -= pong_xspeed;
    pong_ycoord -= pong_yspeed;
}

// Calls the draw functions.
function redrawScreen() {
    drawBackground();
    drawPlayer(paddle_height);
    drawAI();
    drawPong();
    drawScore();
}

// Resets the coordinates and speed of the ping pong for a new game.
function resetPong() {
    pong_xcoord = reset_xpoint;
    pong_ycoord = reset_ypoint;
    pong_xspeed = reset_xspeed;
    pong_yspeed = reset_yspeed;
}

// For keyboard presses.
function movePlayerUp() {
    if (player_ycoord == 0)
        return;
    player_ycoord -= 10;
    if (player_ycoord <= 0)
        player_ycoord = 0;

}

// For keyboard presses.
function movePlayerDown() {
    if (player_ycoord + paddle_height == height)
        return;
    player_ycoord += 10;
    if (player_ycoord + paddle_height >= height)
        player_ycoord = height - paddle_height;

}

// Moves the AI if the ball is above or below the paddle.
function moveAI() {
    let pong = {
        top: pong_ycoord,
        bottom: pong_ycoord + pong_size
    };
    let ai = {
        top: ai_ycoord,
        bottom: ai_ycoord + paddle_height
    };
    // Whenever the updateBall function is changed, this statement needs to be adjusted.
    if (pong_xspeed > 0)
        return;
    else if (pong.top <= ai.top)
        ai_ycoord -= ai_speed;

    else if (pong.bottom >= ai.bottom)
        ai_ycoord += ai_speed;

    // Make sure the AI does not go above or below the game.
    if (ai.top < 0)
        ai_ycoord = 0;
    else if (ai.bottom > height)
        ai_ycoord = height - paddle_height;

}

// Changes the angle of the pong if it hits edges of paddle.
function adjustAngle(pong, paddle) {
    let distanceFromTop = pong.top - paddle.top;
    let distanceFromBottom = paddle.bottom - pong.bottom;
    if (distanceFromTop < 0) {
        pong_yspeed -= 0.5;
    }
    else if (distanceFromBottom < 0) {
        pong_yspeed += 0.5;
    }
}

// Checks for all the collisions in the game.
function updateCollisions() {
    let pong = {
        left : pong_xcoord,
        right: pong_xcoord + pong_size,
        top: pong_ycoord,
        bottom: pong_ycoord + pong_size
    };
    let player = {
        left: player_xcoord,
        right: player_xcoord + paddle_width,
        top: player_ycoord,
        bottom: player_ycoord + paddle_height
    };
    let ai = {
        left: ai_xcoord,
        right: ai_xcoord + paddle_width,
        top: ai_ycoord,
        bottom: ai_ycoord + paddle_height
    };

    // Check left and right of pong and screen.
    if (pong.left <= 0) {
        ai_score++;
        resetPong();
    }
    else if (pong.right >= width) {
        player_score++;
        resetPong();
    }
    // Check top and bottom of pong and screen.
    else if (pong.top <= 0 || pong.bottom >= height) {
        pong_yspeed *= -1;
    }
    // Check right of player paddle and left of pong.
    // Absolute makes sure that it doesn't double bounce.
    else if (
            pong.left < player.right && 
            pong.right > player.left &&
            pong.top < player.bottom &&
            pong.bottom > player.top
        ) {
        adjustAngle(pong, player);
        pong_xspeed = -Math.abs(pong_xspeed);
    }
    // Check left of AI paddle and right of pong.
    // Absolute makes sure that it doesn't double bounce. 
    else if (
            pong.right > ai.left && 
            pong.left < ai.right && 
            pong.top < ai.bottom &&
            pong.bottom > ai.top
        ) {
        adjustAngle(pong, ai);
        pong_xspeed = Math.abs(pong_xspeed);
    }
}

// The main loop of the program.
function play() {
    moveAI();
    updateCollisions();
    updateBall();
    redrawScreen();
    setTimeout(play, 30);
}
// Start of program
drawPong(pong_size);
play();

// Check for the player to use the keyboard keys (on the canvas element). 
// When used, move the player.
document.querySelector("html").addEventListener("keydown", e => {
    if (e.key == "ArrowUp")
        movePlayerUp();
    else if (e.key == "ArrowDown")
        movePlayerDown();
    else if (e.key == "p") {
        if (paused) {
            paused = false;
            pong_xspeed = prev_xspeed;
            pong_yspeed = prev_yspeed;
        }
        else { 
            paused = true; 
            prev_xspeed = pong_xspeed;
            prev_yspeed = pong_yspeed
            pong_xspeed = 0;
            pong_yspeed = 0;
        }
    }   
});

// Moves the player's paddle according to
// where their mouse is located on the y-axis.
document.querySelector("html").addEventListener("mousemove", e => {
    player_ycoord = e.y - canvas.offsetTop;
    if (player_ycoord < 0)
        player_ycoord = 0;
    else if (player_ycoord + paddle_height > height)
        player_ycoord = height - paddle_height;
        
});