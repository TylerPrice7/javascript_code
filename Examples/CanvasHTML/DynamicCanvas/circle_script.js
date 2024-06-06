let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let opacity = 1;
let rgb_red = 0;
let rgb_green = 0;
let rgb_blue = 0;
let radius = 10;

function drawCircle(x, y) {
    ctx.fillStyle = `rgba(${rgb_red}, ${rgb_green}, ${rgb_blue}, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}

canvas.addEventListener("click", e => {
    drawCircle(e.offsetX, e.offsetY);
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

document.querySelector("#radius").addEventListener("change", e => {
    radius = e.target.value;
});