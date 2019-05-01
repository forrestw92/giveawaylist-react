const express = require("express");
const { join } = require("path");
const next = require("next");
const compression = require("compression");
const axios = require("axios");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();
require("dotenv").config();
app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get("/service-worker.js", (req, res) => {
    const filePath = join(__dirname, ".next", "/service-worker.js");
    app.serveStatic(req, res, filePath);
  });
  server.get("/profile/reset/:slug", (req, res) => {
    return app.render(req, res, "/profile/reset", {
      reset_key: req.params.slug
    });
  });
  server.get("/profile/confirm/:slug", (req, res) => {
    axios
      .get(`${process.env.BASE_API}/auth/confirm/${req.params.slug}`)
      .then(({ data }) => {
        return app.render(req, res, "/profile", { message: data });
      })
      .catch(({ response }) => {
        return app.render(req, res, "/profile", { message: response.data });
      });
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3007);
});
