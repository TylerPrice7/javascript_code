// Implement function that uses the method "every" that takes an array and a
// predicate function.

function every(array, test) {
    for (let value of array) {
        if (!test(value))
            return false;
    }
    return true;
}

if (every([1, 3, 5], n => n < 10)) {
    console.log("True");
}
else console.log("False");

if (every([2, 4, 16], n => n < 10)){
    console.log("True");
}
else console.log("False");

if (every([], n => n < 10)) {
    console.log("True");
}
else console.log("False");