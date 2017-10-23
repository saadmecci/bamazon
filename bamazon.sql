CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price DECIMAL(10,2),
	stock_quantity INTEGER(10),
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Pen", "Office Supplies", 2, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Stapler", "Office Supplies", 6, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Scissors", "Office Supplies", 3, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Nerf Gun", "Toys", 20, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Fidget Spinner", "Toys", 3, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Flash Drive", "Electronics", 9.99, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Calculator", "Electronics", 30, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Smart TV", "Electronics", 500, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Recliner", "Furniture", 200, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Desk", "Furniture", 100, 300);

SELECT * FROM products;