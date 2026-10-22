Pharmacy Management REST API

A backend REST API built with Node.js, Express.js, MongoDB, and Mongoose to manage pharmacy medicine inventory and sales operations.

This project is part of my practical backend development journey, focusing on real-world business logic, input validation, inventory management, error handling, and data consistency.

Project Overview

The Pharmacy Management API provides functionality to manage medicine records, search medicines by barcode, process sales, and handle sale cancellations while maintaining inventory records.

Key Features

- Medicine Management: Add new medicines and retrieve medicine records.
- Barcode-Based Search: Find a specific medicine using its barcode.
- Input Validation: Validate medicine fields, quantities, prices, and stock values.
- Duplicate Prevention: Check for existing barcodes before adding a medicine.
- Sales Processing: Calculate sale totals and update medicine stock.
- Stock Validation: Prevent sales when the requested quantity exceeds available inventory.
- Sale Cancellation: Cancel a sale using its ID and prevent repeated stock restoration.
- Error Handling: Return appropriate HTTP status codes for invalid input, missing records, and insufficient stock.
- Database Consistency: Learning and implementing transaction handling for related database updates.

Tech Stack

- JavaScript (Node.js)
- Express.js
- MongoDB
- Mongoose
- Postman
- npm
- Nodemon

Getting Started

Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB connection or a MongoDB Atlas cluster
- Postman (for API testing)

Installation

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate to the project folder

cd YOUR_PROJECT_FOLDER

3. Install dependencies

npm install

4. Configure environment variables

Create a ".env" file in the project root:

PORT=3000
MONGO_URI=your_mongodb_connection_string

Replace the example MongoDB value with your own connection string. Never commit your real ".env" file or database credentials to GitHub.

5. Start the development server

If your project has a "dev" script in "package.json":

npm run dev

Alternatively, if Nodemon is installed:

npx nodemon server.js

The API will run on your configured port, which defaults to "3000" in this example.

API Endpoints

Base URL:

http://localhost:3000/api

Medicine APIs

Method| Endpoint| Description
POST| "/new-medicine"| Add a new medicine
GET| "/medicines"| Retrieve medicine records
GET| "/medicines/:barcode"| Find a medicine by barcode

Sales APIs

The sales functionality includes sale creation and cancellation by sale ID. Confirm the exact paths and HTTP methods against your Express router before publishing them here.

Operation| Purpose
Create sale| Validate quantity and stock, calculate total, record the sale, and deduct stock
Cancel sale| Find the sale by ID, check its status, and restore stock when cancellation is allowed

Business Rules

The API follows these core business rules:

1. Medicine barcodes must be unique.
2. Medicine prices and stock values must not be negative.
3. Sale quantity must be a valid positive integer.
4. A medicine must exist before a sale can be processed.
5. A sale must not proceed if available stock is insufficient.
6. The sale total is calculated using the quantity and medicine unit price.
7. Stock is deducted when a sale is successfully created.
8. A cancelled sale must not restore stock more than once.
9. Invalid IDs, missing records, and business-rule violations must be handled appropriately.
10. Related sale and inventory updates should remain consistent if an operation fails.

HTTP Status Codes

Status| Meaning
"201 Created"| Medicine or sale successfully created
"400 Bad Request"| Invalid input or malformed ID
"404 Not Found"| Medicine or sale record not found
"409 Conflict"| Insufficient stock or sale already cancelled
"500 Internal Server Error"| Unexpected server error

Actual status codes depend on the endpoint and the specific error condition.

Testing

The API can be tested using Postman.

Suggested test scenarios:

- Add a medicine with valid data.
- Attempt to add a duplicate barcode.
- Search for an existing and a non-existing barcode.
- Create a sale with a valid quantity.
- Attempt a sale with an invalid quantity.
- Attempt a sale when stock is insufficient.
- Cancel an existing sale.
- Attempt to cancel the same sale again.
- Verify that inventory is updated correctly after each operation.
- Test rollback behavior when transaction handling is implemented.

What I Am Learning

This project helps me practise:

- Translating business requirements into API workflows.
- Designing backend controllers and database schemas.
- Handling asynchronous operations with "async/await".
- Validating input and managing errors.
- Understanding database consistency and race conditions.
- Using MongoDB transactions to coordinate related updates.

Future Improvements

- Authentication and role-based authorization.
- Automated tests using a suitable JavaScript testing framework.
- API documentation with Swagger/OpenAPI.
- Complete transaction handling and rollback testing.
- Deployment to a cloud platform.
- A frontend dashboard for pharmacy inventory and sales.

Project Status

In Progress

This is a learning and portfolio project. Features and documentation will be updated as development and testing progress.

Author

Assad Siddiqui

Backend Development | Node.js | Express.js | MongoDB

- GitHub: https://github.com/assadsid
- LinkedIn: https://www.linkedin.com/in/assad-siddiqui/
