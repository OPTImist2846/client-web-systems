"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
class Developer extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.10; // 10% бонус
    }
    pay() {
        console.log(`Виплачено базову зарплату розробнику ${this.name}: ${this.salary} грн`);
    }
}
class Manager extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.20;
    }
    pay() {
        console.log(`Виплачено базову зарплату менеджеру ${this.name}: ${this.salary} грн`);
    }
}
const employees = [
    new Developer("Олексій", 20, 45000),
    new Developer("Іван", 22, 40000),
    new Manager("Олена", 35, 75000)
];
let totalAnnualBonus = 0;
console.log("--- Виплати співробітникам ---");
employees.forEach(employee => {
    if ('pay' in employee) {
        employee.pay();
    }
    const bonus = employee.getAnnualBonus();
    console.log(`Бонус для ${employee.name}: ${bonus} грн`);
    totalAnnualBonus += bonus;
});
console.log("------------------------------");
console.log(`Загальна річна сума бонусів для всіх співробітників: ${totalAnnualBonus} грн`);
//# sourceMappingURL=employees.js.map