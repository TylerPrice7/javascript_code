// Here is some additional JavaScript syntax.

// Functions (Dynamically typed)
function helloName(name) {
    return `Hello, ${name}!`;
}
function helloWorld() {
    console.log("Hello, world!!");
}
console.log(helloName("world").toUpperCase());
// DEFINITION: Callbacks - when a function is passed as an arguement
// Example: using the setTimeout() command to delay the calling of a function. (not for returning functions)
let timeoutID = setTimeout(helloWorld, 1000);
console.log(`Timeout ID: ${timeoutID}`);
//clearTimeout(timeoutID); // Is able to clear whatever is in the timeout.

// Function Expressions
// Can also be written as: let convertStringToNum = function funcName(number) { ... }
let convertStringToNum = function(number) {
    switch (+number) {
        case (1):
            return "one";
        case (2):
            return "two";
        case (3):
            return "three";
        case (4):
            return "four";
        case (5):
            return "five";
        default:
            throw EvalError;
    }
}
console.log(convertStringToNum("3"));

// Arrow Functions (you can put parameters into the parenthesis)
currentDateTime = () => {
    date = new Date();
    console.log(`The date is ${date}.`);
}
currentDateTime();
// If you only have one parameter, you don't need paranthesis.
// If you have a very simple algorithm that you want returned, 
//   you can also omit the braces and the return statement.
cubedNum = x => x**3;
console.log(`The cube of 5 is: ${cubedNum(5)}`);

// Rest Parameters
// These allow for optional parameters. Each is put into a single array.
function sum(...numbers) {
    let total = 0;
    for (let number of numbers) {
      total += number;
    }
    return total;
  }
console.log(`Total Sum: ${sum(1, 2, 3, 4, 5, 6)}`);

// Higher Order Functions - a function that takes another function as an argument.
// .find() array function
let games = ["Super Mario Wonder", "Super Mario RPG", "Lego Ninjago", "Bloodborne", "Switch Fire", "Hollow Knight"]
console.log(games.find(index => index.includes("Lego")));
// .filter() array function
console.log(games.filter(index => index.includes("Super")));
// .map() array function
let playability = games.map(x => x + " for Nintendo Switch");
console.log(playability);
// Example of .map with a dictionary (finding all keys)
let cheeseList = [
    {name: "Swiss", price: 1},
    {name: "Pepperjack", price: 3},
    {name: "Sharp Chedder", price: 2}
  ];
let prices = cheeseList.map(item => item.price);
console.log(`Prices of cheese: ${prices}`);

// Custom Function with Callbacks
function multiCall(calls, callback) {
    for (let call = calls; call >= 0; call--) {
        callback(call);
    }
}
let blastoffCountdown = (second) => {
    if (second > 0)
        console.log(`Blastoff in ${second}..`);
    else if (second == 0)
        console.log("Blastoff!");
}
multiCall(5, blastoffCountdown);

// Custom Functions that return Functions
function makeMadLib(prefix, suffix) {
    return function (text) {
        return "The " + prefix + " " + text + " " + suffix + ".";
    }
}
let animalMadLip = makeMadLib("silly", "waddled");
console.log(animalMadLip("goose"));

// Classes
// Variables inside of the class are initialized inside of the constructor,
// and start with "this" and the method operator ".".
// Methods inside of the class do not start with the function keyword.
class Player {
    constructor(startX=0, startY=0) {
        this.x = startX;
        this.y = startY;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}
let player1 = new Player(0,0);
console.log(`Player1 activated. Spawning at (${player1.x},${player1.y})`);

class Animal {
    constructor(animalType, animalEnvironment, animalDiet) { // Constructor
        this.type = animalType;
        this.environment = animalEnvironment;
        this.diet = animalDiet;
    }
    printDescription() {
        console.log(`This is a ${this.type} which lives off ${this.diet} in the ${this.environment}.`);
    }
}
class Bear extends Animal { // Inheritence. Note the extends keyword
    constructor(animalEnvironment, animalDiet) {
        super("bear", animalEnvironment, animalDiet); // Use the super keyword to use the superclass' constructor
        this.hibernating = false;
    }
    roar() { console.log("Roar!! The opponent retreated!")}; // Aditional functions not found in superclass.
    is_hibernate() { return this.hibernating; }
    hibernate() {
        console.log("Time to snooze for the winter...");
        this.hibernate = true;
    }
    awaken() {
        console.log("Spring is here: the bear has awaken!");
        this.hibernate = false;
    }
}
// Can still use superclass. To make abstract, set constructor to throw an error
let fish = new Animal("fish", "salt-water ocean", "plankton");
fish.printDescription();
// Inherited class
let bear = new Bear("spruce forest", "salt-water fish"); 
bear.roar();
bear.printDescription();
bear.hibernate();
bear.awaken();

// Prototype-Based Inheritance (older version of classes)
function Dog(name) {
    this.name = name;
}
Dog.prototype.pet = function() {console.log(`Woof! ${this.name} looks very happy!`)};
let doggy = new Dog("Annabelle");
doggy.pet();
// Overloading method
let another_doggy = new Dog("Riley");
another_doggy.pet = function() {console.log(`Wahowahowahowaho! ${this.name} just shook, releasing all of it's loose hair!`);}
another_doggy.pet();

// Property Chaining
// First, we check current prototype's methods. 
// Then, we check inherited methods, and move to Object.prototype to check 
// if it is there, or until it hits [[Prototype]].
// Does not work with classes. Only prototype-based inheritance.
console.log(another_doggy.hasOwnProperty("pet"));
console.log(another_doggy.hasOwnProperty("badFunction"));