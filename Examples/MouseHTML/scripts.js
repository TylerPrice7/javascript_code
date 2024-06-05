// This utilizes the mousemove event. Everytime the mouse is moved, we call
// this function and update the box's style.
// Reminder that the coordinates of a html object needs to have units (px).
document.querySelector("html").addEventListener("mousemove", (e) => {
    let box_movement = document.querySelector("#box");
    box_movement.style.left = e.clientX + "px";
    box_movement.style.top =  e.clientY + "px";
});