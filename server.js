const express = require("express");
const { join } = require("path");
const next = require("next");
const compression = require("compression");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get("/service-worker.js", (req, res) => {
    const filePath = join(__dirname, ".next", "/static/service-worker.js");
    app.serveStatic(req, res, filePath);
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3000);
});
