function isEven(number) {
    if (number == 0)
        return true;
    else if (number == 1)
        return false;
    if (number < 0)
        return isEven(number * -1);
    return isEven(number-2);
}
let test_num1 = 202;
if (isEven(test_num1))
    console.log(`${test_num1} is even.`);
else console.log(`${test_num1} is odd.`);

let test_num2 = 305;
if (isEven(test_num2))
    console.log(`${test_num2} is even.`);
else console.log(`${test_num2} is odd.`);

let test_num3 = -176;
if (isEven(test_num3))
    console.log(`${test_num3} is even.`);
else console.log(`${test_num3} is odd.`);