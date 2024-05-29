// Create two reversing functions: one that returns a new array, and a second
// that modifies the given array and returns it.

function reverseArray(array) {
    let new_array = [];
    for (let i = array.length-1, j=0; i >= 0; i--, j++) {
        new_array[j] = array[i];
    }
    return new_array;
}

function reverseArrayInPlace(array) {
    for (let i = 0, j = array.length - 1; Math.floor(i < array.length / 2); i++, j--) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5, 6];
console.log(`Original array: ${arrayValue}`);
reverseArrayInPlace(arrayValue);
console.log(`New array: \t${arrayValue}`);

let arrayValue2 = ["A", "B", "C", "D"];
console.log(`Original array: ${arrayValue2}`);
reverseArrayInPlace(arrayValue2);
console.log(`New array: \t${arrayValue2}`);