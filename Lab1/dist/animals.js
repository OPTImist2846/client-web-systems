"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cat {
    name;
    weight;
    color;
    constructor(name, weight, color) {
        this.name = name;
        this.weight = weight;
        this.color = color;
    }
    move() {
        console.log(`${this.name} (Кіт) біжить на чотирьох лапах.`);
    }
}
class Bird {
    name;
    weight;
    wingSpan;
    constructor(name, weight, wingSpan) {
        this.name = name;
        this.weight = weight;
        this.wingSpan = wingSpan;
    }
    move() {
        console.log(`${this.name} (Птах) літає, використовуючи крила розмахом ${this.wingSpan} см.`);
    }
}
class Fish {
    name;
    weight;
    finCount;
    constructor(name, weight, finCount) {
        this.name = name;
        this.weight = weight;
        this.finCount = finCount;
    }
    move() {
        console.log(`${this.name} (Риба) плаває під водою, використовуючи ${this.finCount} плавників.`);
    }
}
const myCat = new Cat("Мурзік", 4, "Рудий");
const myBird = new Bird("Кеша", 0.5, 25);
const myFish = new Fish("Немо", 0.2, 5);
myCat.move();
myBird.move();
myFish.move();
//# sourceMappingURL=animals.js.map