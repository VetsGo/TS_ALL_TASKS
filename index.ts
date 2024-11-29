// Створені enum
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

// Створені інтерфейси
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grades {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}

// Реалізований клас UniversityManagementSystem
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grades[] = [];
    private enrollments: { studentId: number, courseId: number }[] = [];
    private studentIdCounter: number = 1;

    // Метод для запису студента в університет
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = {
            ...student,
            id: this.studentIdCounter++,
        };
        this.students.push(newStudent);
        return newStudent;
    }

    // Метод для додавання нового курсу
    addCourse(course: Course): void {
        this.courses.push(course);
    }

    // Метод для реєстрації студента на курс
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) {
            throw new Error("Student not found.");
        }

        if (!course) {
            throw new Error("Course not found.");
        }

        if (student.faculty !== course.faculty) {
            throw new Error("Student cannot register for courses from a different faculty.");
        }

        const enrolledStudents = this.enrollments.filter(e => e.courseId === courseId).length;
        if (enrolledStudents >= course.maxStudents) {
            throw new Error("Course is full.");
        }

        const alreadyRegistered = this.enrollments.some(e => e.studentId === studentId && e.courseId === courseId);
        if (alreadyRegistered) {
            throw new Error("Student is already registered for this course.");
        }

        this.enrollments.push({
            studentId,
            courseId
        });
    }

    // Метод для виставлення оцінки студенту за курс
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) {
            throw new Error("Student not found.");
        }

        if (!course) {
            throw new Error("Course not found.");
        }

        const registered = this.enrollments.some(e => e.studentId === studentId && e.courseId === courseId);
        if (!registered) {
            throw new Error("Student is not registered for this course.");
        }

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        });
    }

    // Метод для зміни статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);

        if (!student) {
            throw new Error("Student not found.");
        }

        if (newStatus === StudentStatus.Graduated && student.year < 4) {
            throw new Error("Student cannot graduate before completing all years.");
        }

        if (newStatus === StudentStatus.Expelled && student.status === StudentStatus.Graduated) {
            throw new Error("Graduated students cannot be expelled.");
        }

        student.status = newStatus;
    }

    // Метод для отримання студентів за факультетом
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Метод для отримання оцінок студента
    getStudentGrades(studentId: number): Grades[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Метод для отримання доступних курсів за факультетом та семестром
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Метод для розрахунку середнього балу студента
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter(g => g.studentId === studentId);

        if (studentGrades.length === 0) {
            return 0;
        }

        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }

    // Метод для отримання відмінників за факультетом
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const students = this.getStudentsByFaculty(faculty);
        const topStudents = students.filter(student => {
            const grades = this.getStudentGrades(student.id);
            const averageGrade = grades.reduce((sum, g) => sum + g.grade, 0) / (grades.length || 1);
            return averageGrade >= Grade.Excellent;
        });
        return topStudents;
    }
}

// Створення екземпляра системи управління університетом
const university = new UniversityManagementSystem();

// Запис студентів
const student1 = university.enrollStudent({
    fullName: "Sergo Ridkovec",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "PD-41"
});

const student2 = university.enrollStudent({
    fullName: "Jane Smith",
    faculty: Faculty.Computer_Science,
    year: 3,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "PD-42"
});

// Додавання курсів
const course1 = {
    id: 1,
    name: "C++ Programming",
    type: CourseType.Mandatory,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
};
university.addCourse(course1);

const course2 = {
    id: 2,
    name: "Database",
    type: CourseType.Optional,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 25
};
university.addCourse(course2);

// Реєстрація студентів на курси
university.registerForCourse(student1.id, course1.id);
university.registerForCourse(student1.id, course2.id);
university.registerForCourse(student2.id, course1.id);

// Надання оцінок
university.setGrade(student1.id, course1.id, Grade.Excellent);
university.setGrade(student1.id, course2.id, Grade.Good);
university.setGrade(student2.id, course1.id, Grade.Satisfactory);

// Демонстрація методів
console.log("Students in Computer Science Faculty:", 
    university.getStudentsByFaculty(Faculty.Computer_Science));

console.log("Student 1 Grades:", 
    university.getStudentGrades(student1.id));

console.log("Available Courses for Computer Science in First Semester:", 
    university.getAvailableCourses(Faculty.Computer_Science, Semester.First));

console.log("Student 1 Average Grade:", 
    university.calculateAverageGrade(student1.id));

console.log("Top Students in Computer Science Faculty:", 
    university.getTopStudentsByFaculty(Faculty.Computer_Science));

// Демонстрація оновлення статусу студента
university.updateStudentStatus(student1.id, StudentStatus.Academic_Leave);
console.log("Student 1 Status Updated:", 
    university.getStudentsByFaculty(Faculty.Computer_Science).find(s => s.id === student1.id)?.status);