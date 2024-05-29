// Creates a chessboard with the given size.
chessboard = function(size) {
    let i = "";
    let j = "";
    // Creates string for first row
    for (; i.length < size;) {
        if (i.length % 2 == 0)
            i += " ";
        else i += "#";
    }
    // Creates string for second row
    for (; j.length < size;) {
        if (j.length % 2 == 0)
            j += "#";
        else j += " ";
    }
    // Prints the previously created rows, every other row
    for (k = 0; k < size; k++) {
        if (k % 2 == 0)
            console.log(i);
        else console.log(j);
    }
}
chessboard(8);