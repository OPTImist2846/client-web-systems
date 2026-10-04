"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printInfo(name, age = 18) {
    console.log(`Ім'я: ${name}, Вік: ${age}`);
}
printInfo("Олексій", 20); // Передано обидва параметри
printInfo("Діана"); // Використає значення за замовчуванням (18)
//# sourceMappingURL=functions.js.map