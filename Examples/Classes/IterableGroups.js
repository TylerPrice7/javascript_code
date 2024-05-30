// Alters the code from Group.js so that the Group class is iterable.

class Group {
    // Private members have to be initialized outside of the constructor.
    #group = [];
    // Static function can be used without initalizing a class.
    // This takes an array and returns the group equivalent.
    static from (values) {
        let group = new Group();
        for (let item of values)
            group.add(item);
        return group;
    }
    add(value) {
        if (!this.has(value))
            this.#group.push(value);
    }
    delete(value) {
        this.#group = this.#group.filter(v => v !== value);
        return this.#group;
    }
    has(value) {
        return this.#group.includes(value);
    }
    // This is for our iterator class.
    [Symbol.iterator]() {
        return new GroupIterator(this.#group);
    }
}

class GroupIterator {
    #group = [];
    #position;
    constructor(values) {
        this.#group = values;
        this.#position = 0;
    }
    // When iterated, it returns a dictionary with "value" and "done" keys.
    // The "done" key tells the compiler if the iteration is complete 
    // (true for complete, false for not complete).
    next() {
        let result = this.#group;
        if (this.#position < this.#group.length)
            result = {value : this.#group[this.#position], done : false};
        else { 
            this.#position = 0;
            return {value : null, done : true }
        }
        this.#position++;
        return result;
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }