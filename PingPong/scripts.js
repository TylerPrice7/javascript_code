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
let ai_speed = 15;

let pong_size = 10;
let pong_xcoord = width / 2 - pong_size / 2;
let pong_ycoord = height / 2 - pong_size / 2;
let pong_xspeed = 2;
let pong_yspeed = 4;

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

function updateBall() {
    pong_xcoord += pong_xspeed;
    pong_ycoord += pong_yspeed;
}

function redrawScreen() {
    drawBackground();
    drawPlayer(paddle_height);
    drawAI();
    drawPong();
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

// Moves the AI if the ball is above or below the handle.
function moveAI() {
    if (pong_xspeed < 0)
        return;
    if (pong_ycoord >= ai_ycoord && pong_ycoord <= ai_ycoord + paddle_height)
        return;
    else if (pong_ycoord - 5 >= ai_ycoord)
        ai_ycoord += ai_speed;
    else if (pong_ycoord + 5 <= ai_ycoord)
        ai_ycoord -= ai_speed;

    if (ai_ycoord <= 0)
        ai_ycoord = 0; //don't go up
    else if (ai_ycoord + paddle_height >= height)
        ai_ycoord = height - paddle_height; //don't go down

}

function updateCollisions() {
    // Check left and right of pong and screen.
    // Currently bounces off for testing purposes.
    if (pong_xcoord <= 0 || pong_xcoord + pong_size >= width) {
        pong_xspeed *= -1;
    }
    // Check top and bottom of pong and screen.
    else if (pong_ycoord <= 0 || pong_ycoord + pong_size >= height) {
        pong_yspeed *= -1;
    }

}

// The main loop of the program.
function play() {
    redrawScreen();
    moveAI();
    updateCollisions();
    updateBall();
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

document.querySelector("html").addEventListener("mousemove", e => {
    player_ycoord = e.y - canvas.offsetTop;
    if (player_ycoord < 0)
        player_ycoord = 0;
    else if (player_ycoord + paddle_height > height)
        player_ycoord = height - paddle_height;
        
});