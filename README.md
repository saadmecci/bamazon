# bamazon

A Node.js based amazon-like storefront that uses MySQL to store information.

The application uses the **inquirer, mysql, and console.table** npm packages.

There are 2 ways to interact with the store: **1) Customer View** or **2) Manager View**.

### bamazon Customer View

When the bamazonCustomer.js file is run, the products and their price appear in a table format.

The customer can then choose a product by item_id and choose how many they would like to buy.

The customer is then notified of the total cost, the stock of the item in the SQL database decreases by said amount.

<img src="assets/images/CustomerView.png" alt="Customer View of bamazon">

The manager can view all items, items with low inventory, can add stock to low inventory items, and can add brand new items.