const router = require("express").Router();
const { User } = require("../../models/User");

// router.get("/api/users/login", (req, res) => {
//     res.render("login");
//   });

// router.post("/", async (req, res) => {
//   try {
//     console.log(req.body);
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.username = userData.username;
//       req.session.user_id = userData.id;
//       req.session.email = userData.email;
//       req.session.logged_in = true;
//     });

//     res.status(200).json({ user: userData, message: "welcome!" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { username: req.body.username } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
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

// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData.name, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;
