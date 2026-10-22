Pharmacy Management REST API

A backend REST API built with Node.js, Express.js, MongoDB, and Mongoose to manage pharmacy medicine inventory and sales operations.

This project is part of my practical backend development journey, focused on implementing real-world business logic, input validation, REST API design, error handling, and database consistency.

Project Overview

The Pharmacy Management API is designed to manage medicine records, process sales, validate available stock, and handle sale cancellations.

The project is currently in development. Some features, including barcode search completion, transaction handling, and automated testing, are still being improved.

Features

- Medicine Management: Add and retrieve medicine records.
- Barcode-Based Search: Planned functionality to find medicines using their barcode; route implementation needs completion.
- Input Validation: Validate medicine fields, prices, stock values, and sale quantities.
- Duplicate Prevention: Check for an existing barcode before adding a medicine.
- Sales Processing: Calculate sale totals and record sales.
- Stock Validation: Prevent sales when requested quantities exceed available stock.
- Sale Cancellation: Cancel a sale by its ID and restore inventory.
- Error Handling: Handle invalid input, missing records, and business-rule violations.
- Database Consistency: Learning and implementing atomic updates and MongoDB transactions.

Tech Stack

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- npm
- Nodemon

Getting Started

Prerequisites

Install the following before running the project:

- "Node.js" (https://nodejs.org/)
- npm (included with Node.js)
- A MongoDB database or MongoDB Atlas cluster
- "Postman" (https://www.postman.com/) for API testing

Installation

1. Clone the repository

git clone https://github.com/assadsid/mern-pract.git

2. Navigate to the project directory

cd mern-pract

3. Install dependencies

npm install

4. Configure environment variables

Create a ".env" file in the project root:

PORT=3000
MONGO_URI=your_mongodb_connection_string

Replace "your_mongodb_connection_string" with your own MongoDB connection string.

Security note: Never commit your ".env" file or database credentials to GitHub. Add ".env" to ".gitignore".

5. Start the development server

If you have not configured a "dev" script in "package.json", run:

npx nodemon server.js

The API is expected to run at:

http://localhost:3000

The medicine routes are mounted under "/api".

API Endpoints

Base URL:

http://localhost:3000/api

Medicine APIs

Method| Endpoint| Description
POST| "/new-medicine"| Add a new medicine
GET| "/medicines"| Retrieve medicine records
GET| "/medicines/:barcode"| Planned: retrieve a medicine by barcode

«Note: The barcode-search endpoint must be completed and registered in the router before it can be considered available.»

Sales APIs

The project includes sale creation and cancellation logic.

Operation| Description
Create Sale| Validate quantity and stock, calculate the total, save the sale, and deduct stock
Cancel Sale| Find a sale by ID, check its status, and restore stock when cancellation is allowed

The exact HTTP methods and paths for sales should be confirmed from the current Express router before use. The cancellation and stock-update logic is still being strengthened with atomic operations and transactions.

Business Rules

The API is being developed around the following business rules:

1. Each medicine must have a unique barcode.
2. Medicine prices and stock values must not be negative.
3. Sale quantity must be a positive integer.
4. A medicine must exist before a sale can be processed.
5. A sale must not proceed if available stock is insufficient.
6. The sale total is calculated using the quantity and unit price.
7. Stock should be deducted when a sale is successfully completed.
8. A cancelled sale must not restore stock more than once.
9. Invalid IDs and missing records should return appropriate error responses.
10. Sale records and inventory updates should remain consistent if an operation fails.

HTTP Status Codes

The API uses or is designed to use the following status codes, depending on the endpoint and error condition.

Status Code| Meaning
"201 Created"| A medicine or sale was successfully created
"400 Bad Request"| Invalid input or malformed ID
"404 Not Found"| Requested medicine or sale record was not found
"409 Conflict"| Insufficient stock or sale already cancelled
"500 Internal Server Error"| An unexpected server error occurred

Testing

Postman can be used to test the API endpoints manually.

Recommended test scenarios include:

- Add a medicine using valid data.
- Attempt to add a medicine with a duplicate barcode.
- Retrieve the medicine list.
- Search using an existing and a non-existing barcode after completing the search route.
- Create a sale with a valid quantity.
- Attempt to create a sale with an invalid quantity.
- Attempt a sale when stock is insufficient.
- Cancel an existing sale.
- Attempt to cancel the same sale again.
- Verify that inventory is updated correctly.
- Test concurrent cancellation requests.
- Test transaction rollback when transaction handling is implemented.

Automated tests have not yet been added.

Key Learning Areas

Through this project, I am practising:

- Translating business requirements into API workflows.
- Designing REST endpoints, controllers, and Mongoose schemas.
- Handling asynchronous operations with "async/await".
- Validating user input and handling HTTP errors.
- Managing inventory and sales data.
- Understanding race conditions and atomic database operations.
- Learning MongoDB transactions and rollback behaviour.

Future Improvements

- Complete and test barcode-based medicine search.
- Implement authentication and role-based authorization.
- Make sale creation and cancellation safe under concurrent requests.
- Complete MongoDB transaction handling and rollback tests.
- Add automated tests using a JavaScript testing framework.
- Document APIs with Swagger/OpenAPI.
- Deploy the API to a cloud platform.
- Build a frontend dashboard for pharmacy inventory and sales.

Project Status

In Progress

This is a practical backend portfolio project. Features, testing, and documentation are being improved as development progresses.

Author

Assad Siddiqui

Backend Development | Node.js | Express.js | MongoDB

- GitHub: "assadsid" (https://github.com/assadsid)
- Project Repository: "mern-pract" (https://github.com/assadsid/mern-pract)
- LinkedIn: "Assad Siddiqui" (https://www.linkedin.com/in/assad-siddiqui/)