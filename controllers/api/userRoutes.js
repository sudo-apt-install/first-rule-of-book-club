const router = require('express').Router();
const { User } = require('../../models/User');

// router.get("/api/users/login", (req, res) => {
//     res.render("login");
//   });

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
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

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;


