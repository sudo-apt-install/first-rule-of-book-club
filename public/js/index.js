// const searchBtn = document.querySelector('.searchBtn');
// const searchInput = document.querySelector(".searchInput");

// searchBtn.addEventListener('click', function() {
//   console.log(searchInput.value);

//   window.location.href = `/search-results/${searchInput.value}/0`;
// })

function showResults() {
  const searchInput = document.querySelector(".searchInput");

  window.location.href = `/search-results/${searchInput.value}`;
}

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector(".searchInput");

  searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      showResults();
    }
  });
});