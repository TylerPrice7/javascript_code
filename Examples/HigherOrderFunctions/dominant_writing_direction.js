// Returns the string with the dominant direction 
// ltr=left to right, rtl=right to left, ttb=top to bottom
function dominantDirection(text) {
    let counted = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    if (counted.length == 0) { return "ltf"; }

    return counted.reduce((a, b) => (a.count > b.count ? a : b).name);
}
  
console.log(dominantDirection("Hello!")); // ltr
console.log(dominantDirection("Hey, مساء الخير")); // rtl