-- drop old DB and create new DB
DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

-- create department table
CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

-- create role table
CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY(id)
);

-- create employee table
CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id)REFERENCES roles(id),
    FOREIGN KEY(manager_id)REFERENCES employees(id)
);


-- insert into departments
INSERT INTO departments (name)VALUES("fighters");
INSERT INTO departments (name)VALUES("mages");
INSERT INTO departments (name)VALUES("mystics");

-- insert into roles
INSERT INTO roles (title, salary,department_id)
VALUES("warrior", 100.00, 100);
INSERT INTO roles (title, salary,department_id)
VALUES("wizard", 120.00, 200);
INSERT INTO roles (title, salary,department_id)
VALUES("cleric", 125.00, 300);

-- insert into employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Gorack", "Stonespear", 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Jenna", "Lightbringer", 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Leopold", "Firebrand", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Garal", "Lightfingers", 1, 1);