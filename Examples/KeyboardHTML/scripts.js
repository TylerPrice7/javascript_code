// In the HTML file, we created a part of the webpage for a box (using <div> and an id).
// Using the specifications in the the css file for it's creation, we can move it around
// by using the keydown event. Everytime a WASD key is pressed, we add/subtract values from
// our X/Y coordinates. Then, we add them to the current box's styles.
let box_movement = document.querySelector("#box");
let currentX = 0;
let currentY = 0;
document.querySelector("html").addEventListener("keydown", e => {
    if (e.repeat)
        return;
    if (e.key == "w")
        currentY -= 20;
    else if (e.key == "a")
        currentX -= 20;
    else if (e.key == "s")
        currentY += 20;
    else if (e.key == "d")
        currentX += 20;

    box_movement.style.left = currentX + "px";
    box_movement.style.top = currentY + "px";
});