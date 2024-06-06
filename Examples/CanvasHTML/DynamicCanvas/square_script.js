let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let opacity = 1;
let rgb_red = 0;
let rgb_blue = 0;
let rgb_green = 0;
let square_dim = 10;

function drawSquare(x, y) {
    ctx.fillStyle = `rgba(${rgb_red}, ${rgb_green}, ${rgb_blue}, ${opacity})`;
    ctx.fillRect(x, y, square_dim, square_dim);
    ctx.fill();
}

canvas.addEventListener("click", e => {
    drawSquare(e.offsetX, e.offsetY);
});

document.querySelector("#clear").addEventListener("click", e => {
    ctx.clearRect(0, 0, width, height);
});

document.querySelector("#opacity").addEventListener("change", e => {
    opacity = e.target.value;
});

document.querySelector("#rgb-red").addEventListener("change", e => {
    rgb_red = e.target.value;
});

document.querySelector("#rgb-green").addEventListener("change", e => {
    rgb_green = e.target.value;
});

document.querySelector("#rgb-blue").addEventListener("change", e => {
    rgb_blue = e.target.value;
});

document.querySelector("#dim").addEventListener("change", e => {
    square_dim = e.target.value;
});