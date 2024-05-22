// Creating our own Math.min function
min = (num1, num2) => {
    return (num1 < num2 ? num1 : num2);
}
console.log(`The minimum is: ${min(0, 10)}`);
console.log(`The minimum is: ${min(0, -10)}`);