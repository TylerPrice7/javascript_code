let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let x = 0;
let reverse = false;
let y = 10;

function drawCircle(x, y) {
    ctx.fillStyle = "rgb(0, 128, 255)";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fill();
}

function update() {
    if (x == width)
        reverse = true;
    else if (x == 0)
        reverse = false;
    if (reverse)
        x -= 1;
    else { x += 1; }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    drawCircle(x, y);
}

setInterval(() => {
    update();
    draw();
}, 10);
