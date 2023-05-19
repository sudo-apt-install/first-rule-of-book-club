const router = require('express').Router();
const { User } = require("../models/User");
const withAuth = require('../utils/auth');
const sequelize = require('sequelize'); 
// node package to fetch API
const axios = require('axios');
// node package to clean api render
const sanitizeHtml = require('sanitize-html');
const apiKey = process.env.API_KEY;
require("dotenv").config();

// router.post("/", async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { username: req.body.username } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect username or password, please try again" });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect username or password, please try again" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.username = userData.username;
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       res.json({ user: userData.name, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



// Prevent non logged in users from viewing the homepage

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile", {
      loggedUser: req.session.username,
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.render("login");
});



router.get('/search-results', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/login', (req, res) => {
//   // if user logged in redirect them to the profile page
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }
// // else render the login page
//   res.render('login');
// });

// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// router.get('join/', (req, res) => {
//   // if user logged in redirect them to profile
//   if (req.session.logged_in) {
//     res.redirect("/profile");
//     return;
//   }
//   // else, render the join page
//   res.render("join");
// })

// router.get("/", (req, res) => {
//   res.render("homepage");
// });

// router.get("/login", (req, res) => {
//   res.render("login");
// });

// router.get("/profile", (req, res) => {
//   res.render("profile");
// });

// router.get("/join", (req, res) => {
//   res.render("join");
// });

// router.get("/rules", (req, res) => {
//   res.render("rules");
// });

// router.get("/search-results", (req, res) => {
//   res.render("search-results");
// });

// router.get("/aboutus", (req, res) => {
//   res.render("aboutus");
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
