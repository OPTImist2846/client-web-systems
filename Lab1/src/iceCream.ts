type Size = "маленький" | "великий";
type Topping = "шоколад" | "карамель" | "ягоди";

const SIZE_PRICES: Record<Size, number> = {
    "маленький": 10,
    "великий": 25,
};

const TOPPING_PRICES: Record<Topping, number> = {
    "шоколад": 5,
    "карамель": 6,
    "ягоди": 10,
};

const MARSHMALLOW_PRICE: number = 5;

function isSize(value: string): value is Size {
    return value in SIZE_PRICES;
}

function isTopping(value: string): value is Topping {
    return value in TOPPING_PRICES;
}

function calculateIceCreamCost(size: Size, toppings: Topping[], withMarshmallow: boolean = false): number {
    if (toppings.length === 0) {
        throw new Error("Потрібно вибрати мінімум одну начинку.");
    }

    const toppingsCost: number = toppings.reduce((sum, topping) => sum + TOPPING_PRICES[topping], 0);
    const marshmallowCost: number = withMarshmallow ? MARSHMALLOW_PRICE : 0;

    return SIZE_PRICES[size] + toppingsCost + marshmallowCost;
}

function askSize(): Size | null {
    const input: string = (prompt("Розмір (маленький - 10 грн, великий - 25 грн):") ?? "").trim().toLowerCase();
    return isSize(input) ? input : null;
}

function askToppings(): Topping[] | null {
    const input: string = prompt(
        "Начинки через кому (шоколад - 5 грн, карамель - 6 грн, ягоди - 10 грн):"
    ) ?? "";

    const values: string[] = input
        .split(",")
        .map(value => value.trim().toLowerCase())
        .filter(value => value !== "");

    if (values.length === 0 || !values.every(isTopping)) {
        return null;
    }

    return values;
}

function orderIceCream(): void {
    const size: Size | null = askSize();
    if (size === null) {
        alert("Помилка: невідомий розмір.");
        return;
    }

    const toppings: Topping[] | null = askToppings();
    if (toppings === null) {
        alert("Помилка: потрібно вибрати мінімум одну начинку зі списку.");
        return;
    }

    const withMarshmallow: boolean = confirm(`Посипати маршмелоу за ${MARSHMALLOW_PRICE} грн?`);
    const total: number = calculateIceCreamCost(size, toppings, withMarshmallow);

    const summary: string =
        `Розмір: ${size}\n` +
        `Начинки: ${toppings.join(", ")}\n` +
        `Маршмелоу: ${withMarshmallow ? "так" : "ні"}\n` +
        `До сплати: ${total} грн`;

    console.log(summary);
    alert(summary);
}

orderIceCream();
