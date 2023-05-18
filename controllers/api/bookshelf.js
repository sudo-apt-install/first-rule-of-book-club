const router = require("express").Router();

router.post("/api/bookshelf/:bookshelfId/books/:bookId", (req, res) => {
  const { bookshelfId, bookId } = req.params;
  const { title, authors, description, categories, pageCount, coverPhoto } =
    req.body;

  // find the user based on the bookshelfId
  User.findOne({ where: { bookshelfId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // add the book data to the user's profile (bookshelf)
      const bookData = {
        title,
        authors,
        description,
        categories,
        pageCount,
        coverPhoto,
      };

      user.bookshelves.push(bookData); // add the book to the user's bookshelf
      return user.save(); // save the user with the updated bookshelf
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "Book added" });
    })
    .catch((err) => {
      console.error("Error adding book", err);
      res.status(500).json({ error: "Error adding book" });
    });
});

module.exports = router;
