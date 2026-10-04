interface Course {
    name: string;
    durationHours: number;
    students: string[];
}

class OnlineCourse implements Course {
    name: string;
    durationHours: number;
    students: string[];

    constructor(name: string, durationHours: number) {
        this.name = name;
        this.durationHours = durationHours;
        this.students = [];
    }

    registerStudent(student: string): void {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`Студента "${student}" успішно зареєстровано на курс "${this.name}".`);
        } else {
            console.log(`Студент "${student}" вже зареєстрований на курс "${this.name}".`);
        }
    }

    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }
}

class CourseManager {
    private courses: Course[] = [];

    addCourse(course: Course): void {
        this.courses.push(course);
        console.log(`Курс "${course.name}" додано до системи.`);
    }

    removeCourse(courseName: string): void {
        const initialLength = this.courses.length;
        this.courses = this.courses.filter(c => c.name !== courseName);
        
        if (this.courses.length < initialLength) {
            console.log(`Курс "${courseName}" успішно видалено.`);
        } else {
            console.log(`Помилка: Курс "${courseName}" не знайдено.`);
        }
    }

    findCourse(courseName: string): Course | undefined {
        return this.courses.find(c => c.name === courseName);
    }

    printAllCourses(): void {
        console.log("\n--- Список усіх активних курсів ---");
        this.courses.forEach(course => {
            console.log(`Курс: ${course.name} (${course.durationHours} год.)`);
            console.log(`Зареєстровані студенти: ${course.students.length > 0 ? course.students.join(", ") : "Немає студентів"}`);
            console.log("-");
        });
        console.log("-----------------------------------\n");
    }
}

const manager = new CourseManager();
const tsCourse = new OnlineCourse("TypeScript Basics", 40);
const reactCourse = new OnlineCourse("React Advanced", 60);
const nodeCourse = new OnlineCourse("Node.js Backend", 50);

console.log("--- Ініціалізація ---");
manager.addCourse(tsCourse);
manager.addCourse(reactCourse);
manager.addCourse(nodeCourse);

console.log("\n--- Реєстрація студентів ---");
tsCourse.registerStudent("Олексій");
tsCourse.registerStudent("Діана");
tsCourse.registerStudent("Олексій");

reactCourse.registerStudent("Іван");
reactCourse.registerStudent("Олена");

manager.printAllCourses();

console.log("--- Перевірка пошуку та видалення ---");
const found = manager.findCourse("TypeScript Basics");
if (found) {
    console.log(`Пошук успішний: знайдено курс "${found.name}".`);
}

manager.removeCourse("Node.js Backend");
manager.printAllCourses();