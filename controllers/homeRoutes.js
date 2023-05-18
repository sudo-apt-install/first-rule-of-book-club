const router = require('express').Router();
// const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
// node package to fetch API
const axios = require('axios');
// node package to clean api render
const sanitizeHtml = require('sanitize-html');
const Bookshelf = require("../models/Bookshelf");
const apiKey = process.env.API_KEY;
require("dotenv").config();


router.get('/login', (req, res) => {
  // if user logged in redirect them to the profile page
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
// else, render the login page
  res.render('login');
});

router.get('join/', (req, res) => {
  // if user logged in redirect them to profile
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  // else, render the join page
  res.render("join");
})

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/join", (req, res) => {
  res.render("join");
});

router.get("/rules", (req, res) => {
  res.render("rules");
});

router.get("/search-results", (req, res) => {
  res.render("search-results");
});

router.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

// router.get("/book/:bookId", (req, res) => {
//   const bookId = req.params.bookId;

//   axios
//     .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`, {
//       params: {
//         key: apiKey,
//       },
//     })
//     .then(({ data }) => {
//       const book = {
//         title: data.volumeInfo.title || "Unknown Title",
//         authors: data.volumeInfo.authors || ["Unknown Author"],
//         publishedDate: data.volumeInfo.publishedDate || "Unknown Publish Date",
//         description:
//           sanitizeHtml(data.volumeInfo.description, { allowedTags: [] }) ||
//           "No description available.",
//         categories: data.volumeInfo.categories || ["Uncategorized"],
//         pageCount: data.volumeInfo.pageCount || 0,
//         coverPhoto:
//           data.volumeInfo.imageLinks?.thumbnail ||
//           "https://example.com/default-cover.jpg",
//       };

//       res.render("book-page", { book });
//     })
//     .catch((err) => {
//       console.error("Error fetching book details:", err);
//       res.status(500).send("Error fetching book details");
//     });
// });

router.get("/book/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const bookshelfNames = ["Favorites", "Currently Reading", "Want to Read"];

  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`, {
      params: {
        key: apiKey,
      },
    })
    .then(({ data }) => {
      const book = {
        title: data.volumeInfo.title || "Unknown Title",
        authors: data.volumeInfo.authors || ["Unknown Author"],
        publishedDate: data.volumeInfo.publishedDate || "Unknown Publish Date",
        description:
          sanitizeHtml(data.volumeInfo.description, { allowedTags: [] }) ||
          "No description available.",
        categories: data.volumeInfo.categories || ["Uncategorized"],
        pageCount: data.volumeInfo.pageCount || 0,
        coverPhoto:
          data.volumeInfo.imageLinks?.thumbnail ||
          "https://example.com/default-cover.jpg",
      };

      res.render("book-page", { book, bookshelfNames });
    })
    .catch((err) => {
      console.error("Error fetching book details:", err);
      res.status(500).send("Error fetching book details");
    });
});

router.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;

  // Retrieve the bookshelf data for the specific user from your database or storage

  Bookshelf.findAll({
    where: { user_id: userId },
    include: [{ model: Book }],
  })
    .then((bookshelfData) => {
      const bookshelf = bookshelfData.map((shelf) => ({
        name: shelf.name,
        books: shelf.Books.map((book) => book.title),
      }));

      res.render("user-profile", { bookshelf });
    })
    .catch((err) => {
      console.error("Error fetching user bookshelf:", err);
      res.status(500).send("Error fetching user bookshelf");
    });
});




router.get("/search-results/:keyword", (req, res) => {
 const startIndex =  req.query.startindex ?  parseInt(req.query.startindex) :  0
  axios
    .get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: req.params.keyword,
        maxResults: 40,
        startIndex: startIndex,
        key: apiKey,
      },
    })
    .then(({ data }) => {
      const results = data.items.map((item) => {
        const book = item.volumeInfo;
        const coverPhoto = book.imageLinks?.thumbnail || "";
        const authors = book.authors || [];
        const bookId = item.id || "";
        return {
          title: book.title || "Unknown Title",
          coverPhoto,
          authors: authors.join(", ") || "Unknown Author",
          bookId,
        };
      });

      res.render("search-results", { results, total: data.totalItems });
    })
    .catch((err) => res.status(err.response.status).send("Error"));
});

module.exports = router;
