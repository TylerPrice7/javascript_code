let canvas = document.querySelector("#canvas");
// The canvas object that holds the Canvas API.
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
// First two parameters: top left corner coords. Final two: width and height.
ctx.fillRect(10, 10, 200, 100);
ctx.fillStyle = "red";
// Overlaps any previously made fills.
ctx.fillRect(0, 0, 10, 10);
// filling in soemthing that is bigger than the canvas size just fills up to
// the canvas size.

ctx.lineWidth = 5;
ctx.strokeStyle = "green";
ctx.strokeRect(215, 5, 75, 60)

// Creates multiple rectangle with stroke().
let x = 20, y = 20;
let width = 180;
let height = 80;
let colors = ["orange", "yellow", "green", "red", "white"];
for (let color = 0; color < 5; color++) {
    ctx.strokeStyle = colors[color];
    ctx.strokeRect(x, y, width, height);
    x += 10;
    y += 10;
    width -= 20; 
    height -= 20;
}

// Creates a triangle using lines.
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.moveTo(50, 115);
ctx.lineTo(115, 200);
ctx.lineTo(175, 115);
ctx.lineTo(50, 115);
ctx.fill();

// Creates a circle using stroke().
ctx.strokeStyle = "orange";
ctx.beginPath();
// X-Coord, Y-Coord for center of circle. 
// Radius in pixels, starting angle & ending angle. 
// T/F: counterclockwise/clockwise.
ctx.arc(250, 150, 50, 0, Math.PI * 2, false);
ctx.stroke();
