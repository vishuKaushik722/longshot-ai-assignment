# Grocery Store Stock Management

This project is a backend application that serves an API for managing and categorizing stock for a small-scale grocery store. It includes features for managing storage spaces, item types, and items with their respective properties and relationships.

## Project Overview

The goal of this assignment is to develop a compact backend application that provides an API to manage and categorize stock for a small-scale grocery store. The application allows users to create storage spaces, define item types, and manage items with expiration dates and storage space allocations.

## Technologies Used

- Node.js: A JavaScript runtime for server-side development.
- Express.js: A web framework for building APIs in Node.js.
- MongoDB: A NoSQL database for storing and retrieving data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

## Setup Instructions

To run this project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/vishuKaushik722/longshot-ai-assignment


3. Install dependencies:
   cd longshot-ai-assignment
   npm install

4. start the server
   npm start


The server will start running on the specified port (default: 8000).


## API Routes

The following routes are available in the API:

### Storage Spaces

- `GET /api/v1/storage-space/`: Retrieves all storage spaces.
- `POST /api/v1/storage-space/add`: Creates a new storage space.
- `PATCH /api/v1/storage-space/update/:id`: Updates a storage space by ID.
- `DELETE /api/v1/storage-space/delete/:id`: Deletes a storage space by ID.
- `GET /api/v1/storage-space/items/:id`: Get all items in a storage space with id as id

### Item Types

- `GET /api/v1/item-type`: Retrieves all item types.
- `POST /api/v1/item-type/add`: Creates a new item type.
- `PATCH /api/v1/item-type/update/:id`: Updates an item type by ID.
- `DELETE /api/v1/item-type/delete/:id`: Deletes an item type by ID.

### Items

- `GET /api/v1/items`: Retrieves all items.
- `POST /api/v1/items/add`: Creates a new item.
- `PATCH /api/v1/items/relocate/:id`: Relocate an item by in different storage space.
- `DELETE /api/v1/items/delete/:id`: Deletes an item by ID.

Please refer to the API documentation for detailed information on the request/response formats and available parameters.

## Deployment

This backend is deployed here - https://grocery-store-apis.onrender.com/


## Contact Information

For any inquiries or questions, please contact me at vishukaushik586@gmail.com or phone no - 6398026433.


