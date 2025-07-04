# API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

Some endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Public Endpoints

#### 1. Get All Books (Task 1)

```
GET /
```

**Response:**

```json
{
  "message": "Welcome to the Book Review API",
  "books": { ... },
  "totalBooks": 10
}
```

#### 2. Get Book by ISBN (Task 2)

```
GET /isbn/:isbn
```

**Example:** `GET /isbn/978-0-385-47454-2`

**Response:**

```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "isbn": "978-0-385-47454-2",
  "reviews": { ... }
}
```

#### 3. Get Books by Author (Task 3)

```
GET /author/:author
```

**Example:** `GET /author/Jane Austen`

**Response:**

```json
{
  "author": "Jane Austen",
  "books": [ ... ],
  "count": 1
}
```

#### 4. Get Books by Title (Task 4)

```
GET /title/:title
```

**Example:** `GET /title/Pride`

**Response:**

```json
{
  "searchTerm": "Pride",
  "books": [ ... ],
  "count": 1
}
```

#### 5. Get Book Reviews (Task 5)

```
GET /review/:isbn
```

**Example:** `GET /review/978-0-385-47454-2`

**Response:**

```json
{
  "isbn": "978-0-385-47454-2",
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "reviews": {
    "user1": "A masterpiece of African literature",
    "user2": "Compelling and thought-provoking"
  }
}
```

#### 6. Register New User (Task 6)

```
POST /register
```

**Request Body:**

```json
{
  "username": "newuser",
  "password": "password123",
  "email": "newuser@example.com"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

#### 7. Login User (Task 7)

```
POST /login
```

**Request Body:**

```json
{
  "username": "newuser",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

### Authenticated Endpoints

#### 8. Add/Modify Book Review (Task 8)

```
PUT /auth/review/:isbn
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "review": "This is an excellent book!"
}
```

**Response:**

```json
{
  "message": "Review added/modified successfully",
  "isbn": "978-0-385-47454-2",
  "title": "Things Fall Apart",
  "reviewer": "newuser",
  "review": "This is an excellent book!"
}
```

#### 9. Delete Book Review (Task 9)

```
DELETE /auth/review/:isbn
```

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "message": "Review deleted successfully",
  "isbn": "978-0-385-47454-2",
  "title": "Things Fall Apart",
  "reviewer": "newuser"
}
```

### Node.js Method Endpoints

#### 10. Get All Books (Async Callback) (Task 10)

```
GET /async/books
```

**Response:**

```json
{
  "message": "Books fetched using async callback",
  "books": { ... },
  "totalBooks": 10
}
```

#### 11. Search by ISBN (Promise) (Task 11)

```
GET /promise/isbn/:isbn
```

**Response:**

```json
{
  "message": "Book found using Promise",
  "book": { ... }
}
```

#### 12. Search by Author (Async/Await) (Task 12)

```
GET /async/author/:author
```

**Response:**

```json
{
  "message": "Books found using async/await",
  "author": "Jane Austen",
  "books": [ ... ],
  "count": 1
}
```

#### 13. Search by Title (Promise) (Task 13)

```
GET /promise/title/:title
```

**Response:**

```json
{
  "message": "Books found using Promise",
  "searchTerm": "Pride",
  "books": [ ... ],
  "count": 1
}
```

## Error Responses

### 400 Bad Request

```json
{
  "message": "Username, password, and email are required"
}
```

### 401 Unauthorized

```json
{
  "message": "Access token required"
}
```

### 403 Forbidden

```json
{
  "message": "Invalid or expired token"
}
```

### 404 Not Found

```json
{
  "message": "Book not found with this ISBN"
}
```

### 409 Conflict

```json
{
  "message": "User already exists"
}
```

### 500 Internal Server Error

```json
{
  "message": "Something went wrong!"
}
```

## Testing

Run the test suite:

```bash
node test.js
```

Run the client demo:

```bash
node client.js
```
