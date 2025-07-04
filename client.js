const axios = require("axios");

// Base URL for the API
const BASE_URL = "http://localhost:3000";

// Client methods using different async patterns

// Method 1: Get all books using async callback function
const getAllBooksCallback = (callback) => {
  const makeRequest = (cb) => {
    axios
      .get(`${BASE_URL}/async/books`)
      .then((response) => cb(null, response.data))
      .catch((error) => cb(error, null));
  };

  makeRequest(callback);
};

// Method 2: Search by ISBN using Promises
const searchByISBNPromise = (isbn) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/promise/isbn/${isbn}`)
      .then((response) => resolve(response.data))
      .catch((error) =>
        reject(error.response ? error.response.data : error.message)
      );
  });
};

// Method 3: Search by Author using async/await
const searchByAuthorAsync = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/async/author/${author}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Method 4: Search by Title using Promises
const searchByTitlePromise = (title) => {
  return axios
    .get(`${BASE_URL}/promise/title/${title}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
};

// Demo functions to test all methods
const demonstrateAllMethods = async () => {
  console.log("=== Node.js Book Review API Client Demo ===\n");

  // Test Method 1: Async Callback
  console.log("1. Testing Get All Books (Async Callback):");
  getAllBooksCallback((error, result) => {
    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Success:", result.message);
      console.log("Total books:", result.totalBooks);
    }
  });

  // Wait a bit before next test
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Test Method 2: Promises (ISBN)
  console.log("\n2. Testing Search by ISBN (Promises):");
  searchByISBNPromise("978-0-385-47454-2")
    .then((result) => {
      console.log("Success:", result.message);
      console.log("Book found:", result.book.title);
    })
    .catch((error) => {
      console.error("Error:", error.message || error);
    });

  // Wait a bit before next test
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Test Method 3: Async/Await (Author)
  console.log("\n3. Testing Search by Author (Async/Await):");
  try {
    const result = await searchByAuthorAsync("Jane Austen");
    console.log("Success:", result.message);
    console.log("Books found:", result.count);
  } catch (error) {
    console.error("Error:", error.message || error);
  }

  // Test Method 4: Promises (Title)
  console.log("\n4. Testing Search by Title (Promises):");
  searchByTitlePromise("Pride")
    .then((result) => {
      console.log("Success:", result.message);
      console.log("Books found:", result.count);
    })
    .catch((error) => {
      console.error("Error:", error.message || error);
    });
};

// Export methods for use in other files
module.exports = {
  getAllBooksCallback,
  searchByISBNPromise,
  searchByAuthorAsync,
  searchByTitlePromise,
  demonstrateAllMethods,
};

// Run demo if this file is executed directly
if (require.main === module) {
  console.log("Starting demo in 2 seconds...");
  setTimeout(() => {
    demonstrateAllMethods();
  }, 2000);
}
