//initialize the inquirer npm package
var inquirer = require("inquirer");
//initialize the mysql npm package
var mysql = require("mysql");
//initialize table npm package
require("console.table");
//create the connection for the sql database
var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "bamazon"
});
//connect to the mysql server and sql database
connection.connect(function (error) {
	if (error) {
		throw error;
	}
	managerOptions();
});
//function will run the logic for the manager choosing their option
function managerOptions() {
	//inquirer invocation to ask to list the available options in manager mode
	inquirer
		.prompt({
			name: "managerChoice",
			type: "list",
			message: "Hello Mr. Manager, what would you like to do today?",
			choices: ["1) View Products for Sale", "2) View Low Inventory", "3) Add to Inventory", "4) Add New Product"]
		})
		//function that will run once the above question has been answered
		.then(function (answer) {
			//if the manager wants to view products available in the database
			if (answer.managerChoice === "1) View Products for Sale") {
				//will display id, product name, price, and stock available for all the items
				connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (error, results) {
					if (error) {
						throw error
					}
					//displays the results in a table format using the console.table npm package
					console.table(results);
				});
				//ends the connection with the sql database
				connection.end();
			}
			//if the manager wants to view the products with low stock quanitites
			if (answer.managerChoice === "2) View Low Inventory") {
				//will display, id, product name, price, and stock available ONLY for those products with stock quantities between 0 to 5 inclusive
				connection.query("SELECT item_id, product_name, price, stock_quantity FROM products HAVING stock_quantity BETWEEN 0 AND 5",
					function (error, results) {
						if (error) {
							throw error;
						}
						//will display the results using the console.table npm package
						console.table (results);
					}
				);
				//ends the connection with the sql database
				connection.end();
			}
			//if the manager wants to add more stock to the items with low quantities
			if (answer.managerChoice === "3) Add to Inventory") {
				//array of the product names that will be used when updating stock quantity
				var productIndex = ["Pen", "Stapler", "Scissors", "Nerf Gun", "Fidget Spinner", "Flash Drive", "Calculator", "Smart TV", "Recliner", "Desk"];
				//will select the entire table in the sql databse
				connection.query("SELECT * FROM products", function (error, results) {
					//inquirer invocation to ask which product the manager wants to add to
					inquirer
						.prompt([
							{
								name: "addWhichStock",
								type: "list",
								message: "Which item would you like to order more of?",
								choices: ["Pen", "Stapler", "Scissors", "Nerf Gun", "Fidget Spinner", "Flash Drive", "Calculator", "Smart TV", "Recliner", "Desk"]
							},
							{
								name: "howMuchStock",
								type: "input",
								message: "How much stock would you like to add? Please enter a non-negative integer."
							}
						])
						//stuff below will run once the answer choices have been obtained
						.then(function (answer) {
							//will update the products table according to the following parameters
							connection.query("UPDATE products SET ? WHERE ?",
								[
									{
										//update stock quantity using the productIndex array to obtain which object to go into for results
										//add how much the manager wants to add to the product
										stock_quantity: results[productIndex.indexOf(answer.addWhichStock)].stock_quantity + parseInt(answer.howMuchStock)
									},
									{
										//selects the product name using the manager input
										product_name: answer.addWhichStock
									}
								],
								function (error) {
									if (error) {
										throw error;
									}
									//success message to be feel more realistic
									console.log(answer.addWhichStock + " has been restocked.");
								}
							);
							//ends the connection with the sql database
							connection.end();
						});
				});
			}
			//if the manager wants to add a new item to the inventory
			if (answer.managerChoice === "4) Add New Product") {

				inquirer
					.prompt([
						{
							name: "whatItem",
							type: "input",
							message: "What is the name of the item?"
						},
						{
							name: "whichDepartment",
							type: "input",
							message: "What department will be responsible for this item?"
						},
						{
							name: "whatPrice",
							type: "input",
							message: "What will be the price of the item?"
						},
						{
							name: "initialStock",
							type: "input",
							message: "How much initial stock should be made available?"
						}
					])
					.then(function (answer) {
						console.log(answer);
						//mysql command to add a row into the table
						connection.query("INSERT INTO products SET ?",
							{
								//sets the product name, dpt name, price, and stock according to manager input
								product_name: answer.whatItem,
								department_name: answer.whichDepartment,
								price: parseFloat(answer.whatPrice),
								stock_quantity: parseInt(answer.initialStock)
							},
							function (error) {
								if (error) {
									throw error;
								}
								console.log(answer.whatItem + " has been added to the store.")
							}
						)
						//ends the connection with the sql database
						connection.end();
					});
			}
		});
}









