// Here is some basic JavaScript syntax

// Variables (Dynamically Typed)
// JavaScript uses "let", because "var" is a global scope compared to "let", which is block scope.
// This association is called a binding (Associate a name with a value).
let apple = 3;
apple = "string";
let pineapple = 5;
pineapple = 7;

// Constants simply use "const" as their type.
const ripeApple = 20;

// Operations (Same as Java)
pineapple++;
++apple;
pineapple += 7;
apple -= 3;
apple ** 5; // Exponent

// Strings
let greeting = "Hello, World!";
let greeting2 = "Hello" + " " + "World!";
let greeting3 = greeting.slice(0, 5) +  " " + greeting.slice(7, 13);
let greeting4 = greeting3.toLowerCase();
let greeting5 = "     Hello, World!   ".trim();
let length = greeting5.length;
// .includes(otheerStr);
// .padStart(num, char) // Pads with given characters until length is at num.
// .repeat(count) // Duplicates line given 'count' number of times.
// JavaScript also uses escape character \ for ', ", and \ 

// JavaScript uses zero-indexing.
alphabet = greeting2[0];

// Template Literals
// Similiar to f-strings. They use quote " ` ${} ` " syntax.
`Here is the 5th greeting: ${greeting5}. Now, here is the length of it after
  the function .trim() is used on it: ${length}. You can also put expressions
  into the curly brackets, like so: (5 + 8 - 3) / 2 = ${(5+8-3)/2}.
  It is also important to note that any new line with 'enter' is also done by
  the quotes.`;

/* Undefined and Null types
    While they both mean that the variable/return type does not have a value,
    null means that it is specifially null for a reason, while
    undefined means it simply has not been set to a value.
    For deliberate acions, it is better to use null for readibility.
*/ 

/* Logical and Comparison Operators
    Below are the differences with Javascript
    Equality/Inequality operators: === and !== (work the same as ==/!= in Java)
    Logical Operators: && and || and ??
        - False values include undefined, null, 0, and empty strings.
        - Truth values include non-zero numbers and non-empty strings.
        - If true, && returns the second parameter. Otherwise, returns first parameter.
        - If true, || returns the first parameter. Otherwise, returns second parameter.
        - The ?? operator only returns the second parameter if the first is null/undefined.
*/
    // && operator example 
    let score = 0;
    //score && alert(`Your score is ${score}!`);
    ++score;
    //score && alert(`Your score is ${score}!`);
    // || Operator example
    let names;
    names = names || "No name provided"; names;

// Type Coercion
// A way to check the equality/inequality of values with different types.
// These will convert them into identical types.
"1" == 1; // True
undefined = null; // True
undefined == "false"; // False
"" == 0; // True
"" == false; // True
0 == false; // True
0 != false; // False
// In addition, there is the unary plus operator. 
// If applied to a non-number, it converts it to a number. Same as casting with Number()
let apples = "2";
let oranges = "3";
console.log(apples + oranges); // 23
console.log(+apples + +oranges); // 5


// Array (Dynamic)
let primes = [1, 2, 4, 5, 7, 11, 13, 17, 19, 23];
primes[20]; // Does not crash when accessing, it returns undefined
primes[2] = 3;
// Multi-Dimensional - this returns the length (3)
let ticTacToe = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
console.log(ticTacToe);

let languages = ["Python"];               // Make sure that the compiler knows that this is an array (brackets!).
languages.push("C++");                    // Returns the length of the array.
languages.push("Spanish");                // Pushes to the end.
languages.unshift("JavaScript");          // Pushes to the front.
languages.unshift("Japanese");
let moreLanguages = [languages.shift()];  // Pops at the front, returns the popped item.
moreLanguages.push(languages.pop());      // Pops at the end.
console.log(languages);
console.log(moreLanguages);

let allLanguages = languages.concat(moreLanguages); // Adds both arrays together, leaving originals unchanged.
allLanguages.indexOf("Japanese"); // Will show the index of the first found value.
allLanguages.indexOf("German");   // Will give -1 if not found.

// .includes(elem);         Returns true/false depending if value is found.
// .slice(start, end);      Returns a new array from start index to end index (excludes)
// .reverse();              Modifies the original array by reversing order of values.
// .sort();                 Modifies the original array by sorting values in ascending order.
// .splice(index, count);   Modifies the original array by removing count elements, starting at index. 

// Creates a string of the array. By default, it adds a comma between each value.
let languageString = allLanguages.join(" and "); 
console.log(languageString);

// Objects (dictionaries)
let videoGameConsole = {
    console : "Nintendo Switch",
    "video game" : "Super Mario Odyssey",
    "charge" : 37
};
console.log(videoGameConsole);

videoGameConsole["video game"] = "Super Mario Wonder";
console.log(videoGameConsole.console);
console.log(videoGameConsole["video game"]);
// Note: you need to call the Object class to get lists of the keys/values
console.log(Object.keys(videoGameConsole));
console.log(Object.values(videoGameConsole));
console.log(Object.entries(videoGameConsole));

let videoGameController = {
    type : "Pro Controller",
    charging : "USB-C",
};

// Combine objects. First parameter is the target, additional paras are sources.
let videoGameParts = {};
videoGameParts = Object.assign(videoGameParts, videoGameConsole, videoGameController);
console.log(videoGameParts);

// Printing with JSON.stringify(Object object)
let nested = {
    name: "Outer",
    content: {
      name: "Middle",
      content: {
        name: "Inner",
        content: "..."
      }
} };
// Second parameter is for a replacer function
// Third parameter is for how many spaces between levels + newlines after braces.
let nestedJSON = JSON.stringify(nested, null, 2);
console.log(nestedJSON)

// Conditional Statements
/*
    If statements are the same as in Java (if... if else... else...)
    While statements are the same as in Java (while...)
    For loop statements are the same as in Java (for i in ...)
*/

// For Each loops are written as For... Of loops
let colors = ["Red", "Green", "Blue"];
   for (let color of colors) {
     console.log(`${color} is a color.`);
    }

// For In loops are specifically for iterating through dictionaries
let person = {
  "first name": "Mike",
  "last name": "Long",
  "age": 24
};
for (let key in person) {
  console.log(`My ${key} is ${person[key]}.`);
}