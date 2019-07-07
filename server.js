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
  server.get("/ads.txt", (req, res) => {
    const filePath = join(__dirname, ".next", "/ads.txt");
    app.serveStatic(req, res, filePath);
  });
  server.get("/profile/reset/:slug", (req, res) => {
    return app.render(req, res, "/profile/reset", {
      reset_key: req.params.slug
    });
  });
  server.get("/giveaway/:slug", (req, res) => {
    return axios
      .get(`${process.env.BASE_API}/giveaway/single/${req.params.slug}`)
      .then(({ data }) => {
        const { results } = data;
        if (results.length === 0) {
          return axios
            .get(`${process.env.WINNER_API}${req.params.slug}`)
            .then(({ data }) => {
              const { winners } = data;
              return app.render(req, res, "/", { winners });
            });
        }
        return app.render(req, res, "/", { giveaway: results[0] });
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
  server.get("/item.php", (req, res) => {
    res.writeHead(301, {
      Location: `/giveaway/${req.query.gl}`
    });
    return res.end();
  });
  server.get("/index.php", (req, res) => {
    res.writeHead(301, {
      Location: `/`
    });
    return res.end();
  });
  server.get("/ending.php", (req, res) => {
    res.writeHead(301, {
      Location: `/ending`
    });
    return res.end();
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });
  server.enable("trust proxy");
  server.listen(3007);
});
