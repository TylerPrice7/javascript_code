// A map data structure, but without duplicate values. In JavaScript, this
// can be called use the data structure Set.

class Group {
    #group = [];
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
}

let group = Group.from([10, 20]);
if (group.has(10))
    console.log("True");
else { console.log("False"); }
if (group.has(30))
    console.log("True");
else { console.log("False"); }
group.add(10);
group.delete(10);
if (group.has(10))
    console.log("True");
else { console.log("False"); }