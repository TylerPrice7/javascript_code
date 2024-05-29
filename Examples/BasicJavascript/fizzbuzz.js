/* 
    If a number is divisible by 3 AND 5, print FizzBuzz.
    If a number is divisble by 3 and not 5, print Fizz.
    If a number is divisble by 5 and 3, print Buzz.
*/
for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0)
        console.log("FizzBuzz");
    else if (i % 3 == 0)
        console.log("Fizz");
    else if (i % 5 == 0)
        console.log("Buzz");
}