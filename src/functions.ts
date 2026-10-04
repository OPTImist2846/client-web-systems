function printInfo(name: string, age: number = 18): void {
    console.log(`Ім'я: ${name}, Вік: ${age}`);
}

printInfo("Олексій", 20); // Передано обидва параметри
printInfo("Діана");       // Використає значення за замовчуванням (18)