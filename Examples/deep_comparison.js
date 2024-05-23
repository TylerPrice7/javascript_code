// Write a function that takes two values and returns true only 
// if they are the same value or are objects with the same properties.
// This ignores the possibility of arrays.

function deepEqual(object1, object2) {
    // Checks if the types are the same.
    if (typeof(object1) != typeof(object2)) return false;
    // If the types are number, then we can simply check with the === operator. 
    if (typeof(object1) == "number") {
        if (object1 === object2)
            return true;
        else { return false; }
    }
    // Type is object.
    let obj1_keys = Object.keys(object1);
    let obj2_keys = Object.keys(object2);
    if (obj1_keys.length != obj2_keys.length)
        return false;
    for (let i = 0; i < obj1_keys.length; i++) {
        // We check if the keys and values are the same.
        if (obj1_keys[i] !== obj2_keys[i] && object1[obj1_keys[i]] !== object2[obj2_keys[i]])
            return false;
        // Checks if the value holds another object. If so, we need to do another deep check.
        if (typeof(object1[obj1_keys[i]]) == "object" && object1[obj1_keys[i]] != null) {
            if (!deepEqual(object1[obj1_keys[i]], object2[obj2_keys[i]]))
                return false;
        }
    }
    return true;
}
if (deepEqual(291, [3, 4, 5]))
    console.log("291 and [3, 4, 5] are equal.");
else
    console.log("291 and [3, 4, 5] are not equal.");

let obj = {here: {is: "an"}, object: 2};
if (deepEqual(obj, obj))
    console.log("The two objects are the same.");
else { console.log("The two objects are not the same."); }

if (deepEqual(obj, {here: 1, object: 2}))
    console.log("The two objects are the same.");
else { console.log("The two objects are not the same."); }

if (deepEqual(obj, {here: {is: "an"}, object: 2}))
    console.log("The two objects are the same.");
else { console.log("The two objects are not the same."); }


