// Represents a vector in 2D space. Has two methods that allow for addition and
// subtraction of vectors, and a getter for the length of an vector from (0,0).

class Vec {
    constructor(x_coord, y_coord) {
        this.x_coord = x_coord;
        this.y_coord = y_coord;
    }
    plus(vector) {
        let new_vector = new Vec();
        new_vector.x_coord = this.x_coord + vector.x_coord;
        new_vector.y_coord = this.y_coord + vector.y_coord;
        return new_vector;
    }
    minus(vector) {
        let new_vector = new Vec();
        new_vector.x_coord = this.x_coord - vector.x_coord;
        new_vector.y_coord = this.y_coord - vector.y_coord;
        return new_vector;
    }
    get length() {
        let length_squared = this.x_coord ** 2 + this.y_coord ** 2
        return Math.sqrt(length_squared);
    }
}
let vector1 = new Vec(1,2);
console.log(vector1.plus(new Vec(2, 3)));
console.log(vector1.minus(new Vec(2, 3)));

console.log(new Vec(3, 4).length);
