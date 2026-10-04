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
    public isHybrid: boolean;

    constructor(model: string, year: number, vinCode: string, isHybrid: boolean) {
        super("Toyota", year, vinCode);
        this.model = model;
        this.isHybrid = isHybrid;
    }

    displayInfo(): void {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, Гібрид: ${this.isHybrid ? 'Так' : 'Ні'}, VIN: ${this.getVin()}`);
    }
}

class BMW extends Car {
    public model: string;
    public mSportPackage: boolean;

    constructor(model: string, year: number, vinCode: string, mSportPackage: boolean) {
        super("BMW", year, vinCode);
        this.model = model;
        this.mSportPackage = mSportPackage;
    }

    displayInfo(): void {
        console.log(`[${this.brand} ${this.model}] Рік: ${this.year}, M-Пакет: ${this.mSportPackage ? 'Є' : 'Немає'}, VIN: ${this.getVin()}`);
    }
}

class Audi extends Car {
    public model: string;
    public quattro: boolean;

    constructor(model: string, year: number, vinCode: string, quattro: boolean) {
        super("Audi", year, vinCode);
        this.model = model;
        this.quattro = quattro;
    }

    displayInfo(): void {
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