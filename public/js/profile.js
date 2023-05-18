const selectedBookshelf = document.querySelector('.selectedBookshelf');

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

// Use the determined bookshelf ID in your fetch request
fetch(`/profile/${userId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ bookshelfId }),
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    console.log(data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
