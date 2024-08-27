const urlDisplay = document.getElementById("urlDisplay");
const proxyFrame = document.getElementById("proxyFrame");

// get url input
const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams " + urlParams);
const url = urlParams.get("q");
console.log("url " + url);

if (url) {
  urlDisplay.textContent = decodeURIComponent(url);
  // update iframe
  const decodedUrl = decodeURIComponent(url);
  console.log("decodedUrl " + decodedUrl);
  const finalUrl = __uv$config.encodeUrl(decodedUrl);
  proxyFrame.src = __uv$config.prefix + finalUrl;
}
// reload iframe
document.getElementById('reloadButton').addEventListener('click', () => {
  proxyFrame.src = proxyFrame.src; //yes this works somehow
});
// when the url of the iframe changes, update the urlDisplay
proxyFrame.addEventListener('load', () => {
  const currentUrl = proxyFrame.contentWindow.location.href;
  //console.log("currentUrl " + currentUrl);
  const trimmedUrl = currentUrl.substring(currentUrl.indexOf("/uv/service/trans/") + 18);
  //console.log("trimmedUrl " + trimmedUrl);
  const decodedUrl = __uv$config.decodeUrl(trimmedUrl);
  //console.log("decodedUrl " + decodedUrl);
  urlDisplay.textContent = decodedUrl;
});