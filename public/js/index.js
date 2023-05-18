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