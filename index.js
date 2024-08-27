import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import http from "node:http";

const app = express();
const bare = createBareServer("/bare/");
const server = http.createServer();
const PORT = 8080;

// discord redirect,
app.use("/discord", (req, res) => {
  res.redirect("https://discord.gg/49tgKgJx9z");
});

// hwhelp redirect,
app.use("/hwhelp", (req, res) => {
  res.redirect("/");
});

app.get('/links', (req, res) => {
  const domain = req.query.domain;
  res.sendStatus(200);
});

//search queries
app.get("/api/search=:query", async (req, res) => {
  const { query } = req.params;

  const reply = await fetch(`http://api.duckduckgo.com/ac?q=${query}&format=json`).then((resp) => resp.json());

  res.send(reply);
});

// copy and paste for more, but put it before this line
app.use(express.static("./public", {
  extensions: ['html']
}));


// bar
server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({ port: PORT }, () => {});

server.on("listening", () => {
  console.log("Hosting On http://localhost:8080");
});
