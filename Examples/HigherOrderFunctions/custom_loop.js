// Creates a higher-order function that takes in a value, a test function,
// an update function, and a body function to create a loop just like a for loop.

function loop(start, test, update, body) {
    for (let i = start; test(i); i = update(i)) {
        body(i);
    }
}
loop(3, n => n > 0, n => n - 1, console.log);

// Bubble Sort
let array = ["apple", "pineapple", "banana", "blueberry", "pomegranate", "razzberry", 
        "mango", "kiwi", "watermelon", "tomato", "grapes", "strawberry", "lemon", "oranges",
    "avocado", "peach", "lychee", "cantelope", "guava", "cherries", "plum", "lime"];
loop(0, i => i < array.length, i => i += 1, i => {
    loop(0, j => j < array.length, j => j += 1, j => {
    if (array[j] > array[j+1])
        swapNext(array, j);
    });
});

function swapNext(array, index) {
    let temp = array[index];
    array[index] = array[index+1];
    array[index+1] = temp;
}
console.log(array);