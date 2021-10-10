const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/', {
      target: process.env.PROD ? `http://${process.env.BACKEND}:8081` : "http://localhost:8081",
    })
  );
};