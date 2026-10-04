"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return Math.PI * (this.radius ** 2);
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    scale(factor) {
        this.radius *= factor;
    }
}
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }
}
class Triangle {
    a;
    b;
    c;
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getPerimeter() {
        return this.a + this.b + this.c;
    }
    getArea() {
        const p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }
    scale(factor) {
        this.a *= factor;
        this.b *= factor;
        this.c *= factor;
    }
}
// 4. Створення масиву та обчислення загальних показників
const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
];
let totalArea = 0;
let totalPerimeter = 0;
shapes.forEach(shape => {
    totalArea += shape.getArea();
    totalPerimeter += shape.getPerimeter();
});
console.log(`Загальна площа фігур: ${totalArea.toFixed(2)}`);
console.log(`Загальний периметр фігур: ${totalPerimeter.toFixed(2)}`);
// Демонстрація масштабування
console.log("\nМасштабуємо всі фігури у 2 рази...");
shapes.forEach(shape => shape.scale(2));
let newTotalArea = 0;
let newTotalPerimeter = 0;
shapes.forEach(shape => {
    newTotalArea += shape.getArea();
    newTotalPerimeter += shape.getPerimeter();
});
console.log(`Нова загальна площа: ${newTotalArea.toFixed(2)}`);
console.log(`Новий загальний периметр: ${newTotalPerimeter.toFixed(2)}`);
//# sourceMappingURL=shapes.js.map