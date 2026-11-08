"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    brand; // марку можна читати будь-де
    year; // доступно лише в Car та похідних класах
    vinCode; // доступно лише всередині Car
    constructor(brand, year, vinCode) {
        this.brand = brand;
        this.year = year;
        this.vinCode = vinCode;
    }
    // Похідні класи не мають прямого доступу до vinCode, лише через цей метод
    getVin() {
        return this.vinCode;
    }
}
class Toyota extends Car {
    model; // публічна інформація про модель
    isHybrid; // характеристика, доступна і нащадкам Toyota
    dealerPrice; // внутрішня ціна дилера — лише для цього класу
    constructor(model, year, vinCode, isHybrid, dealerPrice) {
        super("Toyota", year, vinCode);
        this.model = model;
        this.isHybrid = isHybrid;
        this.dealerPrice = dealerPrice;
    }
    displayInfo() {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, Гібрид: ${this.isHybrid ? "Так" : "Ні"}, ` +
            `Ціна дилера: $${this.dealerPrice}, VIN: ${this.getVin()}`);
    }
}
class BMW extends Car {
    model;
    mSportPackage;
    serviceKey; // секретний сервісний ключ
    constructor(model, year, vinCode, mSportPackage, serviceKey) {
        super("BMW", year, vinCode);
        this.model = model;
        this.mSportPackage = mSportPackage;
        this.serviceKey = serviceKey;
    }
    displayInfo() {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, M-Пакет: ${this.mSportPackage ? "Є" : "Немає"}, ` +
            `Сервісний ключ: ${this.serviceKey}, VIN: ${this.getVin()}`);
    }
}
class Audi extends Car {
    model;
    quattro;
    mileage; // пробіг змінюється лише методами класу
    constructor(model, year, vinCode, quattro, mileage) {
        super("Audi", year, vinCode);
        this.model = model;
        this.quattro = quattro;
        this.mileage = mileage;
    }
    drive(km) {
        this.mileage += km;
    }
    displayInfo() {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, Повний привід (Quattro): ${this.quattro ? "Так" : "Ні"}, ` +
            `Пробіг: ${this.mileage} км, VIN: ${this.getVin()}`);
    }
}
const toyota1 = new Toyota("Camry", 2022, "JT123456789", true, 32000);
const toyota2 = new Toyota("Corolla", 2020, "JT987654321", false, 21000);
const bmw1 = new BMW("M5", 2023, "WBA11223344", true, "BMW-SK-001");
const bmw2 = new BMW("X3", 2019, "WBA99887766", false, "BMW-SK-002");
const audi1 = new Audi("A6", 2021, "WAU55667788", true, 45000);
const audi2 = new Audi("Q7", 2024, "WAU11229900", true, 1200);
console.log("--- Моделі Toyota ---");
toyota1.displayInfo();
toyota2.displayInfo();
console.log("\n--- Моделі BMW ---");
bmw1.displayInfo();
bmw2.displayInfo();
console.log("\n--- Моделі Audi ---");
audi1.displayInfo();
audi2.drive(300);
audi2.displayInfo();
// console.log(toyota1.year);         // Помилка: year — protected
// console.log(bmw1.serviceKey);      // Помилка: serviceKey — private
//# sourceMappingURL=cars.js.map