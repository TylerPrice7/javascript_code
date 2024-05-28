// Use the reduce method and the concat method to "flatten" a series of arrays
// into a single array.
let arrays = [[1,2,3], [4, 5], [6], [7, [8, 9], 10]];
console.log(arrays);
/*  Explanation:
    Reduce needs 3 pieces of information.
    1. What array it is working on (found by the method call)
    2. What function is used to reduce (first para.)
    3. What the reduced array begins with (second para.)
    In this case, the reduced array starts with an empty array.
    The function takes two parameters: new_array (that is, the current built one)
        and currentValue.
    With those, the function uses the concat method to add everything to one array.
*/
let flattened_array = arrays.reduce((built_array, currentValue) => built_array.concat(currentValue), []);
// For each extra layer, you need to call the function that many times.
flattened_array = flattened_array.reduce((built_array, currentValue) => built_array.concat(currentValue), []);

console.log(flattened_array);
