// 1. Створення інтерфейсу з обов'язковими та опціональними властивостями
interface Animal {
    name: string;
    weight: number;
    color?: string;
    wingSpan?: number;
    finCount?: number;
    move(): void;
}

class Cat implements Animal {
    name: string;
    weight: number;
    color: string;

    constructor(name: string, weight: number, color: string) {
        this.name = name;
        this.weight = weight;
        this.color = color;
    }

    move(): void {
        console.log(`${this.name} (Кіт) біжить на чотирьох лапах.`);
    }
}

class Bird implements Animal {
    name: string;
    weight: number;
    wingSpan: number;

    constructor(name: string, weight: number, wingSpan: number) {
        this.name = name;
        this.weight = weight;
        this.wingSpan = wingSpan;
    }

    move(): void {
        console.log(`${this.name} (Птах) літає, використовуючи крила розмахом ${this.wingSpan} см.`);
    }
}

class Fish implements Animal {
    name: string;
    weight: number;
    finCount: number;

    constructor(name: string, weight: number, finCount: number) {
        this.name = name;
        this.weight = weight;
        this.finCount = finCount;
    }

    move(): void {
        console.log(`${this.name} (Риба) плаває під водою, використовуючи ${this.finCount} плавників.`);
    }
}

const myCat = new Cat("Мурзік", 4, "Рудий");
const myBird = new Bird("Кеша", 0.5, 25);
const myFish = new Fish("Немо", 0.2, 5);

myCat.move();
myBird.move();
myFish.move();