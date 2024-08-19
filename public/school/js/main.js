const stockSW = "/uv/sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];
const currenbackground = localStorage.getItem("background");

addEventListener("DOMContentLoaded", async (event) => {
  const auto = localStorage.getItem("auto");
  const cloak = localStorage.getItem("cloak");
  const currenbackground = localStorage.getItem("background");

  await registerSW();

  switch (auto) {
    case "on":
      blank();
      break;
    case "off":
      break;
    case null:
      localStorage.setItem("auto", "off");
      break;
  }

  if (currenbackground === null) {
    localStorage.setItem("background", "dark1");
    location.reload();
  }

  switch (currenbackground) {
    case "dark1":
      document.body.style.backgroundImage = "url('/school/dark1.png')";
      document.getElementById("light-styles").disabled = true;
      document.getElementById("dark-styles").disabled = false;
      break;
    case "dark2":
      document.body.style.backgroundImage = "url('/school/dark2.png')";
      document.getElementById("light-styles").disabled = true;
      document.getElementById("dark-styles").disabled = false;
      break;

    case "light1":
      document.body.style.backgroundImage = "url('/school/light1.png')";
      document.getElementById("dark-styles").disabled = true;
      document.getElementById("light-styles").disabled = false;
      break;

    case "light2":
      document.body.style.backgroundImage = "url('/school/light2.png')";
      document.getElementById("light-styles").disabled = false;
      document.getElementById("dark-styles").disabled = true;
      break;
  }

  if (key === null) {
    localStorage.setItem("key", "`");
  }

  if (url === null) {
    localStorage.setItem("url", "https://www.google.com");
  }

  switch (cloak) {
    case "blank":
      document.title = "Transend";
      favicon.href = "/imgs/icons/default.ico";
      break;
    case "google":
      document.title = "Google";
      favicon.href = "/imgs/icons/google.ico";
      break;
    case "edpuzzle":
      document.title = "Edpuzzle";
      favicon.href = "/imgs/icons/edpuzzle.ico";
      break;
    case "getepic":
      document.title = "Epic!";
      favicon.href = "/imgs/icons/epic.ico";
      break;
    case "ic":
      document.title = "Infinite Campus";
      favicon.href = "/imgs/icons/infinite-campus.ico";
      break;
    case "IXL":
      document.title = "IXL";
      favicon.href = "/imgs/icons/ixl.ico";
      break;
    case "nearpod":
      document.title = "Nearpod";
      favicon.href = "/imgs/icons/nearpod.ico";
      break;
    case "prodigy":
      document.title = "Prodigy";
      favicon.href = "/imgs/icons/prodigy.ico";
      break;
    case "school":
      document.title = "Schoology";
      favicon.href = "/imgs/icons/schoology.ico";
      break;
    case "quiz":
      document.title = "Quizizz";
      favicon.href = "/imgs/icons/quizizz.ico";
      break;
    case "clever":
      document.title = "Clever";
      favicon.href = "/imgs/icons/clever.ico";
      break;
  }
});

async function registerSW() {
  if (!navigator.serviceWorker) {
    if (location.protocol !== "https:" && !swAllowedHostnames.includes(location.hostname)) throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  await navigator.serviceWorker.register(stockSW);
}
const url = localStorage.getItem("url");
const key = localStorage.getItem("key");
document.addEventListener("keydown", function (event) {
  if (event.key === key) {
    top.location.replace(url);
  }
});

function blank() {
  var currentUrl = top.location.href;
  if (currentUrl === "about:blank") {
    console.log(currentUrl);
  } else {
    var win = window.open();
    var url = "/";
    var iframe = win.document.createElement("iframe");
    top.location.replace("https://duckduckgo.com/");
    iframe.style.position = "fixed";
    iframe.style.top = 0;
    iframe.style.bottom = 0;
    iframe.style.left = 0;
    iframe.style.right = 0;
    iframe.style.border = "none";
    iframe.style.outline = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.src = url;

    win.document.body.appendChild(iframe);
  }
}