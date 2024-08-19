document.addEventListener("DOMContentLoaded", async () => {
  const toggle = document.getElementById("backgroundToggle");
  const currenbackground = localStorage.getItem("background");
  toggle.value = currenbackground;

  toggle.addEventListener("change", (event) => {
    const selected = event.target.value;
    localStorage.setItem("background", selected);
    location.reload();
  });

  // load cloak
  const cloakSelect = document.getElementById("cloakSelect");
  const cloaks = JSON.parse(localStorage.getItem("cloaks")) || [];
  cloaks.forEach(cloak => {
    const option = document.createElement("option");
    option.value = cloak.id;
    option.textContent = cloak.title;
    cloakSelect.appendChild(option);
  });

  // set cloak
  const currentCloak = localStorage.getItem("cloak");
  if (currentCloak) {
    cloakSelect.value = currentCloak;
  }
});

// resetcloak function

function resetCloak() {
  localStorage.removeItem("cloak");
  location.reload();
}

function blank() {
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

function toggleAutoOpen() {
  const auto = localStorage.getItem("auto");
  switch (auto) {
    case "on":
      localStorage.setItem("auto", "off");
      break;
    case "off":
      localStorage.setItem("auto", "on");
      break;
  }
}

function saveCloakSettings() {
  const clo = document.getElementById("cloakSelect");
  localStorage.setItem("cloak", clo.value);
  console.log("Cloak set to " + clo.value);
  location.reload();
}

function saveEngine() {
  const en = document.getElementById("engineSwitcher");
  localStorage.setItem("engine", en.value);
  console.log("Engine set to " + en.value);
  location.reload();
}

function recordkey() {
  function handleKeyDown(event) {
    localStorage.setItem("key", event.key);
    console.log("Key set to " + event.key);
    alert("Key Selected!");
    document.removeEventListener("keydown", handleKeyDown);
  }
  document.addEventListener("keydown", handleKeyDown);
}

function savekey() {
  const inputt = document.getElementById("URLinput").value;
  localStorage.setItem("url", inputt);
  console.log("URL set to " + inputt);
}