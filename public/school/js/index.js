const searchBox = document.querySelector("input");

function executeSearch(query) {
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  if (urlPattern.test(query)) {
    // url
    const encodedUrl = __uv$config.encodeUrl(query.startsWith("http") ? query : `http://${query}`);
    console.log(encodedUrl);
    window.location.href = __uv$config.prefix + encodedUrl;
  } else {
    // actual search
    const engine = localStorage.getItem("engine") || "https://duckduckgo.com/?q=";
    const searchUrl = `${engine}${query}`;
    console.log(searchUrl);
    const finalUrl = __uv$config.encodeUrl(searchUrl);
    console.log(finalUrl);
    window.location.href = __uv$config.prefix + finalUrl;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Submitted query " + searchBox.value);
      const query = searchBox.value.trim();
      executeSearch(query);
    }
  });
});

let currentSelection = -1;

searchBox.addEventListener("keydown", (event) => {
  const suggestionBox = document.getElementById("suggestions");
  const suggestions = Array.from(suggestionBox.children);

  if (suggestions.length === 0) return;

  switch (event.key) {
    case "ArrowUp":
      if (currentSelection > 0) {
        suggestions[currentSelection].classList.remove("selected");
        currentSelection--;
        suggestions[currentSelection]?.classList.add("selected");
      }
      break;
    case "ArrowDown":
      if (currentSelection < suggestions.length - 1) {
        suggestions[currentSelection]?.classList.remove("selected");
        currentSelection++;
        suggestions[currentSelection]?.classList.add("selected");
      }
      break;
    case "Enter":
      if (currentSelection !== -1 && currentSelection < suggestions.length) {
        searchBox.value = suggestions[currentSelection].textContent;
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";
      }
      break;
  }
});

searchBox.addEventListener("input", async () => {
  const query = searchBox.value;

  if (query.trim() === "") {
    // blank input
    const suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";
    suggestionBox.style.display = "none";
    return;
  }

  const response = await fetch(`/api/search=${query}`);
  const suggestions = await response.json();

  // clear old
  const suggestionBox = document.getElementById("suggestions");
  suggestionBox.innerHTML = "";

  // add new
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.textContent = suggestion.phrase;

    // Add a click event handler to the suggestion element
    suggestionElement.addEventListener("click", () => {
      searchBox.value = suggestion.phrase;
      suggestionBox.innerHTML = "";
      suggestionBox.style.display = "none";
      executeSearch(suggestion.phrase);
    });

    suggestionBox.appendChild(suggestionElement);
  });

  // Show the suggestions
  if (suggestions.length > 0) {
    suggestionBox.style.display = "block";
  } else {
    suggestionBox.style.display = "none";
  }
});