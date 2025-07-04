const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { books, users } = require("./data");
const { authenticateToken, generateToken } = require("./auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to find book by property
const findBookBy = (property, value) => {
  return Object.values(books).find((book) =>
    book[property].toLowerCase().includes(value.toLowerCase())
  );
};

// Helper function to find books by property (multiple results)
const findBooksBy = (property, value) => {
  return Object.values(books).filter((book) =>
    book[property].toLowerCase().includes(value.toLowerCase())
  );
};

// TASK 1: Get the book list available in the shop
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Book Review API",
    books: books,
    totalBooks: Object.keys(books).length,
  });
});

// TASK 2: Get the books based on ISBN
app.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = findBookBy("isbn", isbn);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found with this ISBN" });
  }
});

// TASK 3: Get all books by Author
app.get("/author/:author", (req, res) => {
  const author = req.params.author;
  const booksByAuthor = findBooksBy("author", author);

  if (booksByAuthor.length > 0) {
    res.json({
      author: author,
      books: booksByAuthor,
      count: booksByAuthor.length,
    });
  } else {
    res.status(404).json({ message: "No books found by this author" });
  }
});

// TASK 4: Get all books based on Title
app.get("/title/:title", (req, res) => {
  const title = req.params.title;
  const booksByTitle = findBooksBy("title", title);

  if (booksByTitle.length > 0) {
    res.json({
      searchTerm: title,
      books: booksByTitle,
      count: booksByTitle.length,
    });
  } else {
    res.status(404).json({ message: "No books found with this title" });
  }
});

// TASK 5: Get book Review
app.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = findBookBy("isbn", isbn);

  if (book) {
    res.json({
      isbn: isbn,
      title: book.title,
      author: book.author,
      reviews: book.reviews,
    });
  } else {
    res.status(404).json({ message: "Book not found with this ISBN" });
  }
});

// TASK 6: Register New user
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, password, and email are required" });
    }

    // Check if user already exists
    if (users[username]) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    users[username] = {
      username,
      password: hashedPassword,
      email,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// TASK 7: Login as a Registered user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find user
    const user = users[username];
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// TASK 8: Add/Modify a book review (Authenticated)
app.put("/auth/review/:isbn", authenticateToken, (req, res) => {
  try {
    const isbn = req.params.isbn;
    const { review } = req.body;
    const username = req.user.username;

    if (!review) {
      return res.status(400).json({ message: "Review content is required" });
    }

    // Find the book
    const book = findBookBy("isbn", isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found with this ISBN" });
    }

    // Add or modify the review
    book.reviews[username] = review;

    res.json({
      message: "Review added/modified successfully",
      isbn,
      title: book.title,
      reviewer: username,
      review,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding/modifying review", error: error.message });
  }
});

// TASK 9: Delete book review added by that particular user (Authenticated)
app.delete("/auth/review/:isbn", authenticateToken, (req, res) => {
  try {
    const isbn = req.params.isbn;
    const username = req.user.username;

    // Find the book
    const book = findBookBy("isbn", isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found with this ISBN" });
    }

    // Check if user has a review for this book
    if (!book.reviews[username]) {
      return res
        .status(404)
        .json({ message: "No review found by this user for this book" });
    }

    // Delete the review
    delete book.reviews[username];

    res.json({
      message: "Review deleted successfully",
      isbn,
      title: book.title,
      reviewer: username,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
});

// TASK 10: Get all books – Using async callback function
app.get("/async/books", (req, res) => {
  // Simulate async operation with callback
  const getAllBooksAsync = (callback) => {
    setTimeout(() => {
      try {
        const allBooks = books;
        callback(null, allBooks);
      } catch (error) {
        callback(error, null);
      }
    }, 100);
  };

  getAllBooksAsync((error, result) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Error fetching books", error: error.message });
    } else {
      res.json({
        message: "Books fetched using async callback",
        books: result,
        totalBooks: Object.keys(result).length,
      });
    }
  });
});

// TASK 11: Search by ISBN – Using Promises
app.get("/promise/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  // Create a Promise for ISBN search
  const searchByISBNPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = findBookBy("isbn", isbn);
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Book not found with this ISBN"));
      }
    }, 100);
  });

  searchByISBNPromise
    .then((book) => {
      res.json({
        message: "Book found using Promise",
        book: book,
      });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
});

// TASK 12: Search by Author – Using async/await
app.get("/async/author/:author", async (req, res) => {
  try {
    const author = req.params.author;

    // Simulate async operation
    const searchByAuthorAsync = async (authorName) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booksByAuthor = findBooksBy("author", authorName);
          if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
          } else {
            reject(new Error("No books found by this author"));
          }
        }, 100);
      });
    };

    const books = await searchByAuthorAsync(author);
    res.json({
      message: "Books found using async/await",
      author: author,
      books: books,
      count: books.length,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// TASK 13: Search by Title - Using Promises
app.get("/promise/title/:title", (req, res) => {
  const title = req.params.title;

  // Create a Promise for title search
  const searchByTitlePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByTitle = findBooksBy("title", title);
      if (booksByTitle.length > 0) {
        resolve(booksByTitle);
      } else {
        reject(new Error("No books found with this title"));
      }
    }, 100);
  });

  searchByTitlePromise
    .then((books) => {
      res.json({
        message: "Books found using Promise",
        searchTerm: title,
        books: books,
        count: books.length,
      });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Book Review API is running",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
