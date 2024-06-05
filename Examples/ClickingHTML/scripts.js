let heading = document.querySelector("#main-heading")
    .addEventListener("click", () => {
        console.log("The heading has been clicked!");
    });
    
let main_paragraph = document.querySelector("#main-paragraph")
    .addEventListener("click", () => {
        console.log("The top paragraph was clicked!");
    });

// Event Bubbling. An event triggers all events related to its ancestors.
document.querySelector("em")
    .addEventListener("click", () => {
        console.log("The em element was clicked! Which, in turn, means the heading was clicked!");
    })

document.querySelector("body")
    .addEventListener("click", () => {
        console.log("The body element was clicked!");
    });


// We add words to an empty string (or non-empty string) that we update whenever
// a new word is clicked.
let word_document = [];
let word_list = document.querySelector("#word-list");
let sentence = document.querySelector("#sentence");
word_list.addEventListener("click", (event) => {
        let word = event.target.textContent;
        word_document.push(word + " ");
        sentence.textContent += word;
        sentence.textContent += " ";
    });