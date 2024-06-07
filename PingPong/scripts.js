/*
    First, we need to make the black canvas and the player's handle.
    For now, let's make it so the player can move it's handle up and down.
*/

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

const player_width = 10;
const player_height = 50;
const player_xcoord = 35;
let player_ycoord = (height / 2) - (player_height / 2);

const ai_width = 10;
const ai_height = 50;
const ai_xcoord = width - 35;
let ai_ycoord = (height / 2) - (ai_height / 2);
let ai_speed = 10;

let pong_size = 10;
let pong_xcoord = width / 2 - pong_size / 2;
let pong_ycoord = height / 2 - pong_size / 2;
let pong_xspeed = 2;
let pong_yspeed = 4;

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();
}

function drawPlayer(size=player_height) {
    ctx.fillStyle = "red";
    //console.log(player_xcoord + " " + player_ycoord + " " + player_width + " " + size);
    ctx.fillRect(player_xcoord, player_ycoord, player_width, size);
    ctx.fill();
}

function drawAI() {
    ctx.fillStyle = "blue";
    ctx.fillRect(ai_xcoord, ai_ycoord, ai_width, ai_height);
    ctx.fill();
}

function drawPong(size=pong_size) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(pong_xcoord, pong_ycoord, size, size);
}

function updateBall() {
    pong_xcoord -= pong_xspeed;
    pong_ycoord -= pong_yspeed;
}

function redrawScreen() {
    //ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawPlayer(player_height);
    drawAI();
    drawPong();
    //setTimeout(redrawScreen, 30);
}

function movePlayerUp() {
    if (player_ycoord == 0)
        return;
    player_ycoord -= 20;
    if (player_ycoord <= 0)
        player_ycoord = 0;
    redrawScreen();
}

function movePlayerDown() {
    if (player_ycoord + player_height == height)
        return;
    player_ycoord += 20;
    if (player_ycoord + player_height >= height)
        player_ycoord = height - player_height;
    redrawScreen();
}

function moveAI() {
    if (pong_xspeed > 0)
        return;
    if (pong_ycoord >= ai_ycoord && pong_ycoord <= ai_ycoord + ai_height)
        return;
    else if (pong_ycoord - 2 >= ai_ycoord)
        ai_ycoord += ai_speed;
    else if (pong_ycoord + 2 <= ai_ycoord)
        ai_ycoord -= ai_speed;

    if (ai_ycoord <= 0)
        ai_ycoord = 0; //don't go up
    else if (ai_ycoord + ai_height >= height)
        ai_ycoord = height - ai_height; //don't go down
    redrawScreen();
}

function updateCollisions() {
    // Check left of pong and screen
    if (pong_xcoord <= 0 || pong_xcoord + pong_size >= width) {
        pong_xspeed = 0;
        pong_yspeed = 0;
    }
    // Check top and bottom of pong and screen
    else if (pong_ycoord <= 0 || pong_ycoord + pong_size >= height) {
        pong_yspeed *= -1;
    }
// Player Collisions
    // Check right of pong and screen.
    // Check left of pong and right of player.
    else if (
             pong_xcoord == player_xcoord + player_width &&
             pong_ycoord <= player_ycoord + player_height &&
             pong_ycoord >= player_ycoord
            ) {
        console.log("Hit the player first");
        pong_xspeed *= -1;
        }

    // Check pong and player hitboxes (top and bottom).
    else if (pong_xcoord <= player_xcoord + player_width  &&
             pong_ycoord <= player_ycoord + player_height &&
             pong_xcoord - pong_size <= player_xcoord     &&
             pong_ycoord + pong_size >= player_ycoord
            )
            {console.log("Hit the player second");
        pong_yspeed *= -1;
            }
// AI Collisions
    // Check right of pong and left of AI.
    else if (pong_xcoord + pong_size == ai_xcoord && 
             pong_ycoord <= ai_ycoord + ai_height && 
             pong_ycoord >= ai_ycoord
            ) { console.log("Hit left of AI");
            pong_xspeed *= -1;
            }
    // Check pong and AI hitboxes (top and bottom).
    else if (   pong_xcoord >= ai_xcoord - ai_width &&
                pong_ycoord <= ai_ycoord + ai_height &&
                pong_xcoord + pong_size >= ai_xcoord &&
                pong_ycoord + pong_size >= ai_ycoord
            ) { console.log("hit AI hitbox");
        pong_yspeed *= -1;
            }
    // if (pong_xcoord + pong_size <= player_xcoord)
    //     console.log("pong_xcoord + pong_size <= player_xcoord");
    // if (pong_xcoord + pong_size >= ai_xcoord)
    //     console.log("pong_xcoord + pong_size >= ai_xcoord");

    //console.log(pong_xcoord + pong_size == ai_xcoord);
    //console.log(pong_ycoord <= ai_ycoord + ai_height);
    //console.log(pong_ycoord >= ai_ycoord);
    //console.log(pong_xcoord + pong_size == ai_xcoord && pong_ycoord <= ai_ycoord + ai_height && pong_ycoord >= ai_ycoord);
    //console.log(pong_xcoord + " " + pong_ycoord + " " + pong_size + " " + ai_xcoord + " " + ai_ycoord + " " + ai_height);
    // 255 117 10 265 110 50
    //console.log(pong_xspeed);
}

paused = false;
prev_xspeed = pong_xspeed;
prev_yspeed = pong_yspeed;
function play() {
    redrawScreen();
    moveAI();
    updateCollisions();
    updateBall();
    setTimeout(play, 10);
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