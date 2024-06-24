let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let game_width = canvas.width;
let game_height = canvas.height;
// Minimum size for the game is 300 x 300. Can be 400 x 400 if available.
if (game_width < window.innerWidth &&
    game_height < window.innerHeight) {
        game_width += 100;
        game_height += 100;
    }
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
const game_xcoord = (canvas.width - game_width) / 2;
const game_ycoord = (canvas.height - game_height) / 2;

const paddle_width = 10;
const paddle_height = 50;
const player_xcoord = game_xcoord + 35;
const ai_xcoord = game_xcoord + game_width - paddle_width - 35;

let player_ycoord = (canvas.height / 2) - (paddle_height / 2);
let ai_ycoord = player_ycoord;
let ai_speed = 8;

let pong_size = 10;
let pong_xcoord = canvas.width / 2 - pong_size / 2;
let pong_ycoord = canvas.height / 2 - pong_size / 2;
let pong_xspeed = 4;
let pong_yspeed = 6;

let player_score = 0;
let ai_score = 0;
const MAX_SCORE = 5;
const reset_xpoint = pong_xcoord;
const reset_ypoint = pong_ycoord;
const reset_xspeed = pong_xspeed;
const reset_yspeed = pong_yspeed;

paused = false;
prev_xspeed = pong_xspeed;
prev_yspeed = pong_yspeed;

const SPEED_INCREMENT_COUNTER = 5;
let paddle_bounces = 0;

let gameOver = false;

// Pauses the game by stopping the pong.
function pauseGame() {
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

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(game_xcoord, game_ycoord, game_width, game_height);
}

function drawStartScreen() {
    ctx.font = "100px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("PONG", canvas.width/2, game_ycoord + game_height/2);
    ctx.font = "22px monospace";
    ctx.fillText("CLICK TO BEGIN", canvas.width/2, game_ycoord + game_height/2 + 50);
    ctx.fill();
}

function drawPlayer(size=paddle_height) {
    ctx.fillStyle = "red";
    ctx.fillRect(player_xcoord, player_ycoord, paddle_width, size);
}

function drawAI() {
    ctx.fillStyle = "blue";
    ctx.fillRect(ai_xcoord, ai_ycoord, paddle_width, paddle_height);
}

function drawPong(size=pong_size) {
    ctx.fillStyle = "white";
    if (pong_xcoord < game_xcoord)
        ctx.fillRect(game_xcoord, pong_ycoord, size, size);
    else if (pong_xcoord > game_xcoord + game_width)
        ctx.fillRect(game_xcoord + game_width - pong_size, pong_ycoord, size, size);
    else if (pong_ycoord < game_ycoord)
        ctx.fillRect(pong_xcoord, game_ycoord, size, size);
    else if (pong_ycoord + size > game_ycoord + game_height)
        ctx.fillRect(pong_xcoord, game_ycoord + game_height - size, size, size);

    else { ctx.fillRect(pong_xcoord, pong_ycoord, size, size) }; 
}

// Displays the current score. 
// Note that drawScore does not have a fillStyle,
// so it will copy whatever fillStyle is currently enabled.
function drawScore() {
    ctx.font = "30px monospace";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText(player_score.toString(), game_xcoord + 50, game_ycoord + 50);
    ctx.textAlign = "right";
    ctx.fillText(ai_score.toString(), game_width + game_xcoord - 50, game_ycoord + 50);
}

// Updates position of the ball. Currently, it begins by moving bottom-right. 
function updateBall() {
    pong_xcoord += pong_xspeed;
    pong_ycoord += pong_yspeed;
}

// Calls the draw functions and fills them in.
function redrawScreen() {
    drawBackground();
    drawPlayer(paddle_height);
    drawAI();
    drawPong();
    drawScore();
    ctx.fill();
}

// Pauses and resets the coordinates and speed of the ping pong for a new game.
function resetPong() {
    pong_xcoord = reset_xpoint;
    pong_ycoord = reset_ypoint;
    pong_xspeed = reset_xspeed;
    pong_yspeed = reset_yspeed;
}

// For keyboard presses.
function movePlayerUp() {
    if (player_ycoord == game_ycoord)
        return;
    player_ycoord -= 10;
    if (player_ycoord <= game_ycoord)
        player_ycoord = game_ycoord;
}

// For keyboard presses.
function movePlayerDown() {
    if (player_ycoord + paddle_height == game_ycoord + game_height)
        return;
    player_ycoord += 10;
    if (player_ycoord + paddle_height >= game_ycoord + game_height)
        player_ycoord = game_ycoord + game_height - paddle_height;
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
    if (pong_xspeed < 0 || paused)
        return;
    else if (pong.top <= ai.top)
        ai_ycoord -= ai_speed;

    else if (pong.bottom >= ai.bottom)
        ai_ycoord += ai_speed;

    // Make sure the AI does not go above or below the game.
    if (ai_ycoord < game_ycoord)
        ai_ycoord = game_ycoord;
    else if (ai_ycoord + paddle_height > game_ycoord + game_height)
        ai_ycoord = game_ycoord + game_height - paddle_height;
}

// Increases the speed of the pong when condiiton is true
// TODO: Make it flash 'Speed Increasing'?
function updatePongSpeed() {
    if (paddle_bounces == 0)
        return;
    if (paddle_bounces % SPEED_INCREMENT_COUNTER == 0 ) {
        if (pong_xspeed > 0) 
            pong_xspeed += 1;
        else { pong_xspeed -= 1; }

        if (pong_yspeed > 0)
            pong_yspeed += 1;
        else { pong_yspeed -= 1; }
    }
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

// Adjust the direction of the paddle.
// Absolute makes sure that it doesn't double bounce.
function adjustDirection(direction) {
    if (direction == "left")
        pong_xspeed = Math.abs(pong_xspeed);
    else { pong_xspeed = -Math.abs(pong_xspeed); }
    paddle_bounces++;
}

// Checks for all the collisions in the game.
function checkCollisions() {
    if (paused) 
        return;
    let pong = {
        left : pong_xcoord,
        right: pong_xcoord + pong_size,
        top: pong_ycoord,
        bottom: pong_ycoord + pong_size,
        moving: pong_xspeed > 0 ? "right" : "left"
    };
    let player = {
        left: player_xcoord,
        right: player_xcoord + paddle_width,
        top: player_ycoord,
        bottom: player_ycoord + paddle_height,
        moving: "left"
    };
    let ai = {
        left: ai_xcoord,
        right: ai_xcoord + paddle_width,
        top: ai_ycoord,
        bottom: ai_ycoord + paddle_height,
        moving: "right"
    };

    // Check left and right of pong and screen.
    if (pong.left <= game_xcoord) {
        if (++ai_score >= MAX_SCORE) {
            gameOver = true;
        }
        pauseGame();
        setTimeout(() => {
            pauseGame();
            resetPong();
        }, 1000);
    }
    else if (pong.right >= game_xcoord + game_width) {
        if (++player_score >= MAX_SCORE) {
            gameOver = true;
        }
        pauseGame();
        setTimeout(() => {
            pauseGame();
            resetPong();
        }, 1000);

    }
    // Check top and bottom of pong and screen.
    else if (pong.top <= game_ycoord || pong.bottom >= game_ycoord + game_height) {
        pong_yspeed *= -1;
    }
    // Check right of player paddle and left of pong.
    // Ignores if not moving in paddle's direction.
    else if (
            pong.moving === player.moving &&
            pong.left < player.right && 
            pong.right > player.left &&
            pong.top < player.bottom &&
            pong.bottom > player.top
        ) {
        adjustAngle(pong, player);
        adjustDirection(player.moving);
        if (paddle_bounces % SPEED_INCREMENT_COUNTER == 0)
            updatePongSpeed();
    }
    // Check left of AI paddle and right of pong.
    // Ignores if not moving in paddle's direction.
    else if (
            pong.moving === ai.moving &&
            pong.right > ai.left && 
            pong.left < ai.right && 
            pong.top < ai.bottom &&
            pong.bottom > ai.top
        ) {
        adjustAngle(pong, ai);
        adjustDirection(ai.moving);
        if (paddle_bounces % SPEED_INCREMENT_COUNTER == 0)
            updatePongSpeed();
    }
}

function drawGameOver() {
    ctx.font = "48px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    if (ai_score > player_score)
        ctx.fillText("GAME OVER", canvas.width / 2, (game_height + game_ycoord) / 2);
    else {
        ctx.fillText("YOU WIN!", canvas.width / 2, (game_height + game_ycoord) / 2);
    }
    ctx.font = "20px monospace";
    ctx.fillText("Press Here To Continue", canvas.width/2, (game_height + game_ycoord) / 1.4);
    ctx.fill();
}

// Sets the appropriate booleans to false and resets scores.
function restartGame() {
    pauseGame();
    gameOver = false;
    beginGame = false;
    player_score = 0;
    ai_score = 0;
    player_ycoord = reset_ypoint;
    ai_ycoord = reset_ypoint;
}

// The main loop of the program.
function play() {
    if (!beginGame) {
        drawBackground();
        drawStartScreen();
        requestAnimationFrame(play);
    }
    else if (gameOver) {
        redrawScreen();
        drawGameOver();
    }
    else {
        moveAI();
        checkCollisions();
        updateBall();
        redrawScreen();
        requestAnimationFrame(play);
    }
}
// Start of program
let beginGame = false;
pauseGame();
drawPong(pong_size);
play();

// Check for the player to use the keyboard keys (on the canvas element). 
// When used, move the player.
document.querySelector("html").addEventListener("keydown", e => {
    if (e.key == "ArrowUp" && !paused)
        movePlayerUp();
    else if (e.key == "ArrowDown" && !paused)
        movePlayerDown();
    else if (e.key == "p")
        pauseGame();
});

// Allows the game to start when clicked
document.querySelector("html").addEventListener("mousedown", e => {
    if (!beginGame) {
        beginGame = true;
        setTimeout(() => {
            pauseGame();
        }, 1000);
    }
    // Restarts the game when clicked.
    if (gameOver) {
        mouse_ycoord = e.y - canvas.offsetTop;
        mouse_xcoord = e.x;
        if (mouse_xcoord > game_xcoord * 1.1 && mouse_xcoord < (game_width + game_xcoord) / 1.05 &&
            mouse_ycoord > (game_ycoord + game_height) / 1.5 && mouse_ycoord < (game_ycoord + game_height) / 1.35) {
                restartGame();
                requestAnimationFrame(play);
            }
    }
});

// Moves the player's paddle according to
// where their mouse is located on the y-axis.
document.querySelector("html").addEventListener("mousemove", e => {
    if (!paused) {
        player_ycoord = e.y - canvas.offsetTop;
        if (player_ycoord < game_ycoord)
            player_ycoord = game_ycoord;
        else if (player_ycoord + paddle_height > game_ycoord + game_height)
            player_ycoord = game_ycoord + game_height - paddle_height;
    }
});