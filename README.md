# Node.js Book Review Application

A comprehensive book review application built with Node.js and Express.js that allows users to browse books, register accounts, login, and manage book reviews.

## Features

### General Users (Tasks 1-7)

1. **Get Book List** - View all available books in the shop
2. **Get Books by ISBN** - Search for specific books using ISBN
3. **Get Books by Author** - Find all books by a specific author
4. **Get Books by Title** - Search for books by title
5. **Get Book Reviews** - View reviews for any book
6. **Register New User** - Create a new user account
7. **Login as Registered User** - Authentication for registered users

### Registered Users (Tasks 8-9)

8. **Add/Modify Book Review** - Add or update book reviews (authenticated users only)
9. **Delete Book Review** - Remove reviews added by the user (authenticated users only)

### Node.js Methods with Async/Await and Promises (Tasks 10-13)

10. **Get All Books** - Using async callback function
11. **Search by ISBN** - Using Promises
12. **Search by Author** - Using async/await
13. **Search by Title** - Using Promises

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Public Endpoints

- `GET /` - Get all books
- `GET /isbn/:isbn` - Get book by ISBN
- `GET /author/:author` - Get books by author
- `GET /title/:title` - Get books by title
- `GET /review/:isbn` - Get book reviews
- `POST /register` - Register new user
- `POST /login` - User login

### Authenticated Endpoints

- `PUT /auth/review/:isbn` - Add/modify book review
- `DELETE /auth/review/:isbn` - Delete book review

### Node.js Methods Endpoints

- `GET /async/books` - Get all books using async callback
- `GET /promise/isbn/:isbn` - Search by ISBN using Promises
- `GET /async/author/:author` - Search by author using async/await
- `GET /promise/title/:title` - Search by title using Promises

## Technologies Used

- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing
- Axios for HTTP requests
- CORS for cross-origin requests

## Usage

The application provides a RESTful API for book management and review system. Users can browse books without authentication, but need to register and login to add, modify, or delete reviews.
