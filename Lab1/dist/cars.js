"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    brand;
    year;
    vinCode;
    constructor(brand, year, vinCode) {
        this.brand = brand;
        this.year = year;
        this.vinCode = vinCode;
    }
    getVin() {
        return this.vinCode;
    }
}
class Toyota extends Car {
    model;
    isHybrid;
    constructor(model, year, vinCode, isHybrid) {
        super("Toyota", year, vinCode);
        this.model = model;
        this.isHybrid = isHybrid;
    }
    displayInfo() {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, Гібрид: ${this.isHybrid ? 'Так' : 'Ні'}, VIN: ${this.getVin()}`);
    }
}
class BMW extends Car {
    model;
    mSportPackage;
    constructor(model, year, vinCode, mSportPackage) {
        super("BMW", year, vinCode);
        this.model = model;
        this.mSportPackage = mSportPackage;
    }
    displayInfo() {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, M-Пакет: ${this.mSportPackage ? 'Є' : 'Немає'}, VIN: ${this.getVin()}`);
    }
}
class Audi extends Car {
    model;
    quattro;
    constructor(model, year, vinCode, quattro) {
        super("Audi", year, vinCode);
        this.model = model;
        this.quattro = quattro;
    }
    displayInfo() {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, Повний привід (Quattro): ${this.quattro ? 'Так' : 'Ні'}, VIN: ${this.getVin()}`);
    }
}
const toyota1 = new Toyota("Camry", 2022, "JT123456789", true);
const toyota2 = new Toyota("Corolla", 2020, "JT987654321", false);
const bmw1 = new BMW("M5", 2023, "WBA11223344", true);
const bmw2 = new BMW("X3", 2019, "WBA99887766", false);
const audi1 = new Audi("A6", 2021, "WAU55667788", true);
const audi2 = new Audi("Q7", 2024, "WAU11229900", true);
console.log("--- Моделі Toyota ---");
toyota1.displayInfo();
toyota2.displayInfo();
console.log("\n--- Моделі BMW ---");
bmw1.displayInfo();
bmw2.displayInfo();
console.log("\n--- Моделі Audi ---");
audi1.displayInfo();
audi2.displayInfo();
//# sourceMappingURL=cars.js.map