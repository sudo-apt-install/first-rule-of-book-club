const router = require('express').Router();
// const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
require("dotenv").config();
const apiKey = process.env.API_KEY;

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


// API routes
// keyword is genre & then include 0 to start index
router.get("/search-results/:keyword/:startindex", (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: req.params.keyword,
        maxResults: 40,
        startIndex: parseInt(req.params.startindex),
        key: apiKey,
      },
    })
    .then(({ data }) => {
      res.render("search-results", {
        data: data.items,
        total: data.totalItems,
      });
    })
    .catch((err) => res.status(err.response.status).send("Error"));
});

module.exports = router;
