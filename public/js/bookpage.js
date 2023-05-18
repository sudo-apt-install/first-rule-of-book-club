const selectedBookshelf = document.querySelector(".selectedBookshelf");

let bookshelfId;
switch (selectedBookshelf) {
  case "Favorites":
    bookshelfId = 1; // bookshelf ID for "Favorites"
    break;
  case "Currently Reading":
    bookshelfId = 2; // bookshelf ID for "Currently Reading"
    break;
  case "Want to Read":
    bookshelfId = 3; // bookshelf ID for "Want to Read"
    break;
  default:
    // Handle invalid selection or set a default bookshelf ID
    bookshelfId = 1; // default bookshelf ID
    break;
}
