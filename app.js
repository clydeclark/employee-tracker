// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");


// make connection
let connection = mysql.createConnection({
    host: "localhost",

    // set port
    port: 3306,

    // set user
    user: "root",

    // set password
    password: "password",
    database: "employeedb",
    insecureAuth: true

});

connection.connect(function (error) {
    if (error) throw error;
    // throwTitle();
    console.log("connected as: " + connection.threadId + "\n");
    runApp();
});

// app main function
function runApp() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "selection",
        choices: [
            "Add departments, roles, or employees",
            "View departments, roles, or employees",
            "Update employee roles",
            "Exit program"
        ]
    }]).then(function (response) {
        switch (response.selection) {
            case "Add departments, roles, or employees":
                runAdd();
                break;
            case "View departments, roles, or employees":
                runView();
                break;
            case "Update employee roles":
                updateRoles();
                break;
            default:
                break;
        }
    })
};

// add function
function runAdd() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to add?",
        name: "selection",
        choices: [
            "Add department",
            "Add role",
            "Add employee"
        ]
    }]).then(function (response) {
        switch (response.selection) {
            case "Add department":
                addDept();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            default:
                break;
        }
    })
};

// view departments, roles, or employees

// update employee roles

// add department
function addDept() {
    inquirer.prompt([{
        type: "input",
        message: "What department would you like to add?",
        name: "department"
    }]).then(function (response) {
        const department = response.department;
        const query = "INSERT INTO departments (name) VALUES (?);"

        connection.query(query, department,
            function (error, res) {
                console.log("added " + department);
                runApp();
            })
    })
}

// add role
function addRole() {
    inquirer.prompt([{
            type: "input",
            message: "What role would you like to add?",
            name: "role"
        },
        {
            type: "input",
            message: "What is the salary",
            name: "salary"
        },
        {
            type: "input",
            message: "What department is this role in?",
            name: "department"
        }
    ]).then(function (response) {
        const role = response.role;
        const salary = response.salary;
        const department = response.department;
        const query = "INSERT INTO roles (title, salary, department_id)VALUES (?, ?, ?);"
        connection.query(query, role, salary, department,
            function (error, res) {
                console.log("added " + role);
            })
    })
}

// add employee
function addEmployee() {
    inquirer.prompt([{
            type: "input",
            message: "What is the employees first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employees last name?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is the role ID of the employee?",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is the employee's manager's ID?",
            name: "managerID"
        }
    ]).then(function (response) {
        const firstName = response.firstName;
        const lastName = response.lastName;
        const roleID = response.roleID;
        const managerID = response.managerID;
        const query = "INSERT INTO employees (first_name, last_name, role_id, manager_id)VALUES ?, ?,?,?;";
        connection.query(query, {
                firstName: firstName,
                lastName: lastName,
                roleID: roleID,
                managerID: managerID
            },
            function (error, res) {

            })
    })
}

// function throwTitle() {
//     console.log(`
// ================================================================
// ===      ______                 _                            ===
// ===     |   __/ _ __ ___  _ __ | | ___  _   _  ___  ___      ===
// ===     |   _| |  _ '  _\|  _ \| |/ _ \| | | |/ _ \/ _ \     ===
// ===     |  |___  | | | | | |_) | | (_) | |_| |  __/  __/     ===
// ===     |______|_| |_| |_|  __/|_|\___/\___, |\___|\___|     ===
// ===                      |__|           |___/                ===
// ===                                                          ===
// ===      __  __                                              ===
// ===     |  \/  | __ _ _ __   __ _  __ _  ___   __            ===
// ===     | |\/| |/ _' | '_ \ / _' |/ _' |/ _ \ |__|   (\_/)   ===
// ===     | |  | | (_| | | | | (_| | (_| |  __/ | |    (O.o)   ===
// ===     |_|  |_|\__,_|_| |_|\__,_|\__, |\___| |_|    (> <)   ===
// ===                               |___/                      ===
// ================================================================
// 	`);
// }