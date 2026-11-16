abstract class Car {
    public brand: string;
    protected year: number;
    private vinCode: string;

    constructor(brand: string, year: number, vinCode: string) {
        this.brand = brand;
        this.year = year;
        this.vinCode = vinCode;
    }

    protected getVin(): string {
        return this.vinCode;
    }

    abstract displayInfo(): void;
}

class Toyota extends Car {
    public model: string;
    protected isHybrid: boolean;
    private dealerPrice: number;

    constructor(model: string, year: number, vinCode: string, isHybrid: boolean, dealerPrice: number) {
        super("Toyota", year, vinCode);
        this.model = model;
        this.isHybrid = isHybrid;
        this.dealerPrice = dealerPrice;
    }

    displayInfo(): void {
        console.log(
            `[${this.brand} ${this.model}] Рік: ${this.year}, Гібрид: ${this.isHybrid ? "Так" : "Ні"}, ` +
            `Ціна дилера: $${this.dealerPrice}, VIN: ${this.getVin()}`
        );
    }
}

class BMW extends Car {
    public model: string;
    protected mSportPackage: boolean;
    private serviceKey: string;

    constructor(model: string, year: number, vinCode: string, mSportPackage: boolean, serviceKey: string) {
        super("BMW", year, vinCode);
        this.model = model;
        this.mSportPackage = mSportPackage;
        this.serviceKey = serviceKey;
    }

    displayInfo(): void {
        console.log(
            `[${this.brand} ${this.model}] Рік: ${this.year}, M-Пакет: ${this.mSportPackage ? "Є" : "Немає"}, ` +
            `Сервісний ключ: ${this.serviceKey}, VIN: ${this.getVin()}`
        );
    }
}

class Audi extends Car {
    public model: string;
    protected quattro: boolean;
    private mileage: number;

    constructor(model: string, year: number, vinCode: string, quattro: boolean, mileage: number) {
        super("Audi", year, vinCode);
        this.model = model;
        this.quattro = quattro;
        this.mileage = mileage;
    }

    drive(km: number): void {
        this.mileage += km;
    }

    displayInfo(): void {
        console.log(
            `[${this.brand} ${this.model}] Рік: ${this.year}, Повний привід (Quattro): ${this.quattro ? "Так" : "Ні"}, ` +
            `Пробіг: ${this.mileage} км, VIN: ${this.getVin()}`
        );
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
