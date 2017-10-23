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
connection.connect(function(error) {
	if (error) {
		throw error;
	}
	//will run the showInventory function
	showInventory();
});
//will display the entire inventory of the store
function showInventory() {
	//selects only the id, name, price columns from the table
	connection.query("SELECT item_id, product_name, price FROM products", function (error, results) {
		if (error) {
			throw error;
		}
		//will print the inventory in a more readable format using console.table npm package
		console.table(results);
		//will run the buyProduct function to interact with user
		buyProduct();
	});
}
//will run the logic for customer buying products
function buyProduct() {
	//inquirer invocation to ask questions that will take in user inout as the answer
	inquirer
		.prompt([
			{
				name: "whichProduct",
				type: "input",
				message: "Please enter the item_id of the product you wish to purchase:"
			},
			{
				name: "howMany",
				type: "input",
				message: "How many would you like to purchase?"
			}
		])
		//function runs when the 2 questions above have been answered
		.then(function (answer) {
			//looks through the products table in the sql databse
			connection.query("SELECT * FROM products",
			function (error, results) {
				if (error) {
					throw error;
				}
				//if the number of items wanted by the user is less than or equal to the amount of item in stock
				if (answer.howMany <= results[answer.whichProduct - 1].stock_quantity) {
					console.log("---------------");
					//informs the user how many of the item they just purchased
					console.log("You bought " + answer.howMany + " items of " + results[answer.whichProduct - 1].product_name + ".");
					//informs the user how much the total cost was
					console.log("This cost a total of " + answer.howMany * results[answer.whichProduct -1].price + " dollars.");
					console.log("---------------");
					//update the sql database to subtract number of items just purchased by user
					connection.query("UPDATE products SET ? WHERE ?", 
						[
							{	//will subtract number of tiems purchased from the amount available in stock
								stock_quantity: results[answer.whichProduct].stock_quantity - answer.howMany
							},
							{	//targets the product that was purchased
								item_id: answer.whichProduct
							}
						],
						function (error) {
							if (error) {
								throw error;
							}
							//a good old way to make this feel more realistic
							console.log("All sales are final.");
							console.log("-----------");
						}
					);
					//ends the connection to the database
					connection.end();
				//if the number of items wanted by the user exceeds the amount avalaible in stock
				} else {
					console.log("---------------");
					//informs user that the product is not available in that quantity
					console.log("Sorry we do not store that many items of " + results[answer.whichProduct - 1].product_name + ".");
					console.log("Please come back at a later time.");
					console.log("---------------");
					//ends the connection to the database
					connection.end();
				}
			}
			);
		});
}