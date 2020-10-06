-- drop old DB and create new DB
DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

-- create department table
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- create role table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)REFERENCES departments(id) ON DELETE CASCADE
);

-- create employee table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id)REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY(manager_id)REFERENCES employees(id) ON DELETE SET NULL
);

-- insert into departments
INSERT INTO departments (name)VALUES("fighters");
INSERT INTO departments (name)VALUES("mages");
INSERT INTO departments (name)VALUES("mystics");

-- insert into roles
INSERT INTO roles (title, salary,department_id)
VALUES("warrior", 100.00, (SELECT id FROM departments WHERE name = "fighters")),
("wizard", 120.00, (SELECT id FROM departments WHERE name = "mages")),
("cleric", 125.00, (SELECT id FROM departments WHERE name = "mystics"));

-- insert into employees
INSERT INTO employees (first_name, last_name, role_id)
VALUES("Gorack", "Stonespear", (SELECT id FROM roles WHERE title = "warrior")),
("Jenna", "Lightbringer", (SELECT id FROM roles WHERE title = "cleric")),
("Leopold", "Firebrand", (SELECT id FROM roles WHERE title = "wizard")),
("Garal", "Lightfingers", (SELECT id FROM roles WHERE title = "warrior"));

-- update managers
UPDATE employees SET manager_id = 1 WHERE id = 2;

UPDATE employees SET manager_id = 1 WHERE id = 3;

UPDATE employees SET manager_id = 1 WHERE id = 4;