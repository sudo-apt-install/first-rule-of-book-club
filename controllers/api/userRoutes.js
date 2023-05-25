const router = require("express").Router();
const { User } = require("../../models");

// router.get("/:userId", (req, res) => {
//   const userId = req.params.userId;

//   console.log(userId);
//   res.status(200);
// });

router.post("/login", async (req, res) => {
  // console.log(User)
  try {

    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    console.log(userData);

    console.log(req.body)
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData.name, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.get("/profile/:userId", (req, res) => {
//   const userId = req.params.userId;

//   // Retrieve the bookshelf data for the specific user from your database or storage

//   Bookshelf.findAll({
//     where: { user_id: userId },
//     include: [{ model: Book }],
//   })
//     .then((bookshelfData) => {
//       const bookshelf = bookshelfData.map((shelf) => ({
//         name: shelf.name,
//         books: shelf.Books.map((book) => book.title),
//       }));

//       res.render("user-profile", { bookshelf });
//     })
//     .catch((err) => {
//       console.error("Error fetching user bookshelf:", err);
//       res.status(500).send("Error fetching user bookshelf");
//     });
// });

// router.get("/profile", async (req, res) => {
//   try {
//     const userId = req.session.userId;
//     // Retrieve the user information from the database
//     const user = await User.findByPk(userId);

//     console.log(user); // Check the user data in the console
//     res.render("profile", { user });

//     if (!user) {
//       // Handle the case where the user is not found
//       // You can redirect to an error page or show an appropriate message
//       return res.redirect("/error");
//     }
//     // Render the profile page template and pass the user's information as data
//     res.render("profile", { user });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     // Handle the error appropriately, e.g., redirect to an error page
//     res.redirect("/error");
//   }
// });

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     // const { username, password } = req.body;
//       console.log()

//     const userData = await User.findOne({ where: { username: req.body.username } });

//     if (!userData) {
//       return res.status(400).json({
//         message: 'Incorrect username or password, please try again',
//       });
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       return res.status(400).json({
//         message: 'Incorrect username or password, please try again',
//       });
//     }

//     req.session.save(() => {
//       req.session.username = userData.username;
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({message: 'internal server'});
//   }
// });

// router.post("/login", (req, res) => {
//   console.log(req.body); // Check the received request body
//   const { username, password } = req.body;
//   console.log(username, password); // Check the values of username and password
//   // Handle the login logic
// });

module.exports = router;
