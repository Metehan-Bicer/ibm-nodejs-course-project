// Sample book data
const books = {
  1: {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    isbn: "978-0-385-47454-2",
    reviews: {
      user1: "A masterpiece of African literature",
      user2: "Compelling and thought-provoking",
    },
  },
  2: {
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    isbn: "978-0-14-044740-8",
    reviews: {
      user1: "Classic fairy tales for all ages",
    },
  },
  3: {
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    isbn: "978-0-14-243722-5",
    reviews: {
      user2: "Epic journey through the afterlife",
    },
  },
  4: {
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    isbn: "978-0-14-044919-8",
    reviews: {},
  },
  5: {
    author: "Unknown",
    title: "The Book Of Job",
    isbn: "978-0-14-044914-3",
    reviews: {},
  },
  6: {
    author: "Unknown",
    title: "One Thousand and One Nights",
    isbn: "978-0-14-044892-4",
    reviews: {
      user1: "Amazing collection of Middle Eastern stories",
    },
  },
  7: {
    author: "Unknown",
    title: "Nj\u00e1l's Saga",
    isbn: "978-0-14-044769-9",
    reviews: {},
  },
  8: {
    author: "Jane Austen",
    title: "Pride and Prejudice",
    isbn: "978-0-14-043951-9",
    reviews: {
      user1: "A timeless romance",
      user3: "Excellent character development",
    },
  },
  9: {
    author: "Honor\u00e9 de Balzac",
    title: "Le P\u00e8re Goriot",
    isbn: "978-0-14-044274-8",
    reviews: {},
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    isbn: "978-0-8021-3084-6",
    reviews: {
      user2: "Challenging but rewarding modernist work",
    },
  },
};

// Sample users data
const users = {
  user1: {
    username: "user1",
    password: "$2a$10$2vOlHRnTRV9YjJlTSJVfGOyaZLhZUaBNHhGm5B6jzJvVsNmZLmVeO", // password: password123
    email: "user1@example.com",
  },
  user2: {
    username: "user2",
    password: "$2a$10$2vOlHRnTRV9YjJlTSJVfGOyaZLhZUaBNHhGm5B6jzJvVsNmZLmVeO", // password: password123
    email: "user2@example.com",
  },
  user3: {
    username: "user3",
    password: "$2a$10$2vOlHRnTRV9YjJlTSJVfGOyaZLhZUaBNHhGm5B6jzJvVsNmZLmVeO", // password: password123
    email: "user3@example.com",
  },
};

module.exports = { books, users };
