// import express
// const express = require("express");
const db = require("./db/connection");
const inquirer = require("inquirer");
require("console.table");

// port designation and the app expression
// const PORT = process.env.PORT || 3001;
// const app = express();

// // express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });

//prompt user
const systemStart = function() {
    inquirer
      .prompt({
        type: "list",
        name: "systemStart",
        message: "How would you like to proceed?",
        choices: [
          "view all employees",
          "view all roles",
          "view all departments",
          "add employee",
          "add department",
          "add role",
          "update employee role",
        ]
      })
      .then(function(answer) {
        console.log(answer);

        // start the prompt choices
        switch (answer.systemStart) {
            case "view all employees":
                viewAllEmployees();
                break;

            case "view all roles":
                viewAllRoles();
                break;
  
            case "view all departments":
                viewAllDepartments();
                break;
  
            case "add employee":
                addEmployee();
                break;

            case "add department":
                addDepartment();
                break;
  
                case "add role":
                addRole();
                break;

            case "update employee role":
                updateEmpRole();
                break;
            }
      });
    };
    systemStart();

    // view all employees 
    function viewAllEmployees() {
        console.log("retrieving employees from database");
        db.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id;", function(err, answer) {
        console.log("\n Employees retrieved from Database \n");
        console.table(answer);
        });
    systemStart();
    }

    // view all employee roles
    function viewAllRoles() {
        db.query("SELECT * FROM roles", function(err, answer) {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);
        });
    systemStart();
    }

    // view departments 
    function viewAllDepartments() {
        db.query("SELECT * FROM department", function(err, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
        });
    systemStart();
    }
  
    // to add a new employee 
    function addEmployee() {
        inquirer
        .prompt([
            {
            type: "input",
            message: "Enter employee first name",
            name: "firstname"
            },
            {
            type: "input",
            message: "Enter employee last name",
            name: "lastname"
            }
        ])
        .then(function(answer) {
            db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: null,
                manager_id: null
            },
            function(err, answer) {
                if (err) {
                throw err;
                }
                console.table(answer);
            }
            );
            systemStart();
        });
    }
    
    // select employee to update role
    function updateEmpRole() {
        var allEmployees = [];
        db.query("SELECT * FROM employee", function(err, answer) {
        for (var i = 0; i < answer.length; i++) {
            var allEmployeeString =
            answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            allEmployees.push(allEmployeeString);
        }
    
        inquirer
            .prompt([
            {
                type: "list",
                name: "updateEmpRole",
                message: "select employee to update role",
                choices: allEmployees
            },
            {
                type: "list",
                message: "select new role",
                choices: ["manager", "employee"],
                name: "newrole"
            }
            ])
            .then(function(answer) {
            console.log("update", answer);
            const idToUpdate = {};
            idToUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
            if (answer.newrole === "manager") {
                idToUpdate.roles_id = 1;
            } else if (answer.newrole === "employee") {
                idToUpdate.roles_id = 2;
            }
            db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [idToUpdate.roles_id, idToUpdate.employeeId],
                function(err, data) {
                systemStart();
                }
            );
            });
        });
    }
    
    // add a new department 
    function addDepartment() {
        inquirer
        .prompt({
            type: "input",
            message: "enter department name",
            name: "dept"
        })
        .then(function(answer) {
            db.query(
            "INSERT INTO department SET ?",
            {
                name: answer.dept
            },
            function(err, answer) {
                if (err) {
                throw err;
                }
            }
            ),
            console.table(answer);
            systemStart();
        });
    }
    
    // add a new role
    function addRole() {
        db.query("SELECT * FROM department", (err, res) => {
            const RoleInfoArray = []
            for (let i = 0; i < res.length; i++) {
                const newRole = {
                    name: res[i].name,
                    value: res[i].id
                }
                RoleInfoArray.push(newRole)
            }
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the role of your choosing?",
                    name: "roleTitle",
                },
                {
                    type: "input",
                    message: "What is the salary of the role of your choosing?",
                    name: "roleSalary",
                },
                {
                    type: "list",
                    message: "What is the department of the role of your choosing?",
                    name: "roleDepartment",
                    choices: RoleInfoArray
                }
            ]).then((res) => {
                db.query(
                    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                    [res.roleTitle, res.roleSalary, res.roleDepartment],
                    (err, res) => {
                        console.log("Added the role to the database.")
            systemStart()
            })
            })
        })
    }
    
    


           
   