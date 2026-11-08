interface Payable {
    pay(): void;
}

// Кожен співробітник отримує виплати, тому Employee одразу описує контракт Payable
abstract class Employee implements Payable {
    constructor(
        public name: string,
        public age: number,
        public salary: number
    ) {}

    abstract getAnnualBonus(): number;
    abstract pay(): void;
}

class Developer extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getAnnualBonus(): number {
        return this.salary * 0.10;
    }

    pay(): void {
        console.log(`Виплачено базову зарплату розробнику ${this.name}: ${this.salary} грн`);
    }
}

class Manager extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getAnnualBonus(): number {
        return this.salary * 0.20;
    }

    pay(): void {
        console.log(`Виплачено базову зарплату менеджеру ${this.name}: ${this.salary} грн`);
    }
}

const employees: Employee[] = [
    new Developer("Олексій", 20, 45000),
    new Developer("Іван", 22, 40000),
    new Manager("Олена", 35, 75000)
];

let totalAnnualBonus = 0;

console.log("--- Виплати співробітникам ---");
employees.forEach(employee => {
    employee.pay();

    const bonus = employee.getAnnualBonus();
    console.log(`Бонус для ${employee.name}: ${bonus} грн`);
    totalAnnualBonus += bonus;
});

console.log("------------------------------");
console.log(`Загальна річна сума бонусів для всіх співробітників: ${totalAnnualBonus} грн`);