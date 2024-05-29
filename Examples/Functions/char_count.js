// Counts the number of a given character that is in a given string.
function charCount(string, character){
    let count = 0;
    for (let char = 0; char < string.length; char++) {
        if (character == string[char])
            count++;
    }
    return count;
}
console.log(`Number of k's in kakkerlak: ${charCount("kakkerlak", "k")}`);
console.log(`Number of B's in BOB: ${charCount("BOB", "B")}`);