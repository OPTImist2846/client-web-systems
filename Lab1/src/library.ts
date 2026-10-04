interface LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    borrow(): void;
}

class Book implements LibraryItem {
    isBorrowed: boolean = false;

    constructor(public title: string, public author: string, public pages: number) {}

    borrow(): void {
        this.isBorrowed = true;
        console.log(`Книгу "${this.title}" позичено.`);
    }
}

class Magazine implements LibraryItem {
    isBorrowed: boolean = false;

    constructor(public title: string, public author: string, public issueNumber: number) {}

    borrow(): void {
        this.isBorrowed = true;
        console.log(`Журнал "${this.title}" позичено.`);
    }
}

class DVD implements LibraryItem {
    isBorrowed: boolean = false;

    constructor(public title: string, public author: string, public durationMinutes: number) {}

    borrow(): void {
        this.isBorrowed = true;
        console.log(`DVD диск "${this.title}" позичено.`);
    }
}

class Library {
    private items: LibraryItem[] = [];

    addItem(item: LibraryItem): void {
        this.items.push(item);
        console.log(`Додано до бібліотеки: "${item.title}"`);
    }

    findItemByName(name: string): LibraryItem | undefined {
        return this.items.find(item => item.title === name);
    }

    printAvailableItems(): void {
        console.log("\n--- Доступні елементи в бібліотеці ---");
        const availableItems = this.items.filter(item => !item.isBorrowed);
        
        if (availableItems.length === 0) {
            console.log("Наразі всі елементи позичені.");
        } else {
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
} else {
    console.log("Елемент не знайдено.");
}

dvd1.borrow();

myLibrary.printAvailableItems();