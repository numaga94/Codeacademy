const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// create table Employee
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Employee');
  db.run(
    `CREATE TABLE Employee (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    wage INTEGER NOT NULL,
    is_current_employee INTEGER DEFAULT 1
  )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table Employee is created.');
      }
    }
  );
});

// create table Timesheet
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Timesheet');
  db.run(
    `CREATE TABLE Timesheet (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    hours INTEGER NOT NULL,
    rate INTEGER NOT NULL,
    date INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES Employee(id)
  )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table Timesheet is created.');
      }
    }
  );
});

// create table Menu
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Menu');
  db.run(
    `CREATE TABLE Menu (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table Menu is created.');
      }
    }
  );
});

// create table MenuItem
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS MenuItem');
  db.run(
    `CREATE TABLE MenuItem (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    inventory INTEGER NOT NULL,
    price INTEGER NOT NULL,
    menu_id INTEGER NOT NULL,
    FOREIGN KEY(menu_id) REFERENCES Menu(id) 
  )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table MenuItem is created.');
      }
    }
  );
});
