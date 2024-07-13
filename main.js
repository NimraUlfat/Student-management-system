#! /usr/bin/env node
import inquirer from "inquirer";
//Define student class
class Student {
    static counter = 30000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    //Method to enroll student in course
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method for veiw balance
    view_blanace() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    //Method to show student status
    show_status() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log(`Student Course: ${this.courses}`);
        console.log(`Student Balance: $${this.balance}`);
    }
}
//Define a student manager class to manage students
class Student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    //Method to enroll student in course 
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} course successfully`);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    //Method to veiw a student balance 
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_blanace();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    //Method to pay student fees 
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    //Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    //Method to find a student by student id
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
//Main function to run the programm 
async function main() {
    console.log("-".repeat(60));
    console.log("Student Management System");
    console.log("-".repeat(60));
    let student_manager = new Student_Manager();
    //While loop to keep programm running
    while (true) {
        let user = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        //Using if else statment
        if (user.choice === "Add Student") {
            let add_input = await inquirer.prompt([
                {
                    name: "std",
                    type: "input",
                    message: "Enter a Student Name: ",
                },
            ]);
            student_manager.add_student(add_input.std);
        }
        else if (user.choice === "Enroll Student") {
            let course_input = await inquirer.prompt([
                {
                    name: "std_id",
                    type: "number",
                    message: "Enter a Student ID: ",
                },
                {
                    name: "course",
                    type: "input",
                    message: "Enter a Course Name: ",
                },
            ]);
            student_manager.enroll_student(course_input.std_id, course_input.course);
        }
        else if (user.choice === "View Student Balance") {
            let std_balance = await inquirer.prompt([
                {
                    name: "std_id",
                    type: "number",
                    message: "Enter a Student ID: ",
                },
            ]);
            student_manager.view_student_balance(std_balance.std_id);
        }
        else if (user.choice === "Pay Fees") {
            let fees_input = await inquirer.prompt([
                {
                    name: "std_id",
                    type: "number",
                    message: "Enter a Student ID: ",
                },
                {
                    name: "amount",
                    type: "number",
                    message: "Enter a amount to pay: ",
                },
            ]);
            student_manager.pay_student_fees(fees_input.std_id, fees_input.amount);
        }
        else if (user.choice === "Show Status") {
            let status_input = await inquirer.prompt([
                {
                    name: "std_id",
                    type: "number",
                    message: "Enter a Student ID: ",
                },
            ]);
            student_manager.show_student_status(status_input.std_id);
        }
        else if (user.choice === "Exit") {
            process.exit();
        }
    }
}
//Calling a main function
main();
