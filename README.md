# longshot-ai-assignment

This project is a backend application that serves an API for managing and categorizing stock for a small-scale grocery store.

## Getting Started

To run this project, follow these steps:

1. Install dependencies:
  npm install

2. Start the server:

The server will start running on PORT 8000.

## Routes

The following routes are available on PORT 8000:

- GET /api/v1/storage-space
- Description: Retrieves all storage spaces.
- Method: GET
- Endpoint: /api/v1/storage-space

- POST /api/v1/storage-space/add
- Description: Creates a new storage space.
- Method: POST
- Endpoint: /api/v1/storage-space/add
- Body: { name, max_limit, curr_count (default: 0), is_refrigeration }

- PATCH /api/v1/storage-space/update/:id
- Description: Updates a storage space by its ID.
- Method: PATCH
- Endpoint: /api/v1/storage-space/update/:id
- Params: id (storage space ID)
- Body: { name, max_limit, curr_count, is_refrigeration }

- DELETE /api/v1/storage-space/delete/:id
- Description: Deletes a storage space by its ID.
- Method: DELETE
- Endpoint: /api/v1/storage-space/delete/:id
- Params: id (storage space ID)

Please replace `:id` in the URL with the actual storage space ID.
