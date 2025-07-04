const axios = require("axios");

// Base URL for the API
const BASE_URL = "http://localhost:3000";

// Test data
const testUser = {
  username: "testuser",
  password: "testpass123",
  email: "testuser@example.com",
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (
  method,
  url,
  data = null,
  token = null
) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Test all API endpoints
const testAllEndpoints = async () => {
  console.log("=== Testing All API Endpoints ===\n");

  let userToken = null;

  try {
    // Test 1: Get all books
    console.log("1. Testing GET / (Get all books):");
    const allBooks = await makeAuthenticatedRequest("GET", "/");
    console.log("✓ Success:", allBooks.message);
    console.log("  Total books:", allBooks.totalBooks);

    // Test 2: Get book by ISBN
    console.log("\n2. Testing GET /isbn/:isbn (Get book by ISBN):");
    const bookByISBN = await makeAuthenticatedRequest(
      "GET",
      "/isbn/978-0-385-47454-2"
    );
    console.log("✓ Success: Found book -", bookByISBN.title);

    // Test 3: Get books by author
    console.log("\n3. Testing GET /author/:author (Get books by author):");
    const booksByAuthor = await makeAuthenticatedRequest(
      "GET",
      "/author/Jane Austen"
    );
    console.log(
      "✓ Success:",
      booksByAuthor.count,
      "books found by",
      booksByAuthor.author
    );

    // Test 4: Get books by title
    console.log("\n4. Testing GET /title/:title (Get books by title):");
    const booksByTitle = await makeAuthenticatedRequest("GET", "/title/Pride");
    console.log(
      "✓ Success:",
      booksByTitle.count,
      'books found with title containing "Pride"'
    );

    // Test 5: Get book reviews
    console.log("\n5. Testing GET /review/:isbn (Get book reviews):");
    const bookReviews = await makeAuthenticatedRequest(
      "GET",
      "/review/978-0-385-47454-2"
    );
    console.log("✓ Success: Reviews for", bookReviews.title);
    console.log(
      "  Number of reviews:",
      Object.keys(bookReviews.reviews).length
    );

    // Test 6: Register new user
    console.log("\n6. Testing POST /register (Register new user):");
    const registration = await makeAuthenticatedRequest(
      "POST",
      "/register",
      testUser
    );
    console.log("✓ Success:", registration.message);
    console.log("  User:", registration.user.username);

    // Test 7: Login user
    console.log("\n7. Testing POST /login (Login user):");
    const login = await makeAuthenticatedRequest("POST", "/login", {
      username: testUser.username,
      password: testUser.password,
    });
    console.log("✓ Success:", login.message);
    console.log("  Token received:", login.token ? "Yes" : "No");
    userToken = login.token;

    // Test 8: Add book review (authenticated)
    console.log("\n8. Testing PUT /auth/review/:isbn (Add book review):");
    const addReview = await makeAuthenticatedRequest(
      "PUT",
      "/auth/review/978-0-385-47454-2",
      {
        review: "This is a test review from the API test suite",
      },
      userToken
    );
    console.log("✓ Success:", addReview.message);
    console.log("  Review added for:", addReview.title);

    // Test 9: Delete book review (authenticated)
    console.log("\n9. Testing DELETE /auth/review/:isbn (Delete book review):");
    const deleteReview = await makeAuthenticatedRequest(
      "DELETE",
      "/auth/review/978-0-385-47454-2",
      null,
      userToken
    );
    console.log("✓ Success:", deleteReview.message);
    console.log("  Review deleted for:", deleteReview.title);

    // Test 10: Async callback method
    console.log("\n10. Testing GET /async/books (Async callback method):");
    const asyncBooks = await makeAuthenticatedRequest("GET", "/async/books");
    console.log("✓ Success:", asyncBooks.message);
    console.log("   Total books:", asyncBooks.totalBooks);

    // Test 11: Promise method (ISBN)
    console.log("\n11. Testing GET /promise/isbn/:isbn (Promise method):");
    const promiseISBN = await makeAuthenticatedRequest(
      "GET",
      "/promise/isbn/978-0-385-47454-2"
    );
    console.log("✓ Success:", promiseISBN.message);
    console.log("   Book:", promiseISBN.book.title);

    // Test 12: Async/await method (Author)
    console.log(
      "\n12. Testing GET /async/author/:author (Async/await method):"
    );
    const asyncAuthor = await makeAuthenticatedRequest(
      "GET",
      "/async/author/Jane Austen"
    );
    console.log("✓ Success:", asyncAuthor.message);
    console.log("   Books found:", asyncAuthor.count);

    // Test 13: Promise method (Title)
    console.log("\n13. Testing GET /promise/title/:title (Promise method):");
    const promiseTitle = await makeAuthenticatedRequest(
      "GET",
      "/promise/title/Pride"
    );
    console.log("✓ Success:", promiseTitle.message);
    console.log("   Books found:", promiseTitle.count);

    console.log("\n=== All Tests Completed Successfully! ===");
  } catch (error) {
    console.error("❌ Test failed:", error.message || error);
  }
};

// Test error handling
const testErrorHandling = async () => {
  console.log("\n=== Testing Error Handling ===\n");

  try {
    // Test invalid ISBN
    console.log("1. Testing invalid ISBN:");
    await makeAuthenticatedRequest("GET", "/isbn/invalid-isbn");
  } catch (error) {
    console.log("✓ Correctly handled:", error.message);
  }

  try {
    // Test invalid author
    console.log("\n2. Testing non-existent author:");
    await makeAuthenticatedRequest("GET", "/author/NonExistentAuthor");
  } catch (error) {
    console.log("✓ Correctly handled:", error.message);
  }

  try {
    // Test unauthorized access
    console.log("\n3. Testing unauthorized access:");
    await makeAuthenticatedRequest("PUT", "/auth/review/978-0-385-47454-2", {
      review: "This should fail",
    });
  } catch (error) {
    console.log("✓ Correctly handled:", error.message);
  }
};

// Run all tests
const runAllTests = async () => {
  console.log("Starting API tests in 3 seconds...");
  setTimeout(async () => {
    await testAllEndpoints();
    await testErrorHandling();
    console.log("\n=== Test Suite Complete ===");
  }, 3000);
};

// Export for use in other files
module.exports = {
  testAllEndpoints,
  testErrorHandling,
  runAllTests,
  makeAuthenticatedRequest,
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}
