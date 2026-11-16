"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    title;
    author;
    pages;
    isBorrowed = false;
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    borrow() {
        if (this.isBorrowed) {
            console.log(`Книга "${this.title}" вже позичена.`);
            return;
        }
        this.isBorrowed = true;
        console.log(`Книгу "${this.title}" позичено.`);
    }
}
class Magazine {
    title;
    author;
    issueNumber;
    isBorrowed = false;
    constructor(title, author, issueNumber) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }
    borrow() {
        if (this.isBorrowed) {
            console.log(`Журнал "${this.title}" вже позичений.`);
            return;
        }
        this.isBorrowed = true;
        console.log(`Журнал "${this.title}" позичено.`);
    }
}
class DVD {
    title;
    author;
    durationMinutes;
    isBorrowed = false;
    constructor(title, author, durationMinutes) {
        this.title = title;
        this.author = author;
        this.durationMinutes = durationMinutes;
    }
    borrow() {
        if (this.isBorrowed) {
            console.log(`DVD диск "${this.title}" вже позичений.`);
            return;
        }
        this.isBorrowed = true;
        console.log(`DVD диск "${this.title}" позичено.`);
    }
}
class Library {
    items = [];
    addItem(item) {
        this.items.push(item);
        console.log(`Додано до бібліотеки: "${item.title}"`);
    }
    findItemByName(name) {
        return this.items.find(item => item.title === name);
    }
    printAvailableItems() {
        console.log("\n--- Доступні елементи в бібліотеці ---");
        const availableItems = this.items.filter(item => !item.isBorrowed);
        if (availableItems.length === 0) {
            console.log("Наразі всі елементи позичені.");
        }
        else {
            availableItems.forEach(item => {
                console.log(`- ${item.title} (Автор: ${item.author})`);
            });
        }
        console.log("--------------------------------------\n");
    }
}
const myLibrary = new Library();
const book1 = new Book("Кобзар", "Тарас Шевченко", 600);
const magazine1 = new Magazine("National Geographic", "Різні автори", 152);
const dvd1 = new DVD("Матриця", "Брати Вачовскі", 136);
console.log("--- Наповнення бібліотеки ---");
myLibrary.addItem(book1);
myLibrary.addItem(magazine1);
myLibrary.addItem(dvd1);
myLibrary.printAvailableItems();
console.log("--- Операції з елементами ---");
const foundItem = myLibrary.findItemByName("Кобзар");
if (foundItem) {
    console.log(`Знайдено: "${foundItem.title}". Виконуємо видачу...`);
    foundItem.borrow();
}
else {
    console.log("Елемент не знайдено.");
}
dvd1.borrow();
dvd1.borrow();
myLibrary.printAvailableItems();
//# sourceMappingURL=library.js.map