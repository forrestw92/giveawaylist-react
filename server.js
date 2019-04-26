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
    const filePath = join(__dirname, ".next", "/static/service-worker.js");
    app.serveStatic(req, res, filePath);
  });
  server.get("/profile/confirm/:slug", (req, res) => {
    axios
      .get(`${process.env.BASE_API}/auth/confirm/${req.params.slug}`)
      .then(({ data }) => {
        if (data.msg === "CONFIRMED_ACCOUNT") {
          return res.redirect("/profile");
        }
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        return app.render(req, res, "/profile", { message: msg });
      });
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3000);
});
