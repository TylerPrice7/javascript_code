// Create a range function that, given a start and an end, returns an array
// with all of the numbers from start and including end. In addition, allow
// for an optional step parameter.

// Then, create a sum function that, given an array, returns all of the 
// numbers in the array added up.

function range(start, end, step=1) {
    let array = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            array.push(i);
        }
    }
    else if (step < 0) {
        for (let i = start; i >= end; i += step) {
            array.push(i);
        }
    }
    return array;
}

function sum(array) {
    let sum = 0;
    for (number of array) {
        sum += number;
    }
    return sum;
}
let array = range(5, 2, -1);
console.log(`Range: ${array}`);
console.log(`Sum: ${sum(array)}`);
let array2 = range(1, 10, 2);
console.log(`Range: ${array2}`);
console.log(`Sum: ${sum(array2)}`);