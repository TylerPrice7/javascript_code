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
let mouse_pos = 0;
const MAX_FRAME_MOVEMENT = 10;
let ai_ycoord = player_ycoord;
let ai_speed = 8;

let pong_size = 10;
let pong_xcoord = (canvas.width / 2) - (pong_size / 2);
let pong_ycoord = (canvas.height / 2) - (pong_size / 2);
let pong_xspeed = 3;
let pong_yspeed = 4;

const slow_pong_size = 15;
let slow_pong_xcoord = (canvas.width / 2) - (slow_pong_size / 2);
let slow_pong_ycoord = (canvas.height / 2) - (slow_pong_size / 2);
let slow_pong_xspeed = 1;
let slow_pong_yspeed = 2;

let player_score = 0;
let ai_score = 0;
const MAX_SCORE = 5;
const reset_xpoint = pong_xcoord;
const reset_ypoint = pong_ycoord;
const reset_xspeed = pong_xspeed;
const reset_yspeed = pong_yspeed;
const reset_slow_xpoint = slow_pong_xcoord;
const reset_slow_ypoint = slow_pong_ycoord;
const reset_slow_xspeed = slow_pong_xspeed;
const reset_slow_yspeed = slow_pong_yspeed;

let paused = false;
let prev_xspeed = pong_xspeed;
let prev_yspeed = pong_yspeed;
let prev_slow_xspeed = slow_pong_xspeed;
let prev_slow_yspeed = slow_pong_yspeed;

const SPEED_INCREMENT_COUNTER = 5;
let paddle_bounces = 0;

let gameOver = false;

// Pauses the game by stopping the pong.
function pauseGame() {
    if (paused) {
        paused = false;
        pong_xspeed = prev_xspeed;
        pong_yspeed = prev_yspeed;
        slow_pong_xspeed = prev_slow_xspeed;
        slow_pong_yspeed = prev_slow_yspeed;
    }
    else {
        paused = true;
        prev_xspeed = pong_xspeed;
        prev_yspeed = pong_yspeed;
        prev_slow_xspeed = slow_pong_xspeed;
        prev_slow_yspeed = slow_pong_yspeed;
        pong_xspeed = 0;
        pong_yspeed = 0;
        slow_pong_xspeed = 0;
        slow_pong_yspeed = 0;
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
}

function drawPlayer(size=paddle_height) {
    ctx.fillStyle = "red";
    if (player_ycoord < game_ycoord)
        player_ycoord = game_ycoord;
    else if (player_ycoord + paddle_height > game_ycoord + game_height)
        player_ycoord = game_ycoord + game_height - paddle_height;
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

function drawSlowPong(size=slow_pong_size) {
    ctx.fillStyle = "white";
    if (slow_pong_xcoord < game_xcoord)
        ctx.fillRect(game_xcoord, slow_pong_ycoord, size, size);
    else if (slow_pong_xcoord > game_xcoord + game_width)
        ctx.fillRect(game_xcoord + game_width - slow_pong_size, slow_pong_ycoord, size, size);
    else if (slow_pong_ycoord < game_ycoord)
        ctx.fillRect(slow_pong_xcoord, game_ycoord, size, size);
    else if (slow_pong_ycoord + size > game_ycoord + game_height)
        ctx.fillRect(slow_pong_xcoord, game_ycoord + game_height - size, size, size);
    
    else { ctx.fillRect(slow_pong_xcoord, slow_pong_ycoord, size, size)};
}

// Displays the current score. 
function drawScore() {
    ctx.font = "30px monospace";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText(player_score.toString(), game_xcoord + 50, game_ycoord + 50);
    ctx.textAlign = "right";
    ctx.fillText(ai_score.toString(), game_width + game_xcoord - 50, game_ycoord + 50);
}

// Updates position of the ball. Currently, it begins by moving bottom-right. 
function updatePong() {
    pong_xcoord += pong_xspeed;
    pong_ycoord += pong_yspeed;
    slow_pong_xcoord += slow_pong_xspeed;
    slow_pong_ycoord += slow_pong_yspeed;
}

// Calls the draw functions and fills them in.
function redrawScreen() {
    drawBackground();
    drawPlayer(paddle_height);
    drawAI();
    drawPong();
    drawSlowPong();
    drawScore();
}

// Pauses and resets the coordinates and speed of the ping pong for a new game.
// Randomly chooses the direction the pong originally shoots.
// The direction chosen is as follows:
// < 0.25, bottom left. < 0.50, top left. < 0.75, top right. > 0.75, bottom right.
function resetPong() {
    let basic_pong_direction = Math.random();
    pong_xcoord = reset_xpoint;
    pong_ycoord = reset_ypoint;
    pong_xspeed = reset_xspeed;
    pong_yspeed = reset_yspeed;
    if (basic_pong_direction > 0.75)
       ; // No action needed.
    else if (basic_pong_direction > 0.5)
        pong_yspeed *= -1;
    else if (basic_pong_direction > 0.25) {
        pong_xspeed *= -1;
        pong_yspeed *= -1;
    }
    else { pong_xspeed *= -1; }

    let slow_pong_direction = Math.random();
    slow_pong_xcoord = reset_slow_xpoint;
    slow_pong_ycoord = reset_slow_ypoint;
    slow_pong_xspeed = reset_slow_xspeed;
    slow_pong_yspeed = reset_slow_yspeed;
    if (slow_pong_direction > 0.75)
        ; // No action needed.
    else if (slow_pong_direction > 0.5) {
        console.log(`${slow_pong_direction} in use`);
        console.log(`${slow_pong_yspeed}`);
        slow_pong_yspeed *= -1;
        console.log(`${slow_pong_yspeed}`);
    }
    else if (slow_pong_direction > 0.25) {
        slow_pong_xspeed *= -1;
        slow_pong_yspeed *= -1;
    }
    else { slow_pong_xspeed *= -1; }
    console.log(`${basic_pong_direction} and ${slow_pong_direction}`);
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

// Moves the player depending where their mouse is.
function movePlayer() {
    let player = {
        top: player_ycoord,
        bottom: player_ycoord + paddle_height
    };
    // Whenever the updatePong function is changed, this statement needs to be adjusted.
    if (mouse_pos < player.top - MAX_FRAME_MOVEMENT) {
        player_ycoord -= MAX_FRAME_MOVEMENT;
      } else if (mouse_pos > player.top + MAX_FRAME_MOVEMENT) {
        player_ycoord += MAX_FRAME_MOVEMENT;
      }
    if (player.top < game_ycoord)
        player_ycoord = game_ycoord;
    else if (player.bottom > game_ycoord + game_height)
        player_ycoord = game_ycoord + game_height - paddle_height;
}

// Moves the AI if the ball is above or below the paddle.
function moveAI() {
    let pong = {
        top: pong_ycoord,
        bottom: pong_ycoord + pong_size,
        right: pong_xcoord + pong_size
    };
    let slow_pong = {
        top: slow_pong_ycoord,
        bottom: slow_pong_ycoord + slow_pong_size,
        right: slow_pong_xcoord + slow_pong_size
    };
    let ai = {
        top: ai_ycoord,
        bottom: ai_ycoord + paddle_height,
    };
    // Whenever the updatePong function is changed, this statement needs to be adjusted.
    // Do not move paddle if pong is not moving in its direction.
    if (pong_xspeed < 0 && slow_pong_xspeed < 0)
        return;
    // AI checks which pong is moving it its direction and directs attention 
    // toward the one that is closest to the paddle.
    if (slow_pong_xspeed < 0 || pong.right > slow_pong.right) {
        if (pong.top <= ai.top)
            ai_ycoord -= ai_speed;
        else if (pong.bottom >= ai.bottom)
            ai_ycoord += ai_speed;
    }
    if (pong_xspeed < 0 || pong.right < slow_pong.right) {
        if (slow_pong.top <= ai.top)
            ai_ycoord -= ai_speed;
        else if (slow_pong.bottom >= ai.bottom)
            ai_ycoord += ai_speed;
    }

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
            pong_xspeed += .5;
        else { pong_xspeed -= .5; }

        if (pong_yspeed > 0)
            pong_yspeed += .5;
        else { pong_yspeed -= .5; }
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
function adjustDirection(direction, pong_type) {
    if (direction == "left") {
        if (pong_type == "basic")
            pong_xspeed = Math.abs(pong_xspeed);
        else { slow_pong_xspeed = Math.abs(slow_pong_xspeed); }
    }
    else {
        if (pong_type == "basic")
            pong_xspeed = -Math.abs(pong_xspeed);
        else { slow_pong_xspeed = -Math.abs(slow_pong_xspeed); }
    }
    if (pong_type == "basic")
        paddle_bounces++;
}

// Checks for all the collisions in the game.
function checkCollisions() {
    let pong = {
        left : pong_xcoord,
        right: pong_xcoord + pong_size,
        top: pong_ycoord,
        bottom: pong_ycoord + pong_size,
        moving: pong_xspeed > 0 ? "right" : "left"
    };
    let slow_pong = {
        left : slow_pong_xcoord,
        right: slow_pong_xcoord + slow_pong_size,
        top: slow_pong_ycoord,
        bottom: slow_pong_ycoord + slow_pong_size,
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

    // Check left and right of both pongs and screen.
    // If true, add a point and reset the pong location.
    if (pong.left <= game_xcoord || slow_pong.left <= game_xcoord) {
        if (++ai_score >= MAX_SCORE) {
            gameOver = true;
        }
        pauseGame();
        setTimeout(() => {
            pauseGame();
            resetPong();
            // TODO: resetPaddle();
        }, 1000);
    }
    if (pong.right >= game_xcoord + game_width || 
             slow_pong.right >= game_xcoord + game_width) {
        if (++player_score >= MAX_SCORE) {
            gameOver = true;
        }
        pauseGame();
        setTimeout(() => {
            pauseGame();
            resetPong();
        }, 1000);

    }
    // Check top and bottom of normal pong and screen.
    if (pong.top <= game_ycoord || pong.bottom >= game_ycoord + game_height) {
        pong_yspeed *= -1;
    }
    // Check top and bottom of slow pong and screen.
    if (slow_pong.top <= game_ycoord || slow_pong.bottom >= game_ycoord + game_height) {
        slow_pong_yspeed *= -1;
    }
    // Check right of player paddle and left of pong.
    // Ignores if not moving in paddle's direction.
    if (
            pong.moving === player.moving &&
            pong.left < player.right && 
            pong.right > player.left &&
            pong.top < player.bottom &&
            pong.bottom > player.top
        ) {
        adjustAngle(pong, player);
        adjustDirection(player.moving, "basic");
        if (paddle_bounces % SPEED_INCREMENT_COUNTER == 0)
            updatePongSpeed();
    }
    // Checks right of player paddle and left of the slower pong.
    if (
        slow_pong.moving === player.moving &&
        slow_pong.left < player.right && 
        slow_pong.right > player.left &&
        slow_pong.top < player.bottom &&
       slow_pong.bottom > player.top
    ) {
        adjustAngle(pong, player);
        adjustDirection(player.moving, "slow");
    }

    // Check left of AI paddle and right of pong.
    // Ignores if not moving in paddle's direction.
    if (
            pong.moving === ai.moving &&
            pong.right > ai.left && 
            pong.left < ai.right && 
            pong.top < ai.bottom &&
            pong.bottom > ai.top
        ) {
        adjustAngle(pong, ai);
        adjustDirection(ai.moving, "basic");
        if (paddle_bounces % SPEED_INCREMENT_COUNTER == 0)
            updatePongSpeed();
    }
    // Checks right of AI paddle and right of slower pong.
    // Ignores if not moving in paddle's direction.
    if (
        slow_pong.moving === ai.moving &&
        slow_pong.right > ai.left && 
        slow_pong.left < ai.right && 
        slow_pong.top < ai.bottom &&
        slow_pong.bottom > ai.top
    ) {
        adjustAngle(slow_pong, ai);
        adjustDirection(ai.moving, "slow");
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
        if (!paused) {
            moveAI();
            movePlayer();
            checkCollisions();
            updatePong();
        }
        redrawScreen();
        requestAnimationFrame(play);
    }
}
// Start of program
let beginGame = false;
drawPong(pong_size);
drawSlowPong(slow_pong_size);
resetPong();
pauseGame();
//console.log(`${pong_yspeed} and ${slow_pong_yspeed}`);
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
        mouse_pos = e.y - canvas.offsetTop - paddle_height / 2;
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

// Sets the mouse posiiton whenever it moves.
document.querySelector("html").addEventListener("mousemove", e => {
        mouse_pos = e.y - canvas.offsetTop - paddle_height / 2;
});