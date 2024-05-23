// Write a function that converts an array into a list structure (linked list, dictionary format)
// Then, write a function that converts a list into an array.

function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {
            value : array[i],
            rest : list
        }
    }
    return list;
}

function listToArray(list) {
    let array = [];
    while (list["rest"] != null) {
        array.push(list["value"]);
        list = list["rest"];
    }
    array.push(list["value"]);
    return array;
}

// Takes an element and a list and creates a new list with the element added
// to the front of the list.
function prepend(element, list) {
    new_list = {
        value : element,
        rest : list
    };
    return new_list;
}

// Takes a list and a number and returns the element at the given position in the list.
function nth(list, depth) {
    for (let i = 0; i < depth; i++) {
        if (list)
            list = list["rest"];
        else { break; }
    }
    if (list)
        return list["value"];
    else { return null; }
}

array1 = [1, 2, 3, 4, 5];
console.log(`Array: \t\t${array1}`);
let list = arrayToList(array1);
console.log(`To List: \t${JSON.stringify(list)}`);

console.log(`List: \t\t${JSON.stringify(list)}`);
console.log(`To Array: \t${listToArray(list)}`);

console.log(JSON.stringify(prepend(0, prepend(1, prepend(2, prepend(3, prepend(4, prepend(5, null))))))));

console.log(`Value at array[1]: ${nth(arrayToList([10, 20, 30]), 2)}`);


