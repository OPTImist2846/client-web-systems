"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SIZE_PRICES = {
    "маленький": 10,
    "великий": 25,
};
const TOPPING_PRICES = {
    "шоколад": 5,
    "карамель": 6,
    "ягоди": 10,
};
const MARSHMALLOW_PRICE = 5;
function isSize(value) {
    return value in SIZE_PRICES;
}
function isTopping(value) {
    return value in TOPPING_PRICES;
}
// Розрахунок вартості: розмір + одна або декілька начинок + (опційно) маршмелоу
function calculateIceCreamCost(size, toppings, withMarshmallow = false) {
    if (toppings.length === 0) {
        throw new Error("Потрібно вибрати мінімум одну начинку.");
    }
    const toppingsCost = toppings.reduce((sum, topping) => sum + TOPPING_PRICES[topping], 0);
    const marshmallowCost = withMarshmallow ? MARSHMALLOW_PRICE : 0;
    return SIZE_PRICES[size] + toppingsCost + marshmallowCost;
}
function askSize() {
    const input = (prompt("Розмір (маленький - 10 грн, великий - 25 грн):") ?? "").trim().toLowerCase();
    return isSize(input) ? input : null;
}
// Користувач вводить одну або кілька начинок через кому, напр.: "шоколад, ягоди"
function askToppings() {
    const input = prompt("Начинки через кому (шоколад - 5 грн, карамель - 6 грн, ягоди - 10 грн):") ?? "";
    const values = input
        .split(",")
        .map(value => value.trim().toLowerCase())
        .filter(value => value !== "");
    if (values.length === 0 || !values.every(isTopping)) {
        return null;
    }
    return values;
}
function orderIceCream() {
    const size = askSize();
    if (size === null) {
        alert("Помилка: невідомий розмір.");
        return;
    }
    const toppings = askToppings();
    if (toppings === null) {
        alert("Помилка: потрібно вибрати мінімум одну начинку зі списку.");
        return;
    }
    const withMarshmallow = confirm(`Посипати маршмелоу за ${MARSHMALLOW_PRICE} грн?`);
    const total = calculateIceCreamCost(size, toppings, withMarshmallow);
    const summary = `Розмір: ${size}\n` +
        `Начинки: ${toppings.join(", ")}\n` +
        `Маршмелоу: ${withMarshmallow ? "так" : "ні"}\n` +
        `До сплати: ${total} грн`;
    console.log(summary);
    alert(summary);
}
orderIceCream();
//# sourceMappingURL=iceCream.js.map