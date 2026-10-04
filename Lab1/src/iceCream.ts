function calculateIceCreamCost(): void {
    let totalCost: number = 0;

    const size = prompt("Розмір (маленький - 10 грн, великий - 25 грн):")?.toLowerCase();
    if (size === "маленький") totalCost += 10;
    else if (size === "великий") totalCost += 25;
    else {
        alert("Помилка: невідомий розмір.");
        return;
    }

    const filling = prompt("Начинка (шоколад - 5 грн, карамель - 6 грн, ягоди - 10 грн):")?.toLowerCase();
    if (filling === "шоколад") totalCost += 5;
    else if (filling === "карамель") totalCost += 6;
    else if (filling === "ягоди") totalCost += 10;
    else {
        alert("Помилка: потрібно вибрати правильну начинку.");
        return;
    }

    const addMarshmallow = confirm("Додати маршмелоу за 5 грн?");
    if (addMarshmallow) totalCost += 5;

    alert(`До сплати: ${totalCost} грн`);
}

calculateIceCreamCost();